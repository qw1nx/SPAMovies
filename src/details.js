import {showView} from "./dom.js";
//initialization
// - find replacement section
// - detach section from DOM



const section = document.getElementById('movie-details');
section.remove();


//display logic

export function showDetails(movieId){
    showView(section);
    console.log(movieId);
}