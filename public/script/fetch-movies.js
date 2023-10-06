'use strict';

// Get movies from json
// TODO: get movie data list from database
const fetchMovieData = async () => {
  const url = 'http://localhost:3000';
  const fetchOptions = {
    method: 'GET',
  };
  try {
    const response = await fetch(url + '/api/getMovies', fetchOptions);
    if (!response.ok) {
      throw new Error('Network error');
    }
    return await response.json();
  } catch (e) {
    console.log('Error fetching from API:', e);
    try {
      const localResponse = await fetch('../data/movies.json');
      if (!localResponse.ok) {
        throw new Error('Local file fetch error');
      }
      const movieData = await localResponse.json();
      return movieData.movies;
    } catch (localError) {
      console.log('Error fetching from local file:', localError);
    }
  }
};