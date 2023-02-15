const HTTP_BAD_REQ_STATUS = 400;
const HTTP_NOT_FOUND_STATUS = 404;
const HTTP_UNPROCES = 422;
const connection = require('../db/connection');

const verifyProductIdExists = (req, res, next) => {
  const { body } = req;
  const keys = body.map((element) =>
    Object.keys(element).includes('productId'));
  if (keys.includes(false)) {
    res
      .status(HTTP_BAD_REQ_STATUS)
      .json({ message: '"productId" is required' });
  } else {
    return next();
  }
};

const verifyQuantityExists = (req, res, next) => {
  const { body } = req;
  const keys = body.map((element) => Object.keys(element).includes('quantity'));
  if (keys.includes(false)) {
    res.status(HTTP_BAD_REQ_STATUS).json({ message: '"quantity" is required' });
  } else {
    return next();
  }
};

const verifyQuantityValue = (req, res, next) => {
  const { body } = req;
  const valueQuantity = body.map((element) => element.quantity > 0);
  if (valueQuantity.includes(false)) {
    res
      .status(HTTP_UNPROCES)
      .json({ message: '"quantity" must be greater than or equal to 1' });
  } else {
    return next();
  }
};

const verifyProductIdExistsOnDb = async (req, res, next) => {
  const { body } = req;
  let allIds = await connection.execute(`
    SELECT id FROM StoreManager.products;
  `);
  allIds = allIds[0].map((element) => element.id);
  console.log(allIds);
  const productIdValues = body.map((element) => element.productId);
  const haveId = productIdValues.map((element) => allIds.includes(element));
  if (haveId.includes(false)) {
    res.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Product not found' });
  } else {
    next();
  }
};

module.exports = {
  verifyProductIdExists,
  verifyQuantityExists,
  verifyQuantityValue,
  verifyProductIdExistsOnDb,
};
