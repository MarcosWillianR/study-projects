from fastapi import FastAPI

app = FastAPI()

vendas = [
    {"id": 1, "name": "Produto 1", "unit_price": 100.00},
    {"id": 2, "name": "Produto 2", "unit_price": 200.00},
    {"id": 3, "name": "Produto 3", "unit_price": 300.00},
    {"id": 4, "name": "Produto 4", "unit_price": 400.00},
    {"id": 5, "name": "Produto 5", "unit_price": 500.00},
]


@app.get("/")
def home():
    return {"total_vendas": len(vendas)}


@app.get("/vendas")
def get_vendas():
    return {"vendas": vendas}


@app.get("/vendas/{id}")
def get_venda(id: int):
    try:
        return {"venda": vendas[id - 1]}
    except Exception as e:
        return {"error": str(e)}
