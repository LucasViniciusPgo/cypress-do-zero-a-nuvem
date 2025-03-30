// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get("#firstName")
        .as("first")
        .should("be.visible")
        .type("Lucas", {
            delay: 0
        })
    cy.get("@first")
        .should("have.value", "Lucas")

    cy.get("#lastName")
        .as("last")
        .should("be.visible")
        .type("Pereira", {
            delay: 0
        })
    cy.get("@last")
        .should("have.value", "Pereira")

    cy.get("#email")
        .as("email")
        .should("be.visible")
        .type("lucas@exemplo.com", {
            delay: 0
        })
    cy.get("@email")
        .should("have.value", "lucas@exemplo.com")

    cy.get("#product")
        .select("Blog")
        .should("have.value", "blog")

    cy.get('[type="checkbox"]')
        .as("checkBox")
        .should('not.be.checked')
        .check("email")
    cy.get("@checkBox").should("be.checked")

    cy.get("#open-text-area")
        .as("textArea")
        .should("be.visible")
        .type("Obrigado pelo formulário", {
            delay: 0
        })
    cy.get("@textArea").should("be.visible")

    cy.contains("button", "Enviar")
    .should("be.visible")
    .click()
})

Cypress.Commands.add('fillMandatoryFieldsAndSubmitObject', (data) => {
    cy.get("#firstName")
        .as("first")
        .should("be.visible")
        .type(data.firstName, {
            delay: 0
        })
    cy.get("@first")
        .should("have.value", data.firstName)

    cy.get("#lastName")
        .as("last")
        .should("be.visible")
        .type(data.lastName, {
            delay: 0
        })
    cy.get("@last")
        .should("have.value", data.lastName)

    cy.get("#email")
        .as("email")
        .should("be.visible")
        .type(data.email, {
            delay: 0
        })
    cy.get("@email")
        .should("have.value", data.email)

    cy.get("#open-text-area")
        .as("textArea")
        .should("be.visible")
        .type(data.text, {
            delay: 0
        })
    cy.get("@textArea").should("be.visible")

    cy.contains("button", "Enviar")
    .should("be.visible")
    .click()
})
Cypress.Commands.add('fillMandatoryFieldsAndSubmitObjectDefault', (data = {
    firstName: 'Pedro',
    lastName: "Garcia",
    email: "Pedro@exemplo.com",
    text: "teste"
}) => {
    cy.get("#firstName")
        .as("first")
        .should("be.visible")
        .type(data.firstName, {
            delay: 0
        })
    cy.get("@first")
        .should("have.value", data.firstName)

    cy.get("#lastName")
        .as("last")
        .should("be.visible")
        .type(data.lastName, {
            delay: 0
        })
    cy.get("@last")
        .should("have.value", data.lastName)

    cy.get("#email")
        .as("email")
        .should("be.visible")
        .type(data.email, {
            delay: 0
        })
    cy.get("@email")
        .should("have.value", data.email)

    cy.get("#open-text-area")
        .as("textArea")
        .should("be.visible")
        .type(data.text, {
            delay: 0
        })
    cy.get("@textArea").should("be.visible")

    cy.contains("button", "Enviar")
    .should("be.visible")
    .click()
})