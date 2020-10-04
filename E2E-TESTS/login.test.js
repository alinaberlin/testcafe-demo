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

    await t.typeText(userInput, "tilda");
    await t.typeText(passwordInput, "4444");
    await t.click(".btn");

    //await t.expect(Selector(".alert").innerText).contains("Registration successful");
});
