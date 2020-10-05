import { Selector, ClientFunction } from 'testcafe'

import LoginPage from './page-objects/pages/LoginPage'

const login = new LoginPage()

const localStorageSet = ClientFunction((key, value) =>
	localStorage.setItem(key, value)
)

const pageUrl = `http://localhost:8081`
//prettier-ignore
fixture`The user should register`
    .page(pageUrl)
    .beforeEach(async t => {
        await localStorageSet(
            'users',
            JSON.stringify([
                {
                    firstName: 'Alina',
                    lastName: 'Ghetler',
                    username: 'ina',
                    password: '4444',
                },
            ])
        );
        await t.navigateTo(pageUrl)
    })


test(`The user should be able to register`, async t => {
    const registerLinkSelector = Selector('a').withAttribute('href', '/register')
    const firstNameInput = Selector('input').withAttribute('name', 'firstName')
    const lastNameInput = Selector('input').withAttribute('name', 'lastName')
    const userNameInput = Selector('input').withAttribute('name', 'username')
    const passwordInput = Selector('input').withAttribute('name', 'password')

    await t.click(registerLinkSelector)
    await t.typeText(firstNameInput, 'ina')
    await t.typeText(lastNameInput, 'etler')
    await t.typeText(userNameInput, 'inaBerlin')
    await t.typeText(passwordInput, '1234')
    await t.click('.btn')
    await t.expect(Selector(".alert").innerText).contains("Registration successful");
})

test(`The user should be able to login after registeration`, async t => {
    const registerLinkSelector = Selector('a').withAttribute('href', '/register')
	const firstNameInput = Selector('input').withAttribute('name', 'firstName')
	const lastNameInput = Selector('input').withAttribute('name', 'lastName')
	const userNameInput = Selector('input').withAttribute('name', 'username')
    const passwordInput = Selector('input').withAttribute('name', 'password')


    await t.click(registerLinkSelector)
	await t.typeText(firstNameInput, 'ina')
	await t.typeText(lastNameInput, 'etler')
	await t.typeText(userNameInput, 'inaBerlin')
	await t.typeText(passwordInput, '1234')
	await t.click('.btn')
// login tests
    await t.wait(500)
    const messageLogin = Selector('p').innerText

    await login.typeUsername(t, 'inaBerlin')
	await login.typePassword(t, '1234')
	await login.clickLogin(t)
	await t.expect(messageLogin).contains("You're logged in with React!!")
})
test(`The user cannot be able to register without password `, async t => {
    const registerLinkSelector = Selector('a').withAttribute('href', '/register')
	const firstNameInput = Selector('input').withAttribute('name', 'firstName')
	const lastNameInput = Selector('input').withAttribute('name', 'lastName')
	const userNameInput = Selector('input').withAttribute('name', 'username')

    await t.click(registerLinkSelector)
	await t.typeText(firstNameInput, 'ina')
	await t.typeText(lastNameInput, 'etler')
	await t.typeText(userNameInput, 'inaBerlin')
	await t.click('.btn')
	await t
		.expect(Selector('.help-block').innerText)
		.contains('Password is required')
})

test(`The user should not be able to register with duplicate user name`, async t => {
    const registerLinkSelector = Selector('a').withAttribute('href', '/register')
	const firstNameInput = Selector('input').withAttribute('name', 'firstName')
	const lastNameInput = Selector('input').withAttribute('name', 'lastName')
	const userNameInput = Selector('input').withAttribute('name', 'username')
	const passwordInput = Selector('input').withAttribute('name', 'password')

    await t.click(registerLinkSelector)
	await t.typeText(firstNameInput, 'ina')
	await t.typeText(lastNameInput, 'etler')
	await t.typeText(userNameInput, 'ina')
	await t.typeText(passwordInput, '1234')
	await t.click('.btn')
	await t
		.expect(Selector('.alert').innerText)
		.contains('Username "ina" is already taken')
})