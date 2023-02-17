const salesServices = require('../services/sales.services');
const salesControllers = require('../controllers/controllers');

const createSaleProduct = async (req, res) => {
  await salesServices.createSaleDateOnDb();
  const { body } = req;
  let lastId = await salesServices.lastId();
  lastId = lastId[0][0].id;
  body.map(async (element) => {
    await salesServices.createSaleProductOnDb(lastId, element);
  });
  salesControllers.responseStatusCreated(res, {
    id: lastId,
    itemsSold: body,
  });
};

const getAllSales = async (req, res) => {
  const allSales = await salesServices.getAllSalesOnDb();
  salesControllers.responseStatusOk(res, allSales[0]);
};

const getSaleById = async (req, res) => {
  const saleId = req.params.id;
  const sales = await salesServices.getSaleByIdOnDb(saleId);
  salesControllers.responseStatusOk(res, sales[0]);
};

module.exports = {
  createSaleProduct,
  getAllSales,
  getSaleById,
};
