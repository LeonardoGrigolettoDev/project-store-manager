const connection = require('../db/connection');

const HTTP_OK_STATUS = 200;

const createSaleDate = async (req, res, next) => {
  await connection.execute(
    `INSERT INTO StoreManager.sales
        (date) VALUES (NOW())`,
  );
  return next();
};

const createSaleProduct = async (req, res) => {
  const { body } = req;
  let lastId = await connection.execute(`
  SELECT LAST_INSERT_ID() as id FROM StoreManager.sales;
  `);
  lastId = lastId[0][0].id;
  body.map(async (element) => {
    await connection.execute(
      `
    INSERT INTO StoreManager.sales_products
    (sale_id, product_id, quantity) VALUES (?, ?, ?)
    `,
      [lastId, element.productId, element.quantity],
    );
  });
  res.status(201).json({
    id: lastId,
    itemsSold: body,
  });
};

const getAllSales = async (req, res) => {
  const allSales = await connection.execute(`
  SELECT s.id as saleId, date, product_id as productId, quantity
  FROM StoreManager.sales as s
  INNER JOIN StoreManager.sales_products as p
  ON s.id = p.sale_id
  `);
  res.status(HTTP_OK_STATUS).json(allSales[0]);
};

const getSaleById = async (req, res) => {
  const saleId = req.params.id;
  const sales = await connection.execute(
    `
    SELECT date, product_id as productId, quantity
    FROM StoreManager.sales as s
    INNER JOIN StoreManager.sales_products as p
    ON s.id = p.sale_id
    WHERE p.sale_id = ${saleId}
    `,
  );
  res.status(HTTP_OK_STATUS).json(sales[0]);
};

module.exports = {
  createSaleDate,
  createSaleProduct,
  getAllSales,
  getSaleById,
};
