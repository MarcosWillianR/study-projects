const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

const customers = [];

app.post('/account', (request, response) => {
  const { cpf, name } = request.body;

  const findCustomerWithSameCPF = customers.findIndex(c => c.cpf === cpf);

  if (findCustomerWithSameCPF !== -1) {
    return response.status(400).json({ message: 'Customer already exists!' });
  }

  const newCustomer = { id: uuidv4(), name, cpf, statement: [] };
  customers.push(newCustomer);

  return response.status(201).send();
});

app.get('/statement', (request, response) => {
  const { cpf } = request.headers;

  const findCustomer = customers.find(c => c.cpf === cpf);

  if (!findCustomer) {
    return response.status(400).json({ message: "Customer doesn't exists!" });
  }

  return response.json({ statement: findCustomer.statement });
});

app.listen(3333);