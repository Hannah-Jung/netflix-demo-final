import React from 'react';
import MovieSlide from '../Common/MovieSlide';  
import { usePopularMoviesQuery } from '../../../../../hooks/usePopularMovies';
import { responsive } from '../../../../../constants/responsive';

const PopularMovieSlide = () => (
  <MovieSlide title="Popular Movies" movies={data.results} responsive={responsive} useMoviesQuery={usePopularMoviesQuery} />
);

export default PopularMovieSlide;