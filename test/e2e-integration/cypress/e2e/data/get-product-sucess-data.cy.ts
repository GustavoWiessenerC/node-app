
describe('Post - API Product', () => {

  it('Should in get all products ', () => {
    cy.request({
      method: 'GET',
      url: '/products',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.have.length.greaterThan(0);
    });
  });
});