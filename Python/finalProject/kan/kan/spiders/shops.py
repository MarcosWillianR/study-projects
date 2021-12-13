import logging

import scrapy
import difflib
import urllib.parse
import csv

from scrapy import logformatter
from scrapy.logformatter import SCRAPEDMSG, CRAWLEDMSG
from scrapy.utils.request import referer_str
from scrapy_selenium import SeleniumRequest
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from scrapy_splash import SplashRequest
from fuzzywuzzy import fuzz
import re

from twisted.python.failure import Failure

class ContentFilter(logging.Filter):
    def filter(self, record):
        match = re.search(r'Scraped', record.msg)

        if match:
            newMsg = 'Retorno: %(item)s'
            record.msg = newMsg

        return record

class ExampleSpider(scrapy.Spider):
    name = 'shops'

    '''def __init__(self, *args, **kwargs):
        logger = logging.getLogger('scrapy.downloadermiddlewares.retry')
        logger.setLevel(logging.WARNING)
        logger2 = logging.getLogger('scrapy.core.engine')
        logger2.setLevel(logging.WARNING)

        for handler in logging.root.handlers:
            handler.addFilter(ContentFilter())

        super().__init__(*args, **kwargs)'''

    def get_products_from_csv(self):
        with open("C:\\Users\\Marcos\\Desktop\\Projects\\Study\\Python\\finalProject\\kan\\kan\\spiders\\cats",
        #with open("C:\\Users\\Marcos\\Desktop\\Projects\\Study\\Python\\finalProject\\kan\\values.csv",
                  newline=''
                  ) as f:
            reader = csv.reader(f)
            for row in reader:
                if len(row) == 1:
                    yield row[0].strip()

    def start_requests(self):
        for product in self.get_products_from_csv():
            '''yield SplashRequest(
                f'https://www.paodeacucar.com/busca?terms={urllib.parse.quote(product)}&qt=12&p=1&gt=grid',
                self.parse,
                args={'wait': 0.15},
            )'''
            yield SplashRequest(
                f'https://www.savegnago.com.br/busca/{urllib.parse.quote(product.split(";")[0])}',
                self.parse,
                args={'wait': 0.15},
                cb_kwargs=dict(mark=product.split(';')[1])
            )

            '''yield SplashRequest(
                f'https://www.sodimac.com.br/sodimac-br/search?Ntt={urllib.parse.quote(product.split(";")[0])}',
                self.parse,
                args={'wait': 0.15},
                cb_kwargs=dict(productp=product.split(';')[1] if len(product.split(';')) > 1 else None),
                dont_filter=True
            )'''
            '''yield SplashRequest(
                f'https://www.sodimac.com.br{product.split(";")[0]}',
                self.parse,
                args={'wait': 0.1},
                cb_kwargs=dict(productp=product.split(';')[1], percentage=product.split(';')[2]),
                dont_filter=True
            )'''

            '''yield SplashRequest(
                f'https://www.cec.com.br/busca?q={urllib.parse.quote(product.split(";")[0])}',
                self.parse,
                args={'wait': 0.15},
                cb_kwargs=dict(productp=product.split(';')[1] if len(product.split(';')) > 1 else None),
                dont_filter=True
            )'''
            '''yield SplashRequest(
                f'https://www.cec.com.br{product.split(";")[0]}',
                self.parse,
                args={'wait': 0.15},
                cb_kwargs=dict(productp=product.split(';')[1], percentage=product.split(';')[2]),
                dont_filter=True
            )'''

            '''yield SplashRequest(
                f'https://www.telhanorte.com.br/resultado-busca?terms={urllib.parse.quote(product.split(";")[0])}',
                self.parse,
                args={'wait': 0.15},
                cb_kwargs=dict(productp=product.split(';')[1] if len(product.split(';')) > 1 else None),
                dont_filter=True
            )'''
            '''yield SplashRequest(
                f'https://www.telhanorte.com.br{product.split(";")[0]}',
                self.parse,
                args={'wait': 0.1},
                cb_kwargs=dict(productp=product.split(';')[1], percentage=product.split(';')[2]),
                dont_filter=True
            )'''

    def get_rate(self, product1, product2):
        regex = r'[0-9]+'
        numbers1 = set(re.findall(regex, product1))
        numbers2 = set(re.findall(regex, product2))
        union = numbers1.union(numbers2)
        intersection = numbers1.intersection(numbers2)
        if len(numbers1) == 0 and len(numbers2) == 0:
            rate = 1
        else:
            rate = (len(intersection) / len(union))
        return rate

    def parse(self, response, productp, percentage):
        # TELHA NORTE PUXAR CATEGORIA
        ''' category1 = response.css('.bread-crumb li:nth-child(3) span::text').get()
        category2 = response.css('.bread-crumb li:nth-child(2) span::text').get()

        yield {
            'product': productp,
            'category': category1 or category2,
            'percentage': percentage
        }'''

        # TELHA NORTE PUXAR URL DE DETALHE
        '''current_product = urllib.parse.unquote(response.url.split('/')[3]).replace('resultado-busca?terms=', '')

        closest_product_prediction = 0
        closest_product_detail_url = ''

        for product in response.css('.x-shelf__link'):
            product_f = product.css('::attr(title)').get()

            prediction = fuzz.token_set_ratio(current_product.lower(), product_f)

            highest_prediction = prediction > 50 and prediction > closest_product_prediction

            if highest_prediction:
                closest_product_prediction = prediction
                closest_product_detail_url = product.css('::attr(href)').get()

        if closest_product_prediction > 0:
            yield {
                '': f'{closest_product_detail_url};{productp if productp else current_product};{closest_product_prediction}'
            }'''

        # CEC PUXAR CATEGORIA
        '''category1 = response.css('#breadcrumb li:nth-child(4) a::text').get();
        category2 = response.css('#breadcrumb li:nth-child(3) a::text').get()

        yield {
            'product': productp,
            'category': category1 or category2,
            'percentage': percentage
        }'''

        # CEC PUXAR URL DE DETALHE
        '''current_product = urllib.parse.unquote(response.url.split('/')[3]).replace('busca?q=', '')

        closest_product_prediction = 0
        closest_product_detail_url = ''

        for product in response.css('.name-and-brand'):
            product_f = product.css('.name-and-brand::attr(title)').get()

            prediction = fuzz.token_set_ratio(current_product.lower(), product_f)

            highest_prediction = prediction > 50 and prediction > closest_product_prediction

            if highest_prediction:
                closest_product_prediction = prediction
                closest_product_detail_url = product.css('::attr(href)').get()

        if closest_product_prediction > 0:
            yield {
                '': f'{closest_product_detail_url};{productp if productp else current_product};{closest_product_prediction}'
            }'''

        # SODIMAC PUXAR CATEGORIA
        '''category1 = response.css('.bread-crumb-wrapper .link-primary .jsx-3306415055::text').get();
        category2 = response.css('.bread-crumb-wrapper~ .bread-crumb-wrapper+ .bread-crumb-wrapper .link-primary .jsx-3306415055::text').get()

        yield {
            'product': productp,
            'category': category1 or category2,
            'percentage': percentage
        }'''

        # SODIMAC PUXAR URL DE DETALHE
        '''current_product = urllib.parse.unquote(response.url.split('/')[4]).replace('search?Ntt=', '')

        closest_product_prediction = 0
        closest_product_detail_url = ''

        for product in response.css('#title-pdp-link'):
            product_f = product.css('.product-title::text').get()

            prediction = fuzz.token_set_ratio(current_product.lower(), product_f)

            highest_prediction = prediction > 50 and prediction > closest_product_prediction

            if highest_prediction:
                closest_product_prediction = prediction
                closest_product_detail_url = product.css('::attr(href)').get()

        if closest_product_prediction > 0:
            yield {
                '': f'{closest_product_detail_url};{productp if productp else current_product};{closest_product_prediction}'
            }'''

    def parse(self, response, mark):
        current_product = urllib.parse.unquote(response.url.split('/')[4]);

        closest_product = ''
        closest_product_prediction = 0
        closest_product_price = 0.0

        for product in response.css('.card_cardContainer__1PQop'):
            product_f = product.css('.card_title__E1Ibf span::text').get();

            prediction = fuzz.token_set_ratio(current_product.lower(), product_f)
            mark_prediction = fuzz.token_set_ratio(product_f, mark.lower());
            grammar_equality = self.get_rate(current_product, product_f);

            same_mark = mark_prediction == 100
            highest_prediction = prediction > 80 and prediction > closest_product_prediction
            same_grammar = grammar_equality == 1.0

            if same_mark and highest_prediction and same_grammar:
                closest_product = product_f
                closest_product_prediction = prediction
                closest_product_price = product.css('.card_price__3lqeZ::text').get()

        if closest_product_prediction > 0:
            yield {
                'current_product': current_product,
                'product_name': closest_product,
                'product_value': closest_product_price,
                'product_prediction': closest_product_prediction,
                'grammar_value': re.findall(r'[0-9]+', closest_product)[0],
                'shop_site_link': response.url,
                'product_mark': mark,
            }
