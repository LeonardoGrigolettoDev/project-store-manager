const productsServices = require('../services/products.services');
const productsControllers = require('../controllers/controllers');

const findAllProducts = async (req, res) => {
  const result = await productsServices.getAllProductsByDb();
  productsControllers.responseStatusOk(res, result);
};

const findProductById = async (req, res) => {
  const result = await productsServices.getProductByIdOnDb(req.params.id);
  if (result.length !== 0) {
    productsControllers.responseStatusOk(res, result[0]);
  } else {
    productsControllers.responseStatusNotFound(res, { message: 'Product not found' });
  }
};

const createProduct = async (req, res) => {
  const product = req.body;
  await productsServices.createProductOnDb(product);
  const result = await productsServices.getLastIdOnDb();
  productsControllers.responseStatusCreated(res, ...result[0]);
};

const updateProductById = async (req, res) => {
  const idParam = Number(req.params.id);
  const { name } = req.body;
  await productsServices.updateProductByIdOnDb(name, idParam);
  const [resFromDb] = await productsServices.getProductByIdOnDb(idParam);
  productsControllers.responseStatusOk(res, resFromDb);
};

const deleteProductById = async (req, res) => {
  const { id } = req.params;
  productsServices.deleteProductByIdOnDb(id);
  productsControllers.responseStatusDeleted(res);
};

module.exports = {
  findAllProducts,
  findProductById,
  createProduct,
  updateProductById,
  deleteProductById,
};
