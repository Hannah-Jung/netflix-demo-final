import React from 'react';
import MovieSlide from '../Common/MovieSlide';  
import { useUpcomingMoviesQuery } from '../../../../../hooks/usePopularMovies';

const UpcomingMovieSlide = () => (
  <MovieSlide title="Upcoming Movies" useMoviesQuery={useUpcomingMoviesQuery} />
);

export default UpcomingMovieSlide;