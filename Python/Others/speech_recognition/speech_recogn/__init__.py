__version__ = '0.1.0'

import speech_recognition as sr
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service

rec = sr.Recognizer()

with sr.Microphone() as mic:
    print('Calibrando microfone... aguarde...')
    rec.adjust_for_ambient_noise(mic)
    print('Microfone calibrado! Agora você pode falar!')
    audio = rec.listen(mic)

try:
    text = rec.recognize_google(audio, language='pt-BR')
    print(f'Você disse: {text}')
    if text.lower() == 'abrir youtube':
        print('Abrindo youtube, aguarde...')
        driver = webdriver.Chrome(ChromeDriverManager().install())
        driver.get('https://www.youtube.com/')
    input('Aperte enter para fechar o navegador')
except:
    print('Não entendi o que você disse.')
