import scrapy
import difflib
import urllib.parse
import csv
from scrapy_selenium import SeleniumRequest
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from scrapy_splash import SplashRequest

class ExampleSpider(scrapy.Spider):
    name = 'shops'

    def get_products_from_csv(self):
        with open("C:\\Users\\Marcos\\Desktop\\Projects\\Study\\Python\\finalProject\\kan\\kan\\spiders\\products",
                  newline=''
                  ) as f:
            reader = csv.reader(f)
            for row in reader:
                if len(row) == 1:
                    yield row[0].strip()

    def start_requests(self):
        for product in self.get_products_from_csv():
            yield SplashRequest(
                f'https://www.paodeacucar.com/busca?terms={urllib.parse.quote(product)}&qt=12&p=1&gt=grid',
                self.parse,
                args={'wait': 0.15},
            )

    def get_close_matches_icase(self, word, possibilities, *args, **kwargs):
        lword = word.lower()
        lpos = {}
        for p in possibilities:
            if p.lower() not in lpos:
                lpos[p.lower()] = [p]
            else:
                lpos[p.lower()].append(p)

        lmatches = difflib.get_close_matches(lword, lpos.keys(), *args, **kwargs)
        return lmatches

    def parse(self, response):
        current_product = urllib.parse.unquote(response.url.split('/')[3]);
        formatted_current_product = current_product.replace('busca?terms=', '').replace('&qt=12&p=1&gt=grid', '')

        print(f'@@PRODUTO: {formatted_current_product} @@@ 1 VALOR ENCONTRADO: {response.css(".lkWvql::text").get()}')

        closest = self.get_close_matches_icase(
            formatted_current_product,
            response.css('.gDBBEX .hcByGl::text').getall()
        )

        if len(closest) > 0:
            for product_page in response.css('.elHAFy .bCRCCt'):
                product_page_name = product_page.css('.gDBBEX .hcByGl::text').get()
                if product_page_name.lower() == closest[0]:
                    yield {
                        'current_product': formatted_current_product,
                        'product_name': product_page.css('.gDBBEX .hcByGl::text').get(),
                        'product_value': product_page.css('.lkWvql::text').get(),
                    };

        ''' Codigo para pegar do site Pague Menos
        closest = difflib.get_close_matches(current_product,
                                            response.css('.vtex-product-summary-2-x-brandName::text').getall());

        for product_equal in closest:
            for product_page in response.css('.pb4'):
                product_page_name = product_page.css('.vtex-product-summary-2-x-brandName::text').get();

                if product_page_name == product_equal:
                    yield {
                        'product_name': product_page.css('.vtex-product-summary-2-x-brandName::text').get(),
                        'product_value': product_page.css('.paguemenos-teaser-labels-2-x-price::text').get(),
                    };'''

        '''
            Codigo para pegar dados do site [Extra]

        page_products = response.css('.ePzNqK::text').getall()
        current_product = urllib.parse.unquote(response.url.split('/')[3])
        closest = difflib.get_close_matches(current_product, page_products)

        print("@@@ Page products @@@")
        print(response.css('title'))
        print("@@@ fim page products@@@")

        for product_equal in closest:
            for product_page in response.css('.ikDayp'):
                product_page_name = product_page.css('.ePzNqK::text').get()

                if product_page_name == product_equal:
                    yield {
                        'product_name': product_page.css('.ePzNqK::text').get(),
                        'product_value': product_page.css('.dtxHql::text').get(),
                    };'''
