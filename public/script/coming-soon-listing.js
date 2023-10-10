'use strict';

const movieList = document.getElementById('coming-up-listing');

let movies;

let targetTime;
let timeDifference;
let minuteDifference;

let listingCounter=0;

let currentTime = new Date();
//setHours for testing, make sure this is commented if not testing
// currentTime.setHours(12, 40);
//console.log(currentTime);


const renderMovie = (movies) => {
    // sort movies by their start time
    const filterMovieByTime = movies.sort((a, b) => {
        const timeA = new Date(a.time);
        const timeB = new Date(b.time);
        return timeA - timeB;
    });

    // render Movie
    // TODO: add max-height and then text overflow fixes.
    // TODO: clean this mess up
    filterMovieByTime.forEach(movie => {
        //show max 4 listings
        if(listingCounter < 4){
            const time = new Date(movie.time);
            const endTime = new Date(movie.endTime);

            //check if time has passed current time
            if(endTime.getHours() > currentTime.getHours() || endTime.getHours() === currentTime.getHours() && endTime.getMinutes() >= currentTime.getMinutes()){
            
                const linkWrapper = document.createElement('a');
                const divHoverElement = document.createElement('div');
                const container = document.createElement('div');
                const poster = document.createElement('img');
                const divFlex = document.createElement('div');
                const contentDiv = document.createElement('div');
                const genre = document.createElement('span');
                const name = document.createElement('h3');
                const length = document.createElement('div');
            
                //add listing's own id
                linkWrapper.id = 'listing-'+movie._id;
                linkWrapper.classList = 'movie-listing rounded-lg col-span-12 md:col-span-6 lg:col-span-3 group cursor-pointer';
                divHoverElement.classList = 'group-hover:bg-secondary rounded-lg';
                container.classList = 'bg-gray-900 rounded-lg shadow-xl -translate-x-3 -translate-y-3 flex flex-row md:flex-col';
                poster.classList = 'rounded-lg h-36 md:h-56 w-1/2 md:w-full object-cover';       
                poster.src = '../img/posters/' + movie._id + '.jpg';
                divFlex.classList = 'p-5 md:p-4 flex flex-col items-stretch w-full';
                genre.classList = 'inline-block px-2 py-1 bg-secondary-100 text-secondary-900 rounded-full font-semibold uppercase tracking-wide text-xs';
                genre.innerHTML = movie.genre;
                name.classList = 'my-2 text-1xl font-semibold text-gray-100';
                name.innerHTML = movie.name;
                length.classList = 'flex justify-between text-gray-300';
                length.innerHTML = time.getHours() + ':' + time.getMinutes().toString().padStart(2, '0') + '-' + endTime.getHours() + ':' + endTime.getMinutes().toString().padStart(2, '0');
            
                linkWrapper.appendChild(divHoverElement);
                divHoverElement.appendChild(container);
                container.appendChild(poster);
                container.appendChild(divFlex);
                divFlex.appendChild(contentDiv);
                contentDiv.appendChild(genre);
                divFlex.appendChild(name);
                divFlex.appendChild(length);
            
                movieList.appendChild(linkWrapper);

                listingCounter++;
            }
        }

    });

    //open up movie info modal on click (check movie-modal.js)
    openModal();
};

const refreshListRender = () => {
    // remove previous listing, reset listing counter
    while (movieList.firstChild) { movieList.removeChild(movieList.firstChild); }
    listingCounter = 0;

    //get current time
    currentTime = new Date();
    //setHours for testing, make sure this is commented if not testing
    //currentTime.setHours(14,20);
    renderMovie(movies);
}

//init
const init = async () => {
    movies = await fetchMovieData();
    renderMovie(movies);
    // refresh movie list every minute
    setInterval(refreshListRender, 60000);
}

init();