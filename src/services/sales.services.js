const connection = require('../db/connection');

const createSaleDateOnDb = async () => connection.execute(
    `INSERT INTO StoreManager.sales
            (date) VALUES (NOW())`,
  );

const lastId = async () => connection.execute(`
  SELECT LAST_INSERT_ID() as id FROM StoreManager.sales;
  `);

const createSaleProductOnDb = async (lastIdOnDb, obj) => connection.execute(
    `
      INSERT INTO StoreManager.sales_products
      (sale_id, product_id, quantity) VALUES (?, ?, ?)
      `,
    [lastIdOnDb, obj.productId, obj.quantity],
  );

const getAllSalesOnDb = async () => connection.execute(`
    SELECT s.id as saleId, date, product_id as productId, quantity
    FROM StoreManager.sales as s
    INNER JOIN StoreManager.sales_products as p
    ON s.id = p.sale_id
    `);

const getSaleByIdOnDb = async (id) => connection.execute(
    `
    SELECT date, product_id as productId, quantity
    FROM StoreManager.sales as s
    INNER JOIN StoreManager.sales_products as p
    ON s.id = p.sale_id
    WHERE p.sale_id = ${id}
        `,
  );

module.exports = {
  createSaleDateOnDb,
  lastId,
  createSaleProductOnDb,
  getAllSalesOnDb,
  getSaleByIdOnDb,
};
