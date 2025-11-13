import React from 'react';
import { useMovieGenreListQuery } from '../../../../hooks/usePopularMovies';
import './MovieCard.style.css';
import BadgeItem from '../Banner/Common/BadgeItem';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faCircleInfo } from '@fortawesome/free-solid-svg-icons';

const MovieCard = ({ movie }) => {
  const { data: genres } = useMovieGenreListQuery();
  const navigate = useNavigate()

  const getGenreNames = (ids) =>
    ids
      .map(id => genres?.find(g => g.id === id)?.name)
      .filter(Boolean);

  const badgesData = [
    { type: 'releaseYear', value: movie.release_date ? movie.release_date.slice(0, 4) : 'N/A' },
    { type: 'adult', value: movie.adult ? 'R' : 'PG' },
    { type: 'ratings', value: (Math.round(movie.vote_average * 10) / 10).toFixed(1) },
    { type: 'popularity', value: Math.round(movie.popularity) },
    ...getGenreNames(movie.genre_ids).map(name => ({ type: 'genre', value: name })),
  ];

  const backgroundImageUrl = movie.poster_path
    ? `url(https://media.themoviedb.org/t/p/original${movie.poster_path})`
    : `url(https://www.rockettstgeorge.co.uk/cdn/shop/products/no_selection_10186714-2331-4aff-8cb3-ba304bf72172.jpg?v=1683648945)`; 

  const handleClick = () => {
    navigate(`/movies/${movie.id}`);
  };

  return (
    <div
    style={{
      backgroundImage: backgroundImageUrl,
      backgroundColor: backgroundImageUrl === 'none' ? 'dimgray' : 'transparent',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      cursor: 'default'
    }}
    className="movie-card"
  >
    <div className="overlay">
      <h4 style={{ marginBottom: '15px', fontWeight: '800' }}>{movie.title}</h4>
      <div className="genre-badge-container">          
        {badgesData.map((badge, i) => (
          <BadgeItem key={i} type={badge.type} value={badge.value} />
      ))}
      </div>
      <div className="overview">{movie.overview}</div>
      <div className="movie-card-button-group" onClick={e => e.stopPropagation()}>
        <button className="movie-card-button">
          <FontAwesomeIcon icon={faPlay} style={{ marginRight: 8 }} />
            Play
        </button>
        <button
          className="movie-card-button"
          onClick={() => navigate(`/movies/${movie.id}`)}
        >
          <FontAwesomeIcon icon={faCircleInfo} style={{ marginRight: 8 }} />
            More Info
        </button>
      </div>
    </div>
  </div>
  );
};

export default MovieCard;