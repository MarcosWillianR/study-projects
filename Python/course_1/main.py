import os
import pandas as pd
import locale
import plotly.express as px

lista_arquivo = os.listdir('Vendas')
tabela_total = pd.DataFrame()

for arquivo in lista_arquivo:
    if 'vendas' in arquivo.lower():
        caminho_arquivo = os.path.join('Vendas', arquivo)
        tabela = pd.read_csv(caminho_arquivo)
        tabela_total = pd.concat([tabela_total, tabela])

tabela_total['Faturamento'] = tabela_total['Quantidade Vendida'] * \
    tabela_total['Preco Unitario']

# Quantidade vendida por produto
tabela_produtos = tabela_total.groupby('Produto').sum()
tabela_produtos = tabela_produtos[['Quantidade Vendida']].sort_values(
    by='Quantidade Vendida', ascending=False)

# Faturamento por produto
tabela_faturamento = tabela_total.groupby('Produto').sum()
tabela_faturamento = tabela_faturamento[['Faturamento']].sort_values(
    by='Faturamento', ascending=False)

# Faturamento por loja
tabela_lojas = tabela_total.groupby('Loja').sum()
tabela_lojas = tabela_lojas[['Faturamento']].sort_values(
    by='Faturamento', ascending=False)

grafico = px.bar(tabela_lojas, x=tabela_lojas.index, y='Faturamento')
grafico.show()
