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

test('User should be able to logout', async t => {
	const messageLogin = Selector('p').innerText
	const logoutLink = Selector('a').withAttribute('href', '/login')

	await t.takeScreenshot({ fullPage: true })
    await login.typeUsername(t, 'tilda')
    await login.typePassword(t, '4444')
    await login.clickLogin(t)
	await t.click(logoutLink)
	await t.expect(login.getLoginButtonText()).contains('Login')
})