# Crypt(ge)ography
# Because Dead Men Tell No Tales

import wikipediaapi as wiki
from OSMPythonTools.api import Api as osm
import requests
import json


def __main__():
    print("WELCOME TO CRYPT(GE)OHRAPHY\nBecause Dead Men Tell No Tales!")


def return_resting(page_name):
    wiki_wiki = wiki.Wikipedia('Crypt(ge)ography', 'en')
    person_page = wiki_wiki.page(page_name)

    assert person_page.exists(), "Page does not exist"

    url = 'https://query.wikidata.org/sparql'
    query = '''
    SELECT distinct ?item ?itemLabel ?itemDescription WHERE{  
      ?item ?label ''' + "'" + page_name + "'" + '''@en.  
      ?article schema:about ?item .
      ?article schema:inLanguage "en" .
      ?article schema:isPartOf <https://en.wikipedia.org/>.	
      SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }    
    }
    '''
    r = requests.get(url, params={'format': 'json', 'query': query})
    data = r.text
    page = json.loads(data)
    print(data)

    print(page["results"]["bindings"]["item"]["value"])



return_resting('Charles Dickens')
