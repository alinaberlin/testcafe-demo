import { Selector, ClientFunction } from 'testcafe'
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
	const userInput = Selector('input').withAttribute('name', 'username')
	const passwordInput = Selector('input').withAttribute('name', 'password')
	const loginButton = Selector('.btn')
	const messageLogin = Selector('p').innerText
	const logoutLink = Selector('a').withAttribute('href', '/login')
	const loginButtonText = loginButton.innerText

	await t.takeScreenshot({ fullPage: true })
	await t.typeText(userInput, 'tilda')
	await t.typeText(passwordInput, '4444')
	await t.click(loginButton)
	await t.click(logoutLink)
	await t.expect(loginButtonText).contains('Login')
})