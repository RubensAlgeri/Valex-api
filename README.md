<p align="center">
  <a href="https://github.com/$username-github/$nome-repositorio">
    <img src="./readme.png" alt="readme-logo" width="80" height="80">
  </a>

  <h3 align="center">
    $nome-repositorio
  </h3>
</p>

## Usage

```bash
$ git clone https://github.com/$RubensAlgeri/$projeto18-valex

$ cd $projeto18-valex

$ npm install

$ npm run dev
```

API:

```
- GET /card/:id
    - Rota para obter o extrato de um cartão pelo id
    - headers: {}
    - body: {}
- POST /card (autenticada)
    - Rota para cadastrar um novo cartão
    - headers: {"x-api-key":"$api-key"}
    - body: {
        "type": 'groceries'||'restaurants'||'transport'||'education'||'health',
        "employeeId": ""
    }
- PUT /card/:id
    - Rota para ativar o cartão pelo id
    - body: {
    "CVC": "000",
    "password": "0000"
    }
- PUT /blockstatus/:id
    - Rota para mudar o status de bloqueado de um cartão pelo id
    - body: {
        "password": "0000"
    }
- POST /payment/:id
    - Rota para registrar um pagamento no cartão pelo id
    - headers: {}
    - body: {
        "amount": >0,
        "password": "0000",
        "businessId": ""
    }
- POST /recharge/:id (autenticada)
    - Rota para recarregar um cartão pelo id
    - headers: { "x-api-key":"$api-key" }
    - body: {
        "amount": >0,
    }
```