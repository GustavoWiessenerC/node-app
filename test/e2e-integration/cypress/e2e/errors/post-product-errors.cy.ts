describe('Errors - validate in create new Products', () => {

    it('Should return error for invalid "name" field', () => {
        const invalidProduct = {
          name: 'A', 
          description: 'Conforto do seu lar',
          price: 100
        };
      
        cy.request({
          method: 'POST',
          url: '/products',
          headers: {
            'Content-Type': 'application/json'
          },
          failOnStatusCode: false,
          body: invalidProduct
        }).then((response) => {
          expect(response.status).to.equal(400)
          expect(response.body.message).to.include('name must be longer than or equal to 3 characters');
        });
      });
      
      it('Should return error for invalid "description" field', () => {
        const invalidProduct = {
          name: 'Mesa 4 Cadeiras',
          description: 'Short',
          price: 100
        };
      
        cy.request({
          method: 'POST',
          url: '/products',
          headers: {
            'Content-Type': 'application/json'
          },
          failOnStatusCode: false,
          body: invalidProduct
        }).then((response) => {
          expect(response.status).to.equal(400); 
          expect(response.body.message).to.include('description must be longer than or equal to 10 characters');
        });
      });
      
      it('Should return error for invalid "price" field', () => {
        const invalidProduct = {
          name: 'Conjuto Moveis',
          description: 'Product Description',
          price: 0 
        };
      
        cy.request({
          method: 'POST',
          url: '/products',
          headers: {
            'Content-Type': 'application/json'
          },
           failOnStatusCode: false,
          body: invalidProduct
        }).then((response) => {
          expect(response.status).to.equal(400); // Verifica se a requisição retornou status 400 (Bad Request)
          expect(response.body.message).to.include('price must not be less than 1');
        });
      });
      
})