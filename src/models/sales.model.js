const connection = require('../db/connection');

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

module.exports = {
  createSaleDate,
  createSaleProduct,
};
