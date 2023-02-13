const connection = require('../db/connection');

const HTTP_OK_STATUS = 200;
const HTTP_NOTFOUND_STATUS = 404;

const findAllProducts = async (req, res) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  res.status(HTTP_OK_STATUS).json(result);
};

const findProductById = async (req, res) => {
    const [result] = await connection.execute(
        `SELECT * FROM StoreManager.products WHERE products.id = ${req.params.id};`,
    );
    if (result.length !== 0) {
        res.status(HTTP_OK_STATUS).json(result[0]);
    } else {
        res.status(HTTP_NOTFOUND_STATUS).json({ message: 'Product not found' });
    }
};

module.exports = {
  findAllProducts,
  findProductById,
};
