import {showView} from "./dom.js";
//initialization
// - find replacement section
// - detach section from DOM



const section = document.getElementById('home-page');
section.remove();


//display logic

export function showHome(){
    showView(section);
}