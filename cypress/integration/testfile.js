describe('Form Test', () => {
    beforeEach(() => {
      // Each test needs fresh state!
      // Never rely on state left over from previous tests
      // Every test should work in isolation (MUST)
      cy.visit('http://localhost:3000')
    });
    const submitBtn = () => cy.get('button[id="submitBTN"]');
    const agree = () => cy.get('input[type="checkbox"]')
    const name = () => cy.get('input[name="name"]');
    const email = () =>  cy.get('input[name="email"]');
    const password = () =>  cy.get('input[name="password"]');
    
    it('Checks to see if text boxes accept input', function (){
      name()
        .should('have.value', '')
        .type('Bobby')
        .should('have.value', 'Bobby')
     
      email()
        .should('have.value', '')
        .type('coolguy@aol.com')
        .should('have.value', 'coolguy@aol.com')

      password()
        .should('have.value', '')
        .type('**********')
    })

    it (`Checks if "Agree Box" is clickable` ,()=>{
      agree()
        .click()
        .should('be.checked')
    })

    it ('Checks if submit button is first disabled', ()=>{
      submitBtn()
      .should('be.disabled')
    })

    it ('Checks if submit button is enabled after all other input', ()=>{
      name()
        .type("Robert")
      email()
        .type("email@aol.com")
      password()
        .type("*****")
      agree()
        .click()
      submitBtn()
      .should('be.enabled')
    })


    it ('Checks that submit button remains disbaled if a field is left blank', ()=>{
      name()
        .type("Robert")
      email()
        .type(" ")
      password()
        .type("*****")
      agree()
        .click()
      submitBtn()
      .should('be.disabled')
    })

});