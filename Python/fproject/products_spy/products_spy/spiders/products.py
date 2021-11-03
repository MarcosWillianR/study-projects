import scrapy
import csv
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager

'''with open("C:\\Users\\Marcos\\Desktop\\Projects\\Study\\Python\\finalProject\\kan\\kan\\spiders\\products",
                  newline=''
                  ) as f:
            reader = csv.reader(f)
            for row in reader:
                if len(row) == 1:
                    products.append(row[0].strip())'''


class ProductsSpider(scrapy.Spider):
    name = 'products'

    def start_requests(self):
        service = Service(ChromeDriverManager().install())
        options = Options()
        options.headless = True
        driver = webdriver.Chrome(service=service, chrome_options=options)

        products = [
            'ALIMENTO BAW WAW BIFINHO P / CAES CARNE 50G',
            'ALIMENTO BAW WAW BIFINHO P / CAES CARNE E VEGETAIS 50G',
            'pneu-aro-13'
        ]

        for product in products:
            yield scrapy.Request(f'https://www.extra.com.br/{product}/b')

    def parse(self, response):
        page_products = response.css('.ePzNqK::text').getall()
        #current_product = urllib.parse.unquote(response.url.split('/')[3])
        #closest = difflib.get_close_matches(current_product, page_products)

        print("@@@ Page products @@@")
        print(response.xpath('//*[contains(concat( " ", @class, " " ), concat( " ", "dtxHql", " " ))]'))
        print("@@@ fim page products@@@")

        '''for product_equal in closest:
            for product_page in response.css('.ikDayp'):
                product_page_name = product_page.css('.ePzNqK::text').get()

                if product_page_name == product_equal:
                    yield {
                        'product_name': product_page.css('.ePzNqK::text').get(),
                        'product_value': product_page.css('.dtxHql::text').get(),
                    };'''
