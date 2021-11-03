import difflib
import csv
import itertools

'''with open("C:\\Users\\Marcos\\Desktop\\Projects\\Study\\Python\\finalProject\\kan\\kan\\spiders\\products", newline='') as csvfile:
    spamreader = csv.reader(csvfile)
    for row in spamreader:
        if len(row) == 1:
            print(row[0].strip())'''

# print(closest)

start_urls = ['https://www.paguemenos.com.br'];
products = ['Protetor Solar Facial Antioleosidade La Roche-Posay Anthelios Airlicium Fps70 50g', 'Bepantol Baby Creme 120g'];

def get_close_matches_icase(word, possibilities, *args, **kwargs):
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
'''def f():
    for product in products:
        for url in start_urls:
            yield product;

out = f();

for i in out:
    print(i)'''