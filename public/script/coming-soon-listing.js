'use strict';

const movieList = document.getElementById('coming-up-listing');

let movies;

const renderMovie = (movies) => {
    // sort movies by their start time
    const filterMovieByTime = movies.sort((a, b) => {
        const timeA = new Date(a.time);
        const timeB = new Date(b.time);
        return timeA - timeB;
    });

    // TODO: clean this mess up
    // loop only four times
    let listingCount = 0;
    let maxListingCount = 4;
    
    // render Movie
    // TODO: add max-height and then text overflow fixes.
    filterMovieByTime.forEach(movie => {
        if(!(listingCount === maxListingCount)){
        const time = new Date(movie.time);
        const endTime = new Date(movie.endTime);
        
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
        linkWrapper.classList = 'movie-listing animate-loadListing rounded-lg col-span-12 md:col-span-6 lg:col-span-3 group cursor-pointer';
        divHoverElement.classList = 'group-hover:bg-secondary rounded-lg';
        container.classList = 'bg-gray-900 rounded-lg shadow-xl -translate-x-3 -translate-y-3 flex flex-row md:flex-col';
        poster.classList = 'rounded-lg h-36 md:h-56 w-1/2 md:w-full object-cover';
        // TODO: get movie poster
        poster.src = 'https://picsum.photos/500/1000';
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

        // increase listing count
        listingCount++;
        }
    });

    //open up movie info modal on click (check movie-modal.js)
    openModal();
};

//init
const init = async () => {
    movies = await fetchMovieData();
    renderMovie(movies);
}

init();