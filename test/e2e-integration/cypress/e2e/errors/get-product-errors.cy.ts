
describe('Post - API Product', () => {

    it('Should handle error in get all products - route invalid', () => {
        cy.request({
          method: 'GET',
          url: '/product',
          headers: {
            'Content-Type': 'application/json'
          },
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.equal(404); 
          expect(response.body).to.have.property('error', 'Not Found'); 
        });
      });
      
  });