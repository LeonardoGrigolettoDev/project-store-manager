const getAllProductsResult = {
  body: [
    {
      id: 1,
      name: "Martelo de Thor",
    },
    {
      id: 2,
      name: "Traje de encolhimento",
    },
    {
      id: 3,
      name: "Escudo do Capitão América",
    },
  ],
  status: 200,
};

const getProductByIdResult = {
  body: {
    id: 1,
    name: "Martelo de Thor",
  },
  status: 200,
};

module.exports = {
  getAllProductsResult,
  getProductByIdResult,
};
