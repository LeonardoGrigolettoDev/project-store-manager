const express = require('express');
const productsModel = require('./models/products.model');

const app = express();

app.use(express.json());

app.get('/products', async (req, res) => {
  productsModel.findAllProducts(req, res);
});

app.get('/products/:id', async (req, res) => {
  productsModel.findProductById(req, res);
});

app.post('/products', async (req, res) => {
  productsModel.createProduct(req, res);
  // productsModel.sendCreatedProduct(req, res);
});

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação
module.exports = app;
