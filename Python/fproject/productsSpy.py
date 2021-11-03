from selenium.webdriver import Chrome
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager

service = Service(ChromeDriverManager().install())
options = Options()
options.headless = False
driver = webdriver.Chrome(service=service)

values = []

products = [
    'ALIMENTO BAW WAW BIFINHO P / CAES CARNE 50G',
    'ALIMENTO BAW WAW BIFINHO P / CAES CARNE E VEGETAIS 50G',
    'pneu-aro-13'
]

for product in products:
    driver.get(f'https://www.extra.com.br/{product}/b')
    product_values = driver.find_elements(By.CSS_SELECTOR, '.dtxHql')
    for value in product_values:
        values.append(value.text)
        print(value)

print(values)

driver.quit()

'''
    products = [
        'ALIMENTO BAW WAW BIFINHO P / CAES CARNE 50G',
        'ALIMENTO BAW WAW BIFINHO P / CAES CARNE E VEGETAIS 50G',
    ]

    with open("C:\\Users\\Marcos\\Desktop\\Projects\\Study\\Python\\finalProject\\kan\\kan\\spiders\\products",
              newline=''
              ) as f:
        reader = csv.reader(f)
        for row in reader:
            if len(row) == 1:
                products.append(row[0].strip())'''