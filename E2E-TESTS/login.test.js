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
	const messageLogin = Selector('p').innerText


    await login.typeUsername(t, 'tilda')
    await login.typePassword(t, '4444')
    await login.clickLogin(t)
	await t.expect(messageLogin).contains("You're logged in with React!!")
})
test('User cannot login with the invalid credentials', async t => {
    await login.typeUsername(t, 'invalid username')
    await login.typePassword(t, 'invalid password')
    await login.clickLogin(t)
	await t
		.takeScreenshot({ fullPage: true })
		.expect(Selector('.alert-danger').innerText)
		.contains('Username or password is incorrect')
})
