const connection = require('../db/connection');

const HTTP_OK_STATUS = 200;
const HTTP_NOTFOUND_STATUS = 404;
const HTTP_CREATED_STATUS = 201;

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

const createProduct = async (req, res) => {
  const product = req.body;
  await connection.execute(
    `INSERT INTO StoreManager.products 
        (name) VALUES (?)`,
    [product.name],
  );
  const result = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id DESC LIMIT 1',
  );
  res.status(HTTP_CREATED_STATUS).json(...result[0]);
};

// const sendCreatedProduct = async (req, res) => {
//   const { body } = req;

//   const result = await connection.execute(
//     `SELECT * FROM StoreManager.products ORDER BY id DESC LIMIT 1`
//   );
//   res.status(HTTP_CREATED_STATUS).json(...result[0]);
// };

const updateProductById = async (req, res) => {
  const idParam = Number(req.params.id);
  console.log(typeof idParam);
  const { name } = req.body;
  console.log(name);
  await connection.execute(
    `
    UPDATE StoreManager.products SET name='${name}' WHERE id = ${idParam};
    `,
  );
  const [resFromDb] = await connection.execute(
    `
    SELECT * FROM StoreManager.products WHERE id = ${idParam};
    `,
  );
  res.status(HTTP_OK_STATUS).json(resFromDb[0]);
};

module.exports = {
  findAllProducts,
  findProductById,
  createProduct,
  updateProductById,
  //   sendCreatedProduct,
};
