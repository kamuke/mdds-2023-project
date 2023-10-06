'use strict';

const movieModal = document.getElementById('movieModal');
const closeModalBtn = document.getElementById('closeModal');

// open modal
const openModal = () => {
    const listing = document.querySelectorAll('.movie-listing');
    listing.forEach((element) => {
        element.addEventListener('click', () => {
            //get clicked movie ID
            const movieID = element.id.split('-');
            renderModal(movieID[1]);
        });
    });
};

// Render out modal
const renderModal = (movieID) => {
    movieModal.classList = 'bg-gradient-to-b from-gray-700 fixed top-0 left-0 right-0 flex justify-center items-center w-full p-4 md:inset-0 h-[calc(100%-1rem)] max-h-full';

    const genre = document.getElementById('modalGenre');
    const name = document.getElementById('modalName');
    const director = document.getElementById('modalDirector');
    const length = document.getElementById('modalLength');
    const rating = document.getElementById('modalRating');
    const summary = document.getElementById('modalText');

    // loop through movies, get the clicked one's info
    movies.forEach(movie => {
        if(movieID === movie._id.toString()){
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

//add a window click listener, hide modal when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target === movieModal) {
      closeModal();
    }
});

closeModalBtn.addEventListener('click', (event) => {
    event.preventDefault();
    closeModal();
});

const closeModal = () => {
    movieModal.classList = 'hidden';
}