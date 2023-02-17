const connection = require('../db/connection');

const getAllProductsByDb = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};

const getProductByIdOnDb = async (id) => {
  const [result] = await connection.execute(
    `SELECT * FROM StoreManager.products WHERE products.id = ${id};`,
  );
  return result;
};

const createProductOnDb = async (body) => {
  const result = await connection.execute(
    `INSERT INTO StoreManager.products 
        (name) VALUES (?)`,
    [body.name],
  );
  return result;
};

const getLastIdOnDb = async () => {
  const result = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id DESC LIMIT 1',
  );
  return result;
};

const updateProductByIdOnDb = async (name, idParam) => connection.execute(
    `
    UPDATE StoreManager.products SET name='${name}' WHERE id = ${idParam};
    `,
  );

const deleteProductByIdOnDb = async (id) => 
connection.execute(`DELETE FROM StoreManager.products WHERE id=${id}`);

module.exports = {
  getAllProductsByDb,
  getProductByIdOnDb,
  createProductOnDb,
  getLastIdOnDb,
  updateProductByIdOnDb,
  deleteProductByIdOnDb,
};
