import {showView} from "./dom.js";
import {showCreate} from "./create.js";
//initialization
// - find replacement section
// - detach section from DOM



const section = document.getElementById('home-page');
section.querySelector('#createLink').addEventListener('click', (event) => {
    event.preventDefault();
    showCreate();
})
section.remove();


//display logic

export function showHome(){
    showView(section);
}