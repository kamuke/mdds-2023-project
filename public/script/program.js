'use strict';

//const modal = document.getElementById(addMovie);

const genreList = document.getElementById('list-genre');
const movieList = document.getElementById('list-program');
const filteredGenre = document.getElementById('list-genre');

// Genre array, get from database?
const genres = ['Romance', 'Drama', 'Comedy'];

// Movie json temp
const jsonData = {
    "movies": [
        {
            "name": "Love on Cloud Nine",
            "time": '2023-10-11T14:00:00Z',
            "length": '00:40',
            "genre": "Romance",
            "director": "Olivia Anderson"
        },
        {
            "name": "Heartstrings and Harmony",
            "time": '2023-10-11T13:15:00Z',
            "length": '00:20',
            "genre": "Drama",
            "director": "Benjamin Carpenter"
        },
        {
            "name": "The Great Mix-Up",
            "time": '2023-10-11T14:30:00Z',
            "length": '00:20',
            "genre": "Comedy",
            "director": "Sophie Reynolds"
        },
        {
            "name": "Tears in the City",
            "time": '2023-10-11T15:00:00Z',
            "length": '00:20',
            "genre": "Drama",
            "director": "Lucas Mitchell"
        },
        {
            "name": "The Quirky Cupid",
            "time": '2023-10-11T15:30:00Z',
            "length": '00:20',
            "genre": "Romance",
            "director": "Emma Sullivan"
        }
    ]
};
// Movie array, get from database?
const movies = jsonData.movies;

console.log(movies);

// format the time in movie json to local timezone because you need to do that for some reason
/*
const formatToLocalTime(movieTime) {
    const date = new Date(movieTime);
    return date.toLocaleDateString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        hour
    })
};
*/

// Filter movies by clicked genre
filteredGenre.addEventListener('click', (event) => {
    event.preventDefault();
    event.target.tagName === 'SPAN' && renderMovieByGenre(event.target.textContent);
});

// Render out all genre choices
const renderGenre = (genres) => {
    genres.forEach(genre => {
        const newGenre = document.createElement('span');
        const genreLink = document.createElement('li');
        const button = document.createElement('button');
    
        //add id for filtering
        genreLink.id = genre;
    
        newGenre.classList = 'inline-block px-2 py-1 mr-2 bg-secondary-100 text-secondary-900 rounded-full font-semibold uppercase tracking-wide text-xs';
    
        newGenre.innerText = genre;
    
        genreList.appendChild(genreLink);
        genreLink.appendChild(button);
        button.appendChild(newGenre);
    });
}

// Render movie(s)
// TODO: FILTER MOVIES BY START TIME
const renderMovie = (movies) => {
    // sort movies by their start time
    const filterMovieByTime = movies.sort((a, b) => {
        const timeA = new Date(a.time);
        const timeB = new Date(b.time);
        return timeA - timeB;
    });
    filterMovieByTime.forEach(movie => {
        // render Start Time
        const hour = new Date(movie.time);
        const startTimeDiv = document.createElement('div');
        const startTimeText = document.createElement('h2');
        startTimeDiv.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"> <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clip-rule="evenodd" /></svg>';
        startTimeText.innerHTML = hour.getHours() + ':' + hour.getMinutes().toString().padStart(2, '0');
        startTimeDiv.classList = 'col-span-1 text-secondary flex items-center justify-center underline underline-offset-8 decoration-4 decoration-secondary';
        startTimeDiv.setAttribute('style', 'writing-mode: vertical-rl; text-orientation: upright;');
        startTimeText.classList = 'my-2 text-2xl font-semibold text-gray-100';
    
        startTimeDiv.appendChild(startTimeText);
        movieList.appendChild(startTimeDiv);
    
        // render Movie
        const movieA = document.createElement('a');
        const movieDivHover = document.createElement('div');
        const movieContent = document.createElement('div');
        const movieImg = document.createElement('img');
        const movieDivFlex = document.createElement('div');
        const movieGenreDiv = document.createElement('div');
        const movieGenre = document.createElement('span');
        const movieName = document.createElement('h3');
        const movieLength = document.createElement('div');
        const movieDescription = document.createElement('div');
    
        movieA.href= '/';
        movieA.classList = 'rounded-lg col-[span_11] lg:col-span-3 lg:col-start-3 lg:col-end-13 group';
        movieDivHover.classList = 'group-hover:bg-secondary rounded-lg';
        movieContent.classList = 'bg-gray-900 rounded-lg shadow-xl hover:-translate-x-3 hover:-translate-y-3 flex flex-row md:flex-col';
        movieImg.classList = 'rounded-lg h-36 md:h-56 w-1/2 md:w-full object-cover';
        // TODO: get movie poster
        movieImg.src = 'https://picsum.photos/500/500';
        movieDivFlex.classList = 'p-5 md:p-4 flex flex-col items-stretch w-full';
        movieGenre.classList = 'inline-block px-2 py-1 bg-secondary-100 text-secondary-900 rounded-full font-semibold uppercase tracking-wide text-xs';
        movieGenre.innerHTML = movie.genre;
        movieName.classList = 'my-2 text-1xl font-semibold text-gray-100';
        movieName.innerHTML = movie.name;
        movieLength.classList = 'flex justify-between text-gray-300';
        // TODO: get movie length
        movieLength.innerHTML = '13:15-14:55';
        movieDescription.classList = 'flex justify-between text-gray-300 pt-2';
        movieDescription.innerHTML = '<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>';
    
        movieA.appendChild(movieDivHover);
        movieDivHover.appendChild(movieContent);
        movieContent.appendChild(movieImg);
        movieContent.appendChild(movieDivFlex);
        movieDivFlex.appendChild(movieGenreDiv);
        movieGenreDiv.appendChild(movieGenre);
        movieDivFlex.appendChild(movieName);
        movieDivFlex.appendChild(movieLength);
        movieDivFlex.appendChild(movieDescription);
    
        movieList.appendChild(movieA);
    });
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

// init
renderMovie(movies);
renderGenre(genres);