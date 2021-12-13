import pandas as pd
from openpyxl import Workbook, load_workbook
import json
import re
import csv
from fuzzywuzzy import fuzz

'''valuesCEC = []
valuesSODIMAC = []
valuesTELHANORTE = []

with open('categories_CEC.json') as data_file_cec:
    valuesCEC = json.load(data_file_cec);
    data_file_cec.close()

with open('categories_SODIMAC.json') as data_file_sodimac:
    valuesSODIMAC = json.load(data_file_sodimac);
    data_file_sodimac.close()

with open('categories_TELHANORTE.json') as data_file_telhanorte:
    valuesTELHANORTE = json.load(data_file_telhanorte);
    data_file_telhanorte.close()

df = pd.read_excel('abc.xlsx', engine='openpyxl', usecols="B")

alreadyImportedCategories = []

for valueCEC in valuesCEC:
    try:
        alreadyInList = alreadyImportedCategories.index(valueCEC.get("category"))
    except ValueError as e:
        desc_prod = df["Texto breve de material"] == valueCEC.get("product")
        df.loc[desc_prod, "Categoria"] = f'{valueCEC.get("category")} ({valueCEC.get("percentage")}%)'
        alreadyImportedCategories.append(valueCEC.get("category"))

for valueSODIMAC in valuesSODIMAC:
    try:
        alreadyInList = alreadyImportedCategories.index(valueSODIMAC.get("category"))
    except ValueError as e:
        desc_prod = df["Texto breve de material"] == valueSODIMAC.get("product")

        newCat = f'{valueSODIMAC.get("category")} ({valueSODIMAC.get("percentage")}%)'

        currentCategory = df.loc[desc_prod, "Categoria"].values
        currentCategoryLen = len(df.loc[desc_prod, "Categoria"].values)

        if currentCategoryLen > 0:
            currentCat = currentCategory[0]
            if newCat != currentCat:
                df.loc[desc_prod, "Categoria"] += f', {newCat}'

        alreadyImportedCategories.append(valueSODIMAC.get("category"))

for valueTELHANORTE in valuesTELHANORTE:
    try:
        alreadyInList = alreadyImportedCategories.index(valueTELHANORTE.get("category"))
    except ValueError as e:
        desc_prod = df["Texto breve de material"] == valueTELHANORTE.get("product")

        newCat = f'{valueTELHANORTE.get("category")} ({valueTELHANORTE.get("percentage")}%)'

        currentCategory = df.loc[desc_prod, "Categoria"].values
        currentCategoryLen = len(df.loc[desc_prod, "Categoria"].values)

        if currentCategoryLen > 0:
            currentCat = currentCategory[0]
            if newCat != currentCat:
                df.loc[desc_prod, "Categoria"] += f', {newCat}'

        alreadyImportedCategories.append(valueTELHANORTE.get("category"))

df.to_excel("final.xlsx", index=False)'''


# Produto + Marca
df = pd.read_excel('avada.xlsx', sheet_name=1, engine='openpyxl', usecols="BF,F", skiprows=2).values

with open('cats', 'w', newline='') as cats:
    wr = csv.writer(cats, quoting=csv.QUOTE_MINIMAL)
    for values in df:
        if type(values[0]) != float and type(values[1]) != float:
            wr.writerow([f'{values[0]};{values[1]}'])

'''
desc_prod = df["Texto breve de material"] == valueCEC.get("product")
df.loc[desc_prod, "Categoria"] = f'{valueCEC.get("category")} ({valueCEC.get("percentage")}%)'
'''

# Codigo para pegar o nome dos produtos formatado sem CBMM + nome do produto com CBMM
'''df = pd.read_excel('abc.xlsx', engine='openpyxl', usecols="B").values

with open('Todos Produtos', 'w', newline='') as myf:
    wr = csv.writer(myf, quoting=csv.QUOTE_MINIMAL)

    for productName in df:
        if type(productName[0]) != float:
            splitName = productName[0].split()

            try:
                findGarbageTextPosition = splitName.index('CBMM')

                formattedName = splitName[0:findGarbageTextPosition]
                wr.writerow([f'{" ".join(formattedName)};{productName[0]}'])
            except ValueError as e:
                wr.writerow(productName)'''
