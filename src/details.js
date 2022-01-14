import {showView, e} from "./dom.js";
//initialization
// - find replacement section
// - detach section from DOM

const section = document.getElementById('movie-details');
section.remove();

//display logic

export function showDetails(movieId){
    showView(section);
    getMovie(movieId);
    console.log(movieId);
}

async function getMovie(id){
    section.replaceChildren(e('p', {}, 'Loading....'))

    const requests = [
        await fetch('http://localhost:3030/data/movies/' + id),
        await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count` + id),
    ];

    const userD = JSON.parse(sessionStorage.getItem('userData'));

    if (userD != null){
        requests.push(await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22%20and%20_ownerId%3D%22${userD.id}%22`));
    }

    const [movieRes, likesRes, hasLikedRes] = await Promise.all(requests);

    const [movieData, likes, hasLiked] = await Promise.all([
        movieRes.json(),
        likesRes.json(),
        hasLikedRes && hasLikedRes.json()
    ]);

    section.replaceChildren(createDetails(movieData, likes, hasLiked));
}

function createDetails(movie, likes, hasLiked){
    const controls = e('div', {className: 'col-md-4 text-center'},
        e('h3', {className: 'my-3'}, 'Movie Description'),
        e('p', {}, movie.description)
    );

    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData != null){
        if (userData.id == movie._ownerId){
            controls.appendChild(e('a', {className: 'btn btn-danger', href: '#'}, 'Delete'));
            controls.appendChild(e('a', {className: 'btn btn-warning', href: '#'}, 'edit'));
        } else {
            if (hasLiked.length > 0){
                controls.appendChild(e('a', {className: 'btn btn-primary', href: '#'}, 'Unlike'));
            } else {
                controls.appendChild(e('a', {className: 'btn btn-primary', href: '#', onclick: onLike}, 'Like'));
            }
        }

    }
    //console.log(likes);
    controls.appendChild(e('span', {className: 'enrolled-span'}, `Like ${likes.length}`));

    const element = e('div', {className: 'container'},
        e('div', {className: 'row bg-light text dark'},
            e('h1', {}, `Movie title: ${movie.title}`)),
            e('div', {className: 'col-md-8'},
                e('img', {className: 'img-thumbnail', src: movie.img, alt:'movie'},)
            ),
            controls
        );
    return element;

    async function onLike(){
        await fetch('http://localhost:3030/data/likes', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userData.token
            },
            body: JSON.stringify({
                movieId: movie._id
            })
        });
        showDetails(movie._id);
    }

    async function onUnlike(){
        const likeId = hasLiked[0]._id;
        await fetch('http://localhost:3030/data/likes/' + likeId, {
            method: 'delete',
            headers: {
                'X-Authorization': userData.token
            }
        });
        showDetails(movie._id);
    }
}
