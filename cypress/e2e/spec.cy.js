// describe('template spec', () => {
//   it('passes', () => {
//     cy.visit('https://example.cypress.io')
//   })
// })
describe('My First Test', () => {
  // beforeEach(() => {
  //   // reset and seed the database prior to every test
  //   cy.exec('npm run db:reset && npm run db:seed')

  //   // This is a command defined in cypress.config.js that will be executed in a node environment
  //   // It can do many things https://docs.cypress.io/api/commands/task, maybe it's easier to use than cy.exec
  //   cy.task('log', 'This will be output to the terminal')
  // })


  it('Does not do much!', () => {
    expect(true).to.equal(true)
  })
  it('Visits the Kitchen Sink', () => {
    cy.visit('https://example.cypress.io')

    cy.contains('type').click()

    cy.url().should('include', '/commands/actions')

    cy.get('.action-email').type('fake@email.com')

    cy.get('.action-email').should('have.value', 'fake@email.com')
  })
})