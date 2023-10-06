'use strict';

//loop through all listings
const loopListings = () => {
    const listing = document.querySelectorAll('.movie-listing');
    listing.forEach((element) => {
        element.addEventListener('click', () => {
            //get clicked movie ID
            const movieID = element.id.split('-');
            renderModal(movieID[1]);
        });
    });
}

// Render out modal
const renderModal = (movieID) => {
    const genre = document.getElementById('modalGenre');
    const name = document.getElementById('modalName');
    const director = document.getElementById('modalDirector');
    const length = document.getElementById('modalLength');
    const rating = document.getElementById('modalRating');
    const summary = document.getElementById('modalText');

    // loop through 
    movies.forEach(movie => {
        console.log('id: '+movieID);
        if(movieID === movie.id.toString()){

            console.log('inside if');
            genre.innerText = movie.genre;
            name.innerText = movie.name;
            director.innerText = movie.director;
            length.innerText = movie.length;
            rating.innerText = movie.rating;
            summary.innerText = movie.summary;

            return;
        }
    });
};

// init
