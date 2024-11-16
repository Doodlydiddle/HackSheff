# Crypt(ge)ography
# Because Dead Men Tell No Tales

import wikipediaapi as wiki
from OSMPythonTools.api import Api as osm
import requests
import json
import wptools


def __main__():
    return_resting('Charles Dickens')

def return_resting(page_name):
    wiki_wiki = wiki.Wikipedia('Crypt(ge)ography', 'en')
    person_page = wiki_wiki.page(page_name)

    assert person_page.exists(), "Page does not exist"

    page_box = wptools.page(page_name).get_parse()
    infobox = page_box.data['infobox']
    print(infobox)

    # Get resting place
    resting_place = infobox.get('resting_place')
    restingplace = infobox.get('restingplace')

    assert resting_place is not None or restingplace is not None, "There is no resting place listed in this wikipedia page"

    if resting_place is None:
        resting_place = restingplace

    return resting_place




return_resting('Charles Dickens')
