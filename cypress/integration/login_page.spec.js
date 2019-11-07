/// <reference types="Cypress" />

describe('Login', function() {
    it('login', function() {
        cy.visit('/')

        cy.get('[test-button-login]').click()
        cy.contains('需要用户名或邮箱')

        cy.get('[test-input1-login]').type('1')
        cy.get('[test-button-login]').click()
        cy.contains('用户名不存在')
        
        cy.get('[test-input2-login]').type('1')
        cy.get('[test-button-login]').click()
        cy.contains('需要用户名或邮箱')

        
    })
})

describe('Register and Login', function() {
    it('register', function() {
        cy.get('[test-span-login]').click()

        cy.get('[test-button-register]').click()
        cy.contains('用户名不合法')

        cy.get('[test-input1-register]').type('1')
        cy.get('[test-button-register]').click()
        cy.contains('用户名不合法')
        
        cy.get('[test-input1-register]').type('123')
        cy.get('[test-button-register]').click()
        cy.contains('密码不合法')

        cy.get('[test-input1-register]').clear().type('123')
        cy.get('[test-input3-register]').type('123')
        cy.get('[test-button-register]').click()
        cy.contains('邮箱不合法')
        
        cy.get('[test-input2-register]').type('1@1.com')
        cy.get('[test-button-register]').click()
        cy.contains('邮箱不合法')

        cy.get('[test-input2-register]').clear().type('16307130169@fudan.edu.cn')
        cy.get('[test-button-register]').click()

    })

    it('login', function() {
        cy.get('[test-span-register]').click()

        cy.get('[test-input1-login]').clear().type('123')
        cy.get('[test-input2-login]').type('123')
        cy.get('[test-button-login]').click()
        cy.contains('成功')
        cy.url().should('include', '/mainPage')

    })
})