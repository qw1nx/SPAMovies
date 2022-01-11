import {showView} from "./dom.js";
//initialization
// - find replacement section
// - detach section from DOM



const section = document.getElementById('form-login');
section.remove();


//display logic

export function showLogin(){
    showView(section);
}