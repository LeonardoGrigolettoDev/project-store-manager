const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const app = require("../../../src/app");

chai.use(chaiHttp);
const { expect } = chai;
const productsMocks = require("./products.mocks");

describe("Testes de unidade da camada products.model:", function () {
  describe("1 - Rota: get", function () {
    it('1.1 - Get "/products" deve retornar todos os elementos necessários.', async function () {
      sinon.stub(app, "get").resolves(productsMocks.getAllProductsResult);
      const response = await chai.request(app).get("/products");
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(
        productsMocks.getAllProductsResult.body
      );
      sinon.restore();
    });
    it('1.2 - Get "/products/:id" deve retornar o objeto com os elementos desejados.', async function () {
      sinon.stub(app, "get").resolves(productsMocks.getProductByIdResult);
      const response = await chai.request(app).get("/products/1");
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(
        productsMocks.getProductByIdResult.body
      );
      sinon.restore();
    });
  });
});
