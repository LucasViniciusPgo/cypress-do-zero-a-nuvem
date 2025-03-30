describe('Centralde Atendimento ao Cliente TAT', () => {

  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('Verifica o título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')

  })

  it('preenche os campos obrigatórios e envia o formulário', () => {

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

    cy.contains('button[type="submit"]', "Enviar")
      .should("be.visible")
      .click()

    cy.get('.success')
      .should('be.visible')
      .should('contain.text', 'Mensagem enviada com sucesso.')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {

    cy.get("#email")
      .as("email")
      .should("be.visible")
      .type("lucasexemplo.com", {
        delay: 0
      })

    cy.contains("button", "Enviar")
      .should("be.visible")
      .click()

    cy.get('.error')
      .should('be.visible')
      .should('contain.text', 'Valide os campos obrigatórios!')

  })

  it('preenche o campo de textArea com a função repeat do cypress', () => {

    const longText = Cypress._.repeat("abcdefghijklmnpqrstuvwxyz", 10)

    cy.get("#open-text-area")
      .as("textArea")
      .should("be.visible")
      .type(longText, {
        delay: 0
      })
    cy.get("@textArea").should("be.visible")

  })

  it('se um valor não-numérico for digitado, seu valor continuará vazio', () => {

    cy.get("#phone")
      .as("telefone")
      .should("be.visible")
      .type("aaaaa", {
        delay: 0
      })
    cy.get("@telefone")
      .should("not.have.value", "aaaaa")

    /*alternativa 
        cy.get("#phone")
    .as("telefone")
    .should("be.visible")
    .type("aaaaa", {
      delay: 0
    })
  cy.get("@telefone")
    .should("have.value", '')
    */

  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {

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
      .check("phone")
    cy.get("@checkBox").should("be.checked")

    cy.contains("button", "Enviar")
      .should("be.visible")
      .click()

    cy.get('.error')
      .should('be.visible')
      .should('contain.text', 'Valide os campos obrigatórios!')

  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {

    cy.get("#firstName")
      .as("first")
      .should("be.visible")
      .type("Lucas", {
        delay: 0
      })
    cy.get("@first")
      .should("have.value", "Lucas")
      .clear()
      .should("have.value", "")

    cy.get("#lastName")
      .as("last")
      .should("be.visible")
      .type("Pereira", {
        delay: 0
      })
    cy.get("@last")
      .should("have.value", "Pereira")
      .clear()
      .should("have.value", "")

    cy.get("#email")
      .as("email")
      .should("be.visible")
      .type("lucas@exemplo.com", {
        delay: 0
      })
    cy.get("@email")
      .should("have.value", "lucas@exemplo.com")
      .clear()
      .should("have.value", "")

    cy.get("#phone")
      .as("telefone")
      .should("be.visible")
      .type("15999999999", {
        delay: 0
      })
    cy.get("@telefone")
      .should("have.value", "15999999999")
      .clear()
      .should("have.value", "")

  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {

    cy.contains("button", "Enviar")
      .should("be.visible")
      .click()

    cy.get('.error')
      .should('be.visible')
      .should('contain.text', 'Valide os campos obrigatórios!')

  })

  it('envia o formuário com sucesso usando um comando customizado', () => {

    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success')
      .should('be.visible')
      .should("have.class", "success")
      .should('contain.text', 'Mensagem enviada com sucesso.')

  })

  it('envia o formuário com sucesso usando um comando customizado passando um objeto', () => {

    const data = {
      firstName: 'Lucas',
      lastName: "Pereira",
      email: "lucas@exemplo.com",
      text: "teste"
    }

    cy.fillMandatoryFieldsAndSubmit(data)

    cy.get('.success')
      .should('be.visible')
      .should("have.class", "success")
      .should('contain.text', 'Mensagem enviada com sucesso.')

  })

  it('envia o formuário com sucesso usando um comando customizado default', () => {


    cy.fillMandatoryFieldsAndSubmitObjectDefault()

    cy.get('.success')
      .should('be.visible')
      .should("have.class", "success")
      .should('contain.text', 'Mensagem enviada com sucesso.')

  })

  it('seleciona um produto (YouTube) por seu texto', () => {

    cy.get("#product")
      .select("YouTube")
      .should("have.value", "youtube")

  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {

    cy.get("#product")
      .select("mentoria")
      .should("have.value", "mentoria")

  })

  it('seleciona um produto (Blog) por seu índice', () => {

    cy.get("#product")
      .select(1)
      .should("have.value", "blog")

  })

  it('marca o tipo de atendimento "Feedback"', () => {

    cy.get('input[type="radio"]')
      .as("radio")
      .check(["radio", "feedback"])
    cy.get("@radio").should("be.checked")

    /* Alternativa
        cy.get('input[type="radio"][value="feedback')
      .as("radio")
      .check()
    cy.get("@radio").should("be.checked")*/

  })

  it('marca cada tipo de atendimento', () => {

    cy.get('input[type="radio"]')
      .each(($i) => {
        cy.wrap($i).check().should("be.checked")
      })

  })

  it('marca ambos checkboxes, depois desmarca o último', () => {

    cy.get('[type="checkbox"]')
      .should('not.be.checked')
      .each(($i) => {
        cy.wrap($i).check().should("be.checked")
      })

    cy.get('[type="checkbox"]').last().uncheck().should("not.be.checked")

    /*  cy.get('[type="checkbox"]')
    .check()
    .should("be.checked")
    .last()
    .uncheck()
    .should("not.be.checked")
  })*/

  })

  it('seleciona um arquivo da pasta fixtures', () => {

    cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })

  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {

    cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })

  })

  it('eleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {

    cy.fixture('example.json', null).as('myFixture')
    cy.get('input[type=file]').selectFile('@myFixture')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })

  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {

    cy.get('[href="privacy.html"]')
      .should('have.attr', 'target', '_blank')

    /* Alternativa
    cy.contains('a', 'Política de privacidade')
    .should('have.attr', 'href', 'privacy.html')
    .and('have.attr', 'target', '_blank')*/

  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {

    cy.get('[href="privacy.html"]').invoke('removeAttr', 'target')
      .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade').should("be.visible")

    /* Alternativa
    cy.contains('a', 'Política de privacidade')
    .invoke('removeAttr', 'target')
    .click()
*/

  })

})