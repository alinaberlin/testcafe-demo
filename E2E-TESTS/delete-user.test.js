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
					JSON.stringify([
						{
							firstName: 'Alina',
							lastName: 'Ghetler',
							username: 'tilda',
							password: '4444',
						},
						{
							firstName: 'Alina2',
							lastName: 'Ghetler',
							username: 'tilda2',
							password: '4444',
						},
					])
				)
        await t.navigateTo(pageUrl);
    })

//positive test
test('User should be able to delete an user', async t => {
	const userInput = Selector('input').withAttribute('name', 'username')
	const passwordInput = Selector('input').withAttribute('name', 'password')
	const loginButton = Selector('.btn')
    const messageLogin = Selector('p').innerText
    const deleteButton = Selector('li').withText('Alina2 Ghetler').child('span').child('a')

	await t.takeScreenshot({ fullPage: true })
	await t.typeText(userInput, 'tilda')
	await t.typeText(passwordInput, '4444')
	await t.click(loginButton)
    await t.expect(messageLogin).contains("You're logged in with React!!")
    await t.click(deleteButton)
    await t.expect(deleteButton.exists).notOk()
})
