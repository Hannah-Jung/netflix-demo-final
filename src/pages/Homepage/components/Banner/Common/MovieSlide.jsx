import React from 'react';
import Carousel from 'react-multi-carousel';
import { Alert } from 'react-bootstrap';
import MovieCard from '../../MovieCard/MovieCard';
import 'react-multi-carousel/lib/styles.css';
import './MovieSlide.style.css';

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 6 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
};

const MovieSlide = ({ title, useMoviesQuery }) => {
  const { data, isLoading, isError, error } = useMoviesQuery();
  console.log("data", data)

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <Alert variant="danger">{error.message}</Alert>;

  return (
    <div>
      <h3 style={{ marginLeft: '15px', fontWeight: '800' }}>{title}</h3>
        <Carousel
          infinite={true}
          centerMode={true}
          autoPlay={true}
          autoPlaySpeed={4000}
          itemClass="movie-slider p-1"
          containerClass="carousel-container"
          responsive={responsive}
        >
          {data.results.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </Carousel>
    </div>
  );
};

export default MovieSlide;