import difflib
import csv
import itertools
from fuzzywuzzy import fuzz
import pandas as pd
import re

'''with open("C:\\Users\\Marcos\\Desktop\\Projects\\Study\\Python\\finalProject\\kan\\kan\\spiders\\products", newline='') as csvfile:
    spamreader = csv.reader(csvfile)
    for row in spamreader:
        if len(row) == 1:
            print(row[0].strip())'''

# print(closest)

start_urls = ['https://www.paguemenos.com.br'];
products = ['Protetor Solar Facial Antioleosidade La Roche-Posay Anthelios Airlicium Fps70 50g', 'Bepantol Baby Creme 120g'];

'''def get_close_matches_icase(word, possibilities, *args, **kwargs):
    """ Case-insensitive version of difflib.get_close_matches """
    lword = word.lower()
    lpos = {}
    for p in possibilities:
        if p.lower() not in lpos:
            lpos[p.lower()] = [p]
        else:
            lpos[p.lower()].append(p)
    lmatches = difflib.get_close_matches(lword, lpos.keys(), *args, **kwargs)
    return lmatches

closest = get_close_matches_icase(' AZEITONA PRETA SACHET DIZA 150G '.strip(), ['Mortadela de frango Seara turma da Mônica 400g']);
print(closest)
def f():
    for product in products:
        for url in start_urls:
            yield product;

out = f();

for i in out:
    print(i)'''

res = fuzz.token_set_ratio('AZEITONA VERDE SACHET DIZA 100G', 'La Violetera')

print(res)

regex = r'[0-9]+'
def get_rate(product1, product2):
    numbers1 = set(re.findall(regex, product1))
    numbers2 = set(re.findall(regex, product2))
    union = numbers1.union(numbers2)
    intersection = numbers1.intersection(numbers2)
    if len(numbers1) == 0 and len(numbers2) == 0:
        rate = 1
    else:
        rate = (len(intersection)/ len(union))
    return rate

numbers1 = re.findall(regex, 'Ketchup Picles Heinz Squeeze 397g')