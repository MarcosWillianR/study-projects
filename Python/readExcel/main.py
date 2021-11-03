import pandas as pd
from openpyxl import Workbook, load_workbook
import json

df = pd.read_excel('file.xlsx', sheet_name=1, engine='openpyxl', usecols="F, CK, CL, CM", skiprows=2)

with open('values.json') as data_file:
    data = json.load(data_file)

    for data_item in data:
        desc_prod = df["DESCRIÇÃO DO PRODUTO"] == data_item.get("current_product")
        df.loc[desc_prod, "PRODUTO"] = data_item.get("current_product")
        df.loc[desc_prod, "PRODUTO - COINCIDENTE"] = data_item.get("product_name")
        df.loc[desc_prod, "VALOR R$"] = data_item.get("product_value")

df.to_excel("file2.xlsx", index=False)


'''df = pd.read_excel('file.xlsx', sheet_name=1, engine='openpyxl', usecols="F", skiprows=3).values

with open('products', 'w') as myfile:
    wr = csv.writer(myfile, quotechar=',', quoting=csv.QUOTE_MINIMAL)

    for productName in df:
        if type(productName[0]) != float:
            wr.writerow(productName);'''
