const express = require('express');
const productsModel = require('./models/products.models');
const productsMiddleware = require('./middlewares/products.middleware');
const salesModel = require('./models/sales.model');
const salesMiddleware = require('./middlewares/sales.middleware');

const app = express();

app.use(express.json());

app.get('/products', productsModel.findAllProducts);

app.get('/products/:id', productsModel.findProductById);

app.get('/sales', salesModel.getAllSales);
app.get(
  '/sales/:id',
  salesMiddleware.verifySaleIdExistsOnDb,
  salesModel.getSaleById,
);

app.post(
  '/products',
  productsMiddleware.verifyNameJsonExists,
  productsMiddleware.verifyNameJsonData,
  productsModel.createProduct,
);

app.post(
  '/sales',
  salesMiddleware.verifyProductIdExists,
  salesMiddleware.verifyQuantityExists,
  salesMiddleware.verifyQuantityValue,
  salesMiddleware.verifyProductIdExistsOnDb,
  salesModel.createSaleProduct,
);

app.put(
  '/products/:id',
  productsMiddleware.verifyNameJsonExists,
  productsMiddleware.verifyNameJsonData,
  productsMiddleware.verifyProductIdExistsOnDb,
  productsModel.updateProductById,
);

app.delete(
  '/products/:id',
  productsMiddleware.verifyProductIdExistsOnDb,
  productsModel.deleteProductById,
);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação
module.exports = app;
