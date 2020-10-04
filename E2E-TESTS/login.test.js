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
        await t.navigateTo(pageUrl);
    })

//positive test
test('User should be able to login', async t => {
	const userInput = Selector('input').withAttribute('name', 'username')
	const passwordInput = Selector('input').withAttribute('name', 'password')
	const loginButton = Selector('.btn')
	const messageLogin = Selector('p').innerText

	await t.takeScreenshot({ fullPage: true })
	await t.typeText(userInput, 'tilda')
	await t.typeText(passwordInput, '4444')
	await t.click(loginButton)
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
test('User should be able to login', async t => {
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
    await t.expect(messageLogin).contains("You're logged in with React!!")
    await t.click(logoutLink)
    await t.expect(loginButtonText).contains('Login')

})