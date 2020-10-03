import { Selector } from 'testcafe'

//prettier-ignore
fixture`The user should login`
    .page`http://localhost:8081/login`

//positive test
test('User should be able to login', async t => {
    await t.typeText('.form-control', 'John')
    await t.typeText('.form-control',)
    await t.click(".btn btn-primary");
})