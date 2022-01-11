import {showView} from "./dom.js";
//initialization
// - find replacement section
// - detach section from DOM



const section = document.getElementById('add-movie');
section.remove();


//display logic

export function showCreate(){
    showView(section);
}