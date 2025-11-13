import React from 'react';
import MovieSlide from '../Common/MovieSlide';  
import { useNowPlayingMoviesQuery } from '../../../../../hooks/usePopularMovies';

const NowPlayingMovieSlide = () => (
  <MovieSlide title="Now Playing" useMoviesQuery={useNowPlayingMoviesQuery} />
);

export default NowPlayingMovieSlide;