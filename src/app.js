import {showHome} from "./home.js";
import {showLogin} from "./login.js";
import {showRegister} from "./register.js";


// create placeholder modules for every view
//configure and test navigation
//implement modules
// - create async functions for requests
// - implement DOM logic

const views = {
    'homeLink': showHome,
    'loginLink': showLogin,
    'registerLink': showRegister
};

document.querySelector('nav').addEventListener('click', (event) => {
    const view = views[event.target.id];
    if (typeof view == 'function') {
        event.preventDefault();
        view();
    }
});

//start application in home view
showHome();


// Order of views
// X catalogue (home view)
// - login register
// - create
// - details
// - likes
// - edit
// - delete

