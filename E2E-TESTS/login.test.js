import { Selector, ClientFunction } from 'testcafe'

import LoginPage from './page-objects/pages/LoginPage'

const login = new LoginPage()


const localStorageSet = ClientFunction((key, value) =>
	localStorage.setItem(key, value)
)

const pageUrl = 'http://localhost:8081/login'
//prettier-ignore
fixture`The user login`
    .page`${pageUrl}`
    .beforeEach(async t => {
        await localStorageSet(
					'users',
					JSON.stringify([{
						firstName: 'Alina',
						lastName: 'Ghetler',
						username: 'tilda',
						password: '4444',
					}])
				)
        await t.navigateTo(pageUrl)
    })

//positive test
test('User should be able to login', async t => {
	// const userInput = Selector('input').withAttribute('name', 'username')
	// const passwordInput = Selector('input').withAttribute('name', 'password')
	//const loginButton = Selector('.btn')
	const messageLogin = Selector('p').innerText

    
    await login.typeUsername(t, 'tilda')
    await login.typePassword(t, '4444')
    await login.clickLogin(t)
	//await t.typeText(userInput, 'tilda')
	//await t.typeText(passwordInput, '4444')
	//await t.click(login.loginButton)
	await t.expect(messageLogin).contains("You're logged in with React!!")
})
test('User cannot login with the invalid credentials', async t => {
	const userInput = Selector('input').withAttribute('name', 'username')
	const passwordInput = Selector('input').withAttribute('name', 'password')
	const loginButton = Selector('.btn')

	await t
		.takeScreenshot({ fullPage: true })
		.typeText(userInput, 'invalid username', { paste: true })
		.typeText(passwordInput, 'invalid password', { paste: true })
		.click(loginButton)
		.expect(Selector('.alert-danger').innerText)
		.contains('Username or password is incorrect')
})
