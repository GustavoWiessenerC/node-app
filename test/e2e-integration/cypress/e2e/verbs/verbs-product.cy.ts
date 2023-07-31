
const methodsNotAllowed = [ 'PATCH', 'DELETE', 'OPTIONS'];

describe('Post - API Product - Validate in metodo now Allowd', () => {

    methodsNotAllowed.forEach(method => {
        it(`Should allow ${method} method`, () => {
          cy.request({
            method,
            url: '/products',
            failOnStatusCode: false,
          }).then((response) => {
            expect(response.status).to.be.equal(405);
          });
        });
      });
  });