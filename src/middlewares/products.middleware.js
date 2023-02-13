const HTTP_BAD_REQ_STATUS = 400;
const HTTP_UNPROCES = 422;

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

module.exports = {
  verifyNameJsonExists,
  verifyNameJsonData,
};
