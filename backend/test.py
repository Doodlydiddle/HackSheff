# Crypt(ge)ography
# Taking Secrets to the Grave

import wikipediaapi as wiki
from OSMPythonTools.api import Api as osm
import requests
import json
import wptools
from geopy.geocoders import Nominatim
import re
import math
from fastapi import FastAPI
import uvicorn
import sys

from xarray.core.duck_array_ops import first


sys.set_int_max_str_digits(10000)
# Test People:
# Charles Dickens - Coords provided
# George Washington - Coords provided
# Winston Churchill - Coords not provided, resting place too specific, gets vaguely near
# Oliver Cromwell - Coords not provided, as his head was buried separately to his body and it thinks the location name
#   is 'Cambridge head'
# Obadiah Bush - Coords not provided, buried at sea, places it at 'At Sea' restaurant on Bonaire, Netherlands. For the
#   ciphertext to be decryptable, we can't pick a random location in sea. An arbitrary point could be chosen, but At Sea
#   is VERY FUNNY
# Hachikō - Coords not provided. What a good pupper :)
# Marie Curie - No resting place listed
# Ada Lovelace - Coords not provided, works
# Henry VIII - Coords not provided, works


def run_enc(message, person):
    resting, resting_coords = return_resting(person)
    coords = get_coords(resting, resting_coords)

    key = calc_generator(coords[0]) ** calc_generator(coords[1])
    key = str(key)

    plaintext = re.sub("[^a-zA-Z]+", "", message).upper()

    ciphertext = encrypt(plaintext, key)
    return ciphertext

def run_dec(message, person):
    resting, resting_coords = return_resting(person)
    coords = get_coords(resting, resting_coords)

    key = calc_generator(coords[0]) ** calc_generator(coords[1])
    key = str(key)

    ciphertext = re.sub("[^a-zA-Z]+", "", message).upper()

    plaintext = decrypt(ciphertext, key)
    return plaintext


def return_resting(page_name):
    wiki_wiki = wiki.Wikipedia('Crypt(ge)ography', 'en')
    person_page = wiki_wiki.page(page_name)

    assert person_page.exists(), "Page does not exist"

    page_box = wptools.page(page_name).get_parse()
    infobox = page_box.data['infobox']

    # Get resting place
    resting_place = infobox.get('resting_place')
    restingplace = infobox.get('restingplace')
    resting__place = infobox.get('resting place')
    burial_place = infobox.get('burial_place')
    resting_place_coordinates = infobox.get('resting_place_coordinates')

    assert (resting_place is not None or restingplace is not None
            or resting__place is not None or burial_place is not None), \
        "There is no resting place listed in this wikipedia page"

    if resting_place is None:
        if resting__place is None and burial_place is None:
            resting_place = restingplace
        elif restingplace is None and burial_place is None:
            resting_place = resting__place
        else:
            resting_place = burial_place

    return resting_place, resting_place_coordinates


def get_coords(resting_place, resting_place_coordinates):

    # coords provided
    if resting_place_coordinates is not None:
        north_or_south = 1
        east_or_west = 1
        coords_list = resting_place_coordinates.split("|")
        for i in range(len(coords_list)):
            if False not in [x.isdigit() == True or x == "." for x in coords_list[i]]:
                pass
            else:
                if coords_list[i] == "S":
                    north_or_south = -1
                elif coords_list[i] == "W":
                    east_or_west = -1
                coords_list[i] = 'a'
        while coords_list.count('a'):
            coords_list.remove('a')
        # DMS to decimal
        coords_list[0], coords_list[3] = float(coords_list[0]), float(coords_list[3])
        coords_list[1], coords_list[4] = float(coords_list[1])/60, float(coords_list[4])/60
        coords_list[2], coords_list[5] = float(coords_list[2])/3600, float(coords_list[5])/3600

        coords = [sum(coords_list[0:3]) * north_or_south, sum(coords_list[3:]) * east_or_west]
        return coords

    # coords not provided
    geolocator = Nominatim(user_agent="Crypt(ge)ography")

    resting_place = resting_place.split(",")
    if len(resting_place) > 1:
        for i in range(1,len(resting_place)):
            resting_place[i] = resting_place[i].lstrip(" ")

    resting_place = [re.sub("[^A-Za-z0-9 ]+", '', element) for element in resting_place]

    resting_place = ", ".join(resting_place)

    location_variable = None
    while location_variable is None:
        location_variable = geolocator.geocode(resting_place, limit=10, exactly_one=False)

        if location_variable is None:
            resting_place = re.sub(r'^.*?,', '', resting_place)
            resting_place = resting_place[1:]

        assert len(resting_place) != 0, "Could not geocode resting place"

    coords = location_variable[0][-1]
    return list(coords)

def calc_generator(number):
    total_1 = 0
    total_2 = 0
    str_num = str(number).replace(".", "")

    if "-" in str_num:
        str_num = str_num.replace("-", "")
        for i in range(len(str_num)):
            if i%2 == 0:
                total_1 += int(str_num[i])
            else:
                total_2 += int(str_num[i])

    else:
        str_num_1, str_num_2 = str_num[:len(str_num)//2], str_num[len(str_num)//2:]

        for i in range(len(str_num)//2):
            total_1 += int(str_num_1[i])
            total_2 += int(str_num_2[i])

    print(total_1, total_2)
    return total_1 * total_2


def encrypt(plaintext, key):
    alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    ciphertext = ""
    for i in range(len(plaintext)):
        ciphertext += alphabet[(alphabet.index(plaintext[i]) + int(key[i%len(key)] + key[i+1%len(key)])) % 26]
    return ciphertext


def decrypt(ciphertext, key):
    alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    plaintext = ""
    for i in range(len(ciphertext)):
        plaintext += alphabet[
            (alphabet.index(ciphertext[i]) - int(key[i % len(key)] + key[i + 1 % len(key)])) % 26]
    return plaintext


app = FastAPI()

@app.get("/encrypt")
async def enc(plaintext: str, dead: str):
    cipher = run_enc(plaintext, dead)
    return {"Cipher-return": cipher}

@app.get("/decrypt")
async def dec(ciphertext: str, dead: str):
    plain = run_dec(ciphertext, dead)
    return {"Plain-return": plain}

@app.get("/coordinates")
async def place(dead: str):
    resting, resting_coords = return_resting(dead)
    coords = get_coords(resting, resting_coords)
    return {"Co-ords": str(coords[0]) +"|" + str(coords[1])}

