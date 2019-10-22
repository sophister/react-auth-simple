# react-auth-simple

React authentication Component with React Hooks

See this demo APP: [https://codesandbox.io/s/react-auth-simple-demo-0y89v](https://codesandbox.io/s/react-auth-simple-demo-0y89v)


## Install

```shell
npm i react-auth-simple
```

## Usage

`react-auth-simple` provides a simple way to manage user login state for **SPA**(Single Page Application).

In **SPA**, we usually use a client side router, such as [react-router](https://reacttraining.com/react-router/web/guides/quick-start). And we may have many client-side-rendered pages, some of them need user `authentication`, and some don't require. 

So, when users navigate between our pages, these two cases are common:

* User is navigating to page B from page A, where A can be viewed without login in, whereas B requires user `authentication`. In this case, we need to show our `LoginModal`, or redirect to the `LoginPage`
* After user has logged in, all the pages can share this global `authentication` state

`react-auth-simple` encourages developer to use `LoginModal` to show the login page, rather than a `LoginPage`.

## Demo Code

You're talking too much, just show me code

```typescript
import AuthRoot, { useAuthContext, useLoginContext, withLoginGuard} from "react-auth-simple";

interface User {
    name: string;
}

// Home page can be visited without login
function Home() {
    return (
        <div>Home page</div>
    );
}

// AccountCenter requires user login
function AccountCenter() {
    const authManager = useAuthContext<User>();
    return (
        <div>
            <h2>User Center</h2>
            <div>current user name: {authManager.user.name}</div>
        </div>
    );
}
// Usually checking current user login state is an async operation
// So we should render some temporary view when we don't get login state yet
function renderLoginChecking() {
    return (
        <span>Loading...</span>
    );
}
// use HOC to protect our AccountCenter
const AccountCenterWithGuard = withLoginGuard(AccountCenter, { renderLoginChecking });

// LoginModal is where user input username and password, set global user after login success
function LoginModal() {
    const authManager = useAuthContext();
    const loginManager = useLoginContext();
    // validate username and password
    function doLogin() {
        // mimic async API
        setTimeout(function() {
            if (success) {
                authManager.setUser({
                    userId: 12345,
                    name: "Jesse",
                    age: 33
                });
                loginManager.hideLogin();
            } else {
                alert('login fail');
            }     
        }, 500);
    }

    return (
        <div>
            <div>some inputs for username and password</div>
            <button onClick={doLogin}>Submit</button>
        </div>
    );
}

function renderLoginModal(visible: boolean) {
    if (!visible) {
        return null;
    }
    return ( <LoginModal /> );
}

// initUser is called to check use login state when page load
// You may call an API, or read localStorage
function initUser() {
    return new Promise<User | null>(function(resolve, reject) {
        resolve({
            name: 'Jesse',
        });
    });
}

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// Finally our App, we're using react-router for simplicity
function App() {
    return (
        <AuthRoot initUser={initUser} renderLoginComponent={renderLoginModal}>
            <Router>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/account">Account Center</Link>
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route path="/account">
                        <AccountCenterWithGuard />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </Router>
        </AuthRoot>
    );
}

```