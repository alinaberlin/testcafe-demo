import { Selector } from 'testcafe'

//prettier-ignore
fixture`The user should register`
    .page`http://localhost:8081/register`


test(`The user should be able to register`, async t => {
    const firstNameInput = Selector('input').withAttribute('name', 'firstName')
    const lastNameInput = Selector('input').withAttribute('name', 'lastName')
    const userNameInput = Selector('input').withAttribute('name', 'username')
    const passwordInput = Selector('input').withAttribute('name', 'password')

    await t.typeText(firstNameInput, 'ina')
    await t.typeText(lastNameInput, 'etler')
    await t.typeText(userNameInput, 'inaBerlin')
    await t.typeText(passwordInput, '1234')
    await t.click('.btn')

    await t.expect(Selector(".alert").innerText).contains("Registration successful");
})