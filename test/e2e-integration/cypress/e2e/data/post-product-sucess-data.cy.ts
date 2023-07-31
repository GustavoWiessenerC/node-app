
const products = require('../../fixtures/products.json')

describe('Post - API Product', () => {

    products.forEach(product => {
        it(`Should in create new product - product : ${product.name}`, () => {
            cy.request({
              method: 'POST',
              url: '/products',
              headers: {
                'Content-Type': 'application/json'
              },
              body: {
                "name": product.name,
                "description": product.description,
                "price": product.price
              }
            }).then((response) => {
              expect(response.status).to.equal(201);          

              const { id , name , description , price } = response.body;
        
              expect(product.name).equal(name);
              expect(product.description).equal(description);
              expect(product.price).equal(price)
              expect(id).to.be.exist;
            });
          });
    });
  });