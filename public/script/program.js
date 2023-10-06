'use strict';

const genreList = document.getElementById('list-genre');
const movieList = document.getElementById('list-program');
const filteredGenre = document.getElementById('list-genre');

let activeGenreSelected = document.getElementById('active-genre');

// movie data variables and empty genres array
let movieData;
let movies;
let genres = [];

// Filter by genre click event, change active gender btn color
filteredGenre.addEventListener('click', (event) => {
    event.preventDefault();

    //remove previous active genre styling
    activeGenreSelected.removeAttribute('id');
    activeGenreSelected.classList = 'cursor-pointer inline-block px-2 py-1 mr-2 bg-secondary-100 text-secondary-900 rounded-full font-semibold uppercase tracking-wide text-xs';

    //change selected genre styling
    event.target.classList = 'cursor-pointer inline-block px-2 py-1 mr-2 bg-secondary-900 text-secondary-100 rounded-full font-semibold uppercase tracking-wide text-xs';
    event.target.id = 'active-genre';
    
    //change new active genre
    activeGenreSelected = event.target;

    //call to render movie(s) by selected genre
    event.target.tagName === 'SPAN' && renderMovieByGenre(event.target.textContent);
});

// Add available genre from movie data list to genre array
const getGenreList = (movies) => {
    movies.forEach(movie => {
        genres.includes(movie.genre) ? null : genres.push(movie.genre);
    });
}

// Render out all genre choices
const renderGenre = (genres) => {
    genres.forEach(genre => {
        const newGenre = document.createElement('span');
        const genreLink = document.createElement('li');
        //const button = document.createElement('button');
    
        //add id for filtering
        genreLink.id = genre;
    
        newGenre.classList = 'cursor-pointer inline-block px-2 py-1 mr-2 bg-secondary-100 text-secondary-900 rounded-full font-semibold uppercase tracking-wide text-xs';
    
        newGenre.innerText = genre;

        genreList.appendChild(genreLink);
        genreLink.appendChild(newGenre);
    });
}

// Render movie(s)
const renderMovie = (movies) => {
    // sort movies by their start time
    
    const filterMovieByTime = movies.sort((a, b) => {
        const timeA = new Date(a.time);
        const timeB = new Date(b.time);
        return timeA - timeB;
    });

    // TODO: clean this mess up
    filterMovieByTime.forEach(movie => {
        // render Time
        const movieTime = new Date(movie.time);
        const movieEndTime = new Date(movie.endTime);
        const startTimeDiv = document.createElement('div');
        const startTimeText = document.createElement('h2');
        startTimeDiv.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"> <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clip-rule="evenodd" /></svg>';
        startTimeText.innerHTML = movieTime.getHours() + '<span class="text-base pt-2">' + movieTime.getMinutes().toString().padStart(2, '0') + '</span>';
        startTimeDiv.classList = 'animate-loadListing col-span-1 text-primary flex items-center justify-center';
        startTimeDiv.setAttribute('style', 'writing-mode: vertical-rl; text-orientation: upright;');
        startTimeText.classList = 'my-2 text-2xl font-semibold text-gray-100 border-l-4 border-primary';
    
        startTimeDiv.appendChild(startTimeText);
        movieList.appendChild(startTimeDiv);
    
        // render Movie
        // TODO: add max-height and then text overflow fixes.
        const linkWrapper = document.createElement('a');
        const divHoverElement = document.createElement('div');
        const container = document.createElement('div');
        const poster = document.createElement('img');
        const divFlex = document.createElement('div');
        const contentDiv = document.createElement('div');
        const genre = document.createElement('span');
        const name = document.createElement('h3');
        const length = document.createElement('div');
        const director = document.createElement('div');
        const summary = document.createElement('div');
    
        //add listing's own id
        linkWrapper.id = 'listing-'+movie.id;
        linkWrapper.classList = 'movie-listing animate-loadListing lg:w-[500px] rounded-lg col-[span_11] lg:col-span-2 lg:col-start-3 lg:col-end-13 group cursor-pointer';
        //linkWrapper.setAttribute('data-modal-target', 'defaultModal');
        //linkWrapper.setAttribute('data-modal-toggle', 'defaultModal');
        divHoverElement.classList = 'group-hover:bg-secondary rounded-lg';
        container.classList = 'bg-gray-900 rounded-lg shadow-xl hover:-translate-x-3 hover:-translate-y-3 flex flex-row md:flex-col';
        poster.classList = 'rounded-lg h-64 md:h-56 w-1/2 md:w-full object-cover';
        // TODO: get movie poster
        poster.src = 'https://picsum.photos/500/1000';
        divFlex.classList = 'p-5 md:p-4 flex flex-col items-stretch w-full';
        genre.classList = 'inline-block px-2 py-1 bg-secondary-100 text-secondary-900 rounded-full font-semibold uppercase tracking-wide text-xs';
        genre.innerHTML = movie.genre;
        name.classList = 'my-2 text-1xl font-semibold text-gray-100';
        name.innerHTML = movie.name;
        length.classList = 'flex justify-between text-gray-300';
        length.innerHTML = movieTime.getHours() + ':' + movieTime.getMinutes().toString().padStart(2, '0') + '-' + movieEndTime.getHours() + ':' + movieEndTime.getMinutes().toString().padStart(2, '0');
        director.classList = 'whitespace-break-spaces text-gray-300 pt-2';
        director.innerHTML = '<span class="font-semibold">Director: </span><span>'+movie.director+'</span>';
        summary.classList = 'whitespace-break-spaces truncate ... text-gray-300 pt-2';
        summary.innerHTML = '<span class="font-semibold">Summary: </span><span>'+movie.summary+'</span>';
    
        linkWrapper.appendChild(divHoverElement);
        divHoverElement.appendChild(container);
        container.appendChild(poster);
        container.appendChild(divFlex);
        divFlex.appendChild(contentDiv);
        contentDiv.appendChild(genre);
        divFlex.appendChild(name);
        divFlex.appendChild(length);
        divFlex.appendChild(director);
        divFlex.appendChild(summary);
    
        movieList.appendChild(linkWrapper);
    });
    //open up movie info modal on click (check movie-modal.js)
    openModal();
};

// Render and filter movies by genre
const renderMovieByGenre = (genre) => {
    // clear previous rendered list
    movieList.innerHTML = '';

    let filteredMovies = movies;

    if(!(genre === 'All')){
        filteredMovies = movies.filter((movie) => movie.genre === genre);
    }

    renderMovie(filteredMovies);
};

//init
const init = async () => {
    movies = await fetchMovieData();
    getGenreList(movies);
    renderMovie(movies);
    renderGenre(genres);
}

init();