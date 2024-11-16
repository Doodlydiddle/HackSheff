# Crypt(ge)ography
# Because Dead Men Tell No Tales

import wikipediaapi as wiki
from OSMPythonTools.api import Api as osm
import requests
import json
import wptools


def __main__():
    resting, resting_coords = return_resting('Charles Dickens')
    coords = get_coords(resting, resting_coords)


def return_resting(page_name):
    wiki_wiki = wiki.Wikipedia('Crypt(ge)ography', 'en')
    person_page = wiki_wiki.page(page_name)

    assert person_page.exists(), "Page does not exist"

    page_box = wptools.page(page_name).get_parse()
    infobox = page_box.data['infobox']

    # Get resting place
    resting_place = infobox.get('resting_place')
    restingplace = infobox.get('restingplace')
    resting_place_coordinates = infobox.get('resting_place_coordinates')

    assert resting_place is not None or restingplace is not None, "There is no resting place listed in this wikipedia page"

    if resting_place is None:
        resting_place = restingplace

    return resting_place, resting_place_coordinates


def get_coords(resting_place, resting_place_coordinates):

    # coords provided
    if resting_place_coordinates is not None:
        coords_list = resting_place_coordinates.split("|")
        for i in range(len(coords_list)):
            if not coords_list[i].isnumeric():
                coords_list[i] = 'a'
        while coords_list.count('a'):
            coords_list.remove('a')

        # DMS to decimal
        coords_list[0], coords_list[3] = int(coords_list[0]), int(coords_list[3])
        coords_list[1], coords_list[4] = int(coords_list[1])/60, int(coords_list[4])/60
        coords_list[2], coords_list[5] = int(coords_list[2])/3600, int(coords_list[5])/3600

        coords = [sum(coords_list[0:3]), sum(coords_list[3:])]
        return coords

    # coords not provided

__main__()