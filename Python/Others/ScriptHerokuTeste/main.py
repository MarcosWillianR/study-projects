import requests
from datetime import datetime

request = requests.get('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL')

request_dic = request.json()

dollar_quotation = request_dic['USDBRL']['bid']
euro_quotation = request_dic['EURBRL']['bid']
btc_quotation = request_dic['BTCBRL']['bid']

# datetime with format: dd/mm/yyyy hh:mm:ss
now = datetime.now().strftime('%d/%m/%Y %H:%M:%S')

print(f"Cotação Atualizada. {now}\nDólar: {dollar_quotation}\nEuro: {euro_quotation}\nBTC: {btc_quotation}")