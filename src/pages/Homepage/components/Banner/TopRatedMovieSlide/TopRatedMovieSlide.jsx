import React from 'react';
import MovieSlide from '../Common/MovieSlide';  
import { useTopRatedMoviesQuery } from '../../../../../hooks/usePopularMovies';

const TopRatedMovieSlide = () => (
  <MovieSlide title="Top Rated Movies" useMoviesQuery={useTopRatedMoviesQuery} />
);

export default TopRatedMovieSlide;