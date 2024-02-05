/* eslint-disable linebreak-style */
describe('Blog app ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Indiana JOnes',
      username: 'jones',
      password: 'jones1'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    const user2 = {
      name: 'Sydney f',
      username: 'sydney',
      password: 'fox1'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user2)
    /*   cy.request('POST', 'http://localhost:3003/api/testing/reset')*/
    cy.visit('http://localhost:5173')
  })
  it('Login form is shown', function() {
    cy.visit('http://localhost:5173')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
    /*   cy.contains('login').click() */

      cy.contains('login').click()
      cy.get('#username').type('jones')
      cy.get('#password').type('jones1')
      cy.get('#login-button').click()

      cy.contains('Indiana JOnes logged in')


    })

    /*     it.only('login fails with wrong password', function() {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Indiana Jones logged in')
    }) */
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'jones', password: 'jones1' })
      /*    cy.get('#username').type('jones')
      cy.get('#password').type('jones1')
      cy.get('#login-button').click() */

      /*    cy.get('#title').type('a title created by cypress')
      cy.get('#author').type('an author created by cypress')
      cy.get('#url').type('an url created by cypress') */
      /*       cy.contains('save').click() */
    })

    it('a new blog can be created', function() {
      cy.contains('create new').click()
      cy.createBlog({ title: 'first blog', author: 'Indy', url:'sadsasdadsd' })
    })


    /*     it('A blog can be created', function() {

      cy.contains('a title created by cypress')
      cy.get('#show').click()
      cy.contains('an author created by cypress')
      cy.contains('an url created by cypress')

    }) */

    it('a blog can be liked', function () {
      cy.contains('create new').click()
      cy.get('#title').type('a title created by cypress')
      cy.get('#author').type('an author created by cypress')
      cy.get('#url').type('an url created by cypress')
      cy.contains('save').click()
      cy.get('#show').click()
      cy.contains('a title created by cypress')
        .get('.likeBtn')
        .click()

      cy.contains('Likes 1')
    })

    it('a blog can be removed', function () {
      cy.contains('create new').click()
      cy.createBlog({ title: 'first blog', author: 'Indy', url:'sadsasdadsd' })
      cy.get('#show').click()
      cy.get('#removeBtn').click()
      cy.get('html').should('not.contain', 'first blog')

    })

    it('remove button is only shown to the blog posts author', function(){
      cy.contains('create new').click()
      cy.createBlog({ title: 'first blog', author: 'Indy', url:'sadsasdadsd' })
      cy.contains('logout').click()
      cy.login({ username: 'sydney', password: 'fox1' })
      cy.createBlog({ title: 'second blog', author: 'syd', url:'sadsasdadsd' })
      cy.contains('first blog')
        .get('#show').click()
      cy.contains('first blog')
        .should('not.contain', 'remove')




    })
  })


})