const express = require("express");
const connection = require("./db/connection");
const productsModel = require('./models/products.model')

const app = express();

const HTTP_OK_STATUS = 200;

app.use(express.json());

app.get("/products", async (req, res) => {
  productsModel.findAllProducts(req, res)
});

app.get("/products/:id", async (req, res) => {
  productsModel.findProductById(req, res)
});

// não remova esse endpoint, é para o avaliador funcionar
app.get("/", (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação
module.exports = app;
