import {showView} from "./dom.js";
//initialization
// - find replacement section
// - detach section from DOM



const section = document.getElementById('form-sign-up');
section.remove();


//display logic

export function showRegister(){
    showView(section);
}