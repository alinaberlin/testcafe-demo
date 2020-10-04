import { Selector } from "testcafe";
const fetch = require("node-fetch");

//prettier-ignore
fixture`The user should login`
    .page`http://localhost:8081/login`
    .before(async t => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firstName: 'Alina',
                lastName: 'Ghetler',
                username: 'tilda',
                password:'4444'
            }),
        };

        await fetch(`http://localhost:8081/users/register`, requestOptions);
    })

//positive test
test("User should be able to login", async (t) => {
    const userInput = Selector("input").withAttribute("name", "username");
    const passwordInput = Selector("input").withAttribute("name", "password");

    await t
        .takeScreenshot({ fullPage: true })
        .typeText(userInput, "tilda")
        .typeText(passwordInput, "4444")
        .click(".btn");


});
test('User cannot login with the invalid credentials', async t => {
    const userInput = Selector("input").withAttribute("name", "username");
    const passwordInput = Selector("input").withAttribute("name", "password");

    await t
        .takeScreenshot({ fullPage: true })
	    .typeText(userInput, 'invalid username', {paste:true})
	    .typeText(passwordInput, 'invalid password', { paste: true })
        .click('.btn')
        .expect(Selector('.alert-danger').innerText)
        .contains('Username or password is incorrect')

})
