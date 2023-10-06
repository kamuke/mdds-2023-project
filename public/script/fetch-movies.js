'use strict';
// Get movies from json
// TODO: get movie data list from database
const fetchMovieData = async () => {
    try {
        const response = await fetch('../data/movies.json');
        if (!response.ok) { throw new Error('Network error');};
        return await response.json();
    } catch (e) {
        console.log(e);
    }
};