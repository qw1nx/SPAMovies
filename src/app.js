// create placeholder modules for every view
//configure and test navigation
//implement modules
// - create async functions for requests
// - implement DOM logic

// Order of views
// - catalogue (home view)
// - login register
// - create
// - details
// - likes
// - edit
// - delete

import {showHome} from "./home.js";
import {showDetails} from "./details.js";
import {showCreate} from "./create.js";

showHome();

window.showHome = showHome;
window.showDetails = showDetails;
window.showCreate = showCreate;