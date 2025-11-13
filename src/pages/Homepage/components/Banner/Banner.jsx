import React from 'react';
import {
  useTopRatedMoviesQuery,
  usePopularMoviesQuery,
  useUpcomingMoviesQuery,
  useNowPlayingMoviesQuery,
  useMovieGenreListQuery,
} from '../../../../hooks/usePopularMovies';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import MovieSlide from './Common/MovieSlide';
import './Banner.style.css';
import BadgeItem from './Common/BadgeItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';


const Banner = () => {
  const topRated = useTopRatedMoviesQuery();
  const popular = usePopularMoviesQuery();
  const upcoming = useUpcomingMoviesQuery();
  const nowPlaying = useNowPlayingMoviesQuery();
  const { data: genres } = useMovieGenreListQuery();
  const navigate = useNavigate();

  if (
    topRated.isLoading ||
    popular.isLoading ||
    upcoming.isLoading ||
    nowPlaying.isLoading
  ) {
    return (
      <div className="loading-spinner-wrapper">
        <Spinner animation="grow" role="status" variant='danger' style={{ width: '5rem', height: '5rem' }}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
      
    );
  }

  if (
    topRated.isError ||
    popular.isError ||
    upcoming.isError ||
    nowPlaying.isError
  ) {
    const err =
      topRated.error ||
      popular.error ||
      upcoming.error ||
      nowPlaying.error;
    return <Alert variant="danger">{err?.message || 'Error loading data'}</Alert>;
  }

  const movie = popular.data?.results?.[0];
    if (!movie) return null;

  const getGenreNames = (ids) =>
    ids
      .map((id) => genres?.find((g) => g.id === id)?.name)
      .filter(Boolean);

  const badgesData = [    
    { type: 'releaseYear', value: movie.release_date ? movie.release_date.slice(0,4) : 'N/A' },
    { type: 'adult', value: movie.adult ? 'R' : 'PG' },
    { type: 'ratings', value: (Math.round(movie.vote_average * 10) / 10).toFixed(1) },
    { type: 'popularity', value: Math.round(movie.popularity) },
    ...getGenreNames(movie.genre_ids).map(name => ({ type: 'genre', value: name }))
  ];

  {badgesData.map((badge, i) => (
    <BadgeItem key={i} type={badge.type} value={badge.value} />
  ))}

  return (
    <>
      <div
        style={{
          backgroundImage: `url(https://media.themoviedb.org/t/p/original${movie.backdrop_path})`,
        }}
        className="banner"
      >
        <div className="text-white banner-text-area">
          <h1 style={{ marginBottom: '20px', fontWeight: '800' }}>{movie.title}</h1>
            <div className="genre-badge-container">
                {badgesData.map((badge, index) => (
                <BadgeItem key={index} type={badge.type} value={badge.value} />
              ))}
            </div>
          <div style={{ marginTop: '20px' }}>{movie.overview}</div>
          <div className="banner-button-group">
            <button className="banner-button">
              <FontAwesomeIcon icon={faPlay} style={{ marginRight: 8 }} />
                Play
            </button>
            <button className="banner-button" onClick={() => {
              navigate(`/movies/${movie.id}`);
            }}>
              <FontAwesomeIcon icon={faCircleInfo} style={{ marginRight: 8 }} />
                More Info
            </button>
          </div>
        </div>
      </div>
      <div className="movie-slide-container">
        <MovieSlide title="Popular" useMoviesQuery={usePopularMoviesQuery} />
        <MovieSlide title="Top Rated" useMoviesQuery={useTopRatedMoviesQuery} />
        <MovieSlide title="Now Playing" useMoviesQuery={useNowPlayingMoviesQuery} />
        <MovieSlide title="Upcoming" useMoviesQuery={useUpcomingMoviesQuery} />
      </div>
    </>
  );
};

export default Banner;