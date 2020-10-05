import { Selector, t } from 'testcafe'

class LoginPage {
	constructor() {
		this.loginButton = Selector('.btn')
		this.userInput = Selector('input').withAttribute('name', 'username')
		this.passwordInput = Selector('input').withAttribute('name', 'password')
	}

	async typeUsername(t, username) {
		await t.typeText(this.userInput, username, { paste: true })
	}
	async typePassword(t, password ) {
		await t.typeText(this.passwordInput, password, { paste: true })
	}

	async clickLogin(t) {
		await t.click(this.loginButton)
	}
}

export default LoginPage
