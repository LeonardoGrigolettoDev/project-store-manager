const connection = require('../db/connection');

const HTTP_BAD_REQ_STATUS = 400;
const HTTP_UNPROCES = 422;
const HTTP_NOT_FOUND_STATUS = 404;

const verifyNameJsonExists = (req, res, next) => {
  const { body } = req;
  if (Object.keys(body).includes('name')) {
    next();
  } else {
    res.status(HTTP_BAD_REQ_STATUS).json({
      message: '"name" is required',
    });
  }
};

const verifyNameJsonData = (req, res, next) => {
  const { body } = req;
  if (body.name.length > 4) {
    next();
  } else {
    res.status(HTTP_UNPROCES).json({
      message: '"name" length must be at least 5 characters long',
    });
  }
};

const verifyProductIdExistsOnDb = async (req, res, next) => {
  const { id } = req.params;
  const [idOnDataBase] = await connection.execute(
    `
    SELECT * FROM StoreManager.products WHERE id = ${id};
    `,
  );
  if (!idOnDataBase.length > 0) {
    res.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Product not found' });
  } else {
    next();
  }
  console.log(idOnDataBase);
};

module.exports = {
  verifyNameJsonExists,
  verifyNameJsonData,
  verifyProductIdExistsOnDb,
};
