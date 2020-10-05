# react-redux-registration-login-example

React + Redux - User Registration and Login Tutorial & Example

For documentation and further details go to https://jasonwatmore.com/post/2017/09/16/react-redux-user-registration-and-login-tutorial-example


# E2E Testing with TestCafe
## Implementation description 

>For the momment the tests are implementing using a hybrid approach, majority of them are implemented in a classical way, but for the Login page are implemented using Page Object Model design pattern.

## How to run it

* Install the app 

`npm install`

* Start the application 

`npm run start`

* Execute tests for chrome

`npm run test-e2e:chrome`

* Excute tests for CI using chrome headless

`npm run test-e2e:chrome:headless`

>If you like to run the tests for other browser you just have to execute a command similar with:
`npm run test-e2e:[browser]` where browser can have following values: chrome, chrome:mobile, safari, firefox. 

