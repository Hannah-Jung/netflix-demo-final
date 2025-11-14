import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMovieCreditsQuery, useMovieDetailsQuery, useMovieDirectorQuery, useMovieImagesQuery, useMovieRecommendationsQuery, useMovieReviewsQuery, useMovieVideosQuery } from "../../hooks/usePopularMovies"; 
import { Container, Row, Col, Button, Modal, Table, Carousel, Spinner } from "react-bootstrap";
import './MovieDetailPage.style.css'
import MovieCard from "../Homepage/components/MovieCard/MovieCard";
import YouTube from "react-youtube";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faVideo, faVideoSlash } from "@fortawesome/free-solid-svg-icons";

const MovieDetailPage = (movieId) => {
  const { id } = useParams();
  const { data: movie, isLoading, isError } = useMovieDetailsQuery(id);
  const { data: reviews = [], isLoading: reviewsLoading } = useMovieReviewsQuery(id);
  const [expandedReviews, setExpandedReviews] = useState({});
  const { data: recommendations = [], isLoading: recLoading } = useMovieRecommendationsQuery(id);
  const { data: videos = [] } = useMovieVideosQuery(id);
  const [showTrailer, setShowTrailer] = useState(false);
  const [videoId, setVideoId] = useState("");
  const { data: credits = [], isLoading: creditsLoading } = useMovieCreditsQuery(id);
  const [expandedCast, setExpandedCast] = useState({});
  const [showAllCast, setShowAllCast] = useState(false);
  const displayedCast = showAllCast ? credits : credits.slice(0, 9);
  const [showAllPosters, setShowAllPosters] = useState(false);
  const { data: images = {} } = useMovieImagesQuery(id);
  const { data: directorName } = useMovieDirectorQuery(id);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);
  const [imageLoading, setImageLoading] = useState(true);

  const posters = images.posters || [];
  const displayedPosters = posters.slice(0, 5);

  const trailer = videos.find(video => video.type === "Trailer") || videos[0];

  const handleShowTrailer = () => {
    if (trailer) {
      setVideoId(trailer.key);
      setShowTrailer(true);
    }
  };

  const handleCloseTrailer = () => {
    setShowTrailer(false);
    setVideoId("");
  };

  useEffect(() => {
    setShowAllCast(false);
  }, [id]);

  useEffect(() => {
    setShowAllReviews(false);
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred while loading movie details. Please try again.</div>;

  if (!movie) return null;

  const posterUrl = movie.poster_path
    ? `https://www.themoviedb.org/t/p/original${movie.poster_path}`
    : "https://www.rockettstgeorge.co.uk/cdn/shop/products/no_selection_10186714-2331-4aff-8cb3-ba304bf72172.jpg?v=1683648945";

  const date = movie.release_date ? new Date(movie.release_date) : null;
  const formattedDate = date instanceof Date && !isNaN(date)
    ? new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: '2-digit' }).format(date)
    : "Not available";

  const formatRuntime = (runtime) => {
    if (!runtime) return "Not available";

    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;

    const hoursStr = hours > 0 ? `${hours} hr` : "";
    const minutesStr = minutes > 0 ? ` ${minutes} min` : "";

    return `${hoursStr}${minutesStr}`.trim();
  }

  const hasTrailer = !!trailer;

  const toggleReview = (reviewId) => {
    setExpandedReviews(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  const renderReview = (review) => {
    const isExpanded = expandedReviews[review.id];
    const text = review.content;
    const shortText = text.length > 300 ? text.slice(0, 300) + "..." : text;

  const toggleCast = (name) => {
    setExpandedCast(prev => ({ ...prev, [name]: !prev[name] }));
  };

    return (
      <div key={review.id} className="rounded p-3 mb-3 bg-dark custom-border" >
        <h5 style={{ fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '2px solid dimgray' }}>
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faUser} style={{ marginRight: '4px' }} />
            {review.author}
          </span>
          <small style={{ fontSize: '15px', fontWeight: '500', color: 'gray' }}>
            {new Date(review.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
          </small>
        </h5>          
        <p style={{ whiteSpace: 'pre-wrap' }}>
          {isExpanded ? review.content : (review.content.length > 300 ? review.content.slice(0, 300) + "..." : review.content)}
        </p>
        {review.content.length > 300 && (
          <Button
            variant="link"
            onClick={() => toggleReview(review.id)}
            className="custom-hover-button"
            style={{ padding: 0, fontWeight: 'bold', textAlign: 'left', color: 'darkgray' }}
          >
            {isExpanded ? "Read Less" : "Read More"}
          </Button>
          )}
      </div>
    );
  };

  return (
    <Container style={{ padding: "20px", backgroundColor: "rgba(255, 255, 255, 0.075)", borderTopLeftRadius: "8px", 
    borderTopRightRadius: "8px", 
    borderBottomLeftRadius: 0, 
    borderBottomRightRadius: 0  }}>
      <Row>
        <Col xs={12} md={5}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
          }}>
            <Carousel interval={4000} controls={true} indicators={true} pause="hover">              
              {(displayedPosters.length > 0 ? displayedPosters : [null]).map((poster, index) => (
                <Carousel.Item key={index} style={{ position: 'relative' }}>
                {imageLoading && (
                  <div className="loading-spinner-wrapper" style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10,
                  }}>
                    <Spinner animation="grow" role="status" variant='danger' style={{ width: '5rem', height: '5rem' }}>
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </div>
                )}
                <img
                  src={poster && poster.file_path
                    ? `https://image.tmdb.org/t/p/original${poster.file_path}`
                    : "https://www.rockettstgeorge.co.uk/cdn/shop/products/no_selection_10186714-2331-4aff-8cb3-ba304bf72172.jpg?v=1683648945"}
                  alt={poster ? `Poster ${index + 1}` : "Default Poster"}
                  style={{
                    width: '100%',
                    marginBottom: '10px',
                    marginTop: '10px',
                    objectFit: 'contain',
                    display: imageLoading ? 'none' : 'block'
                  }}
                  onLoad={() => setImageLoading(false)}
                />
              </Carousel.Item>
            ))}
          </Carousel>
          </div>          
        </Col>
        <Col xs={12} md={7}>
          <h1 style={{ fontSize: "35px", fontWeight: "700", marginBottom: "1rem", textAlign: "center" }}>{movie.title}</h1>
          <Table striped="columns" variant="dark" bordered hover size="sm" responsive className="custom-table">
            <tbody>
              <tr>
                <th style={{ width: '20%'}}>Genre</th>
                <td>
                  {movie.genres && movie.genres.length > 0
                    ? movie.genres.map((g) => g.name).join(", ")
                    : "Not available"}
                </td>
              </tr>
              <tr>
                <th>Ratings</th>
                <td>{(Math.round(movie.vote_average * 10) / 10).toFixed(1)} / 10</td>
              </tr>
              <tr>
                <th>Popularity</th>
                <td>{Math.round(movie.popularity)}</td>
              </tr>
              <tr>
                <th>Runtime</th>
                <td>{formatRuntime(movie.runtime)}</td>
              </tr>
              <tr>
                <th>Overview</th>
                <td>
                  {movie.overview && movie.overview.trim() !== "" && movie.overview.trim() !== "-"
                    ? (
                      <>
                        {movie.tagline && (
                          <p style={{ fontWeight: '600', fontStyle: 'italic', marginBottom: '0.5rem', color: 'lightgray', textAlign: 'center' }}>
                            {movie.tagline}
                          </p>
                        )}
                        <p style={{ margin: 0 }}>{movie.overview}</p>
                      </>
                    )
                    : "Not available"
                  }
                </td>                
              </tr>
              <tr>
                <th>Budget</th>
                <td>
                  {movie.budget === 0
                    ? "Not available"
                    : `$${movie.budget.toLocaleString()}`}
                </td>
              </tr>
              <tr>
                <th>Revenue</th>
                <td>
                  {movie.revenue === 0
                    ? "Not available"
                    : `$${movie.revenue.toLocaleString()}`}
                </td>
              </tr>
              <tr>
                <th>Release Date</th>
                <td>{formattedDate}</td>
              </tr>
              <tr>
                <th>Director</th>
                <td>{directorName}</td>
              </tr>
            </tbody>
          </Table>          
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
            <Button
              variant="dark"
              style={{ fontWeight: 700, padding: "10px 20px" }}
              onClick={hasTrailer ? handleShowTrailer : undefined}
              disabled={!hasTrailer}
            >
              {hasTrailer ? (
                <>
                  <FontAwesomeIcon icon={faVideo} style={{ marginRight: '6px' }} />
                    Watch Trailer
                    </>
                    ) : (
                    <>
                      <FontAwesomeIcon icon={faVideoSlash} style={{ marginRight: '6px' }} />
                        No trailer available
                    </>
              )}
            </Button>
          </div>
        </Col>
        <Modal show={showTrailer} onHide={handleCloseTrailer} size="lg" centered dialogClassName="custom-modal" data-bs-theme="dark" >
        <Modal.Header closeButton>
          <Modal.Title>Trailer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {videoId && (
            <YouTube
              videoId={videoId}
              opts={{
                width: "100%",
                height: "400px",
                playerVars: {
                  autoplay: 1,
                },
              }}
            />
          )}
        </Modal.Body>
      </Modal>
        <h3 style={{marginTop: '20px' , fontWeight: '700'}}>Cast ({credits.length})</h3>
          <div style={displayedCast.length > 0
            ? { display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }
            : {}
        }>
            {displayedCast.length > 0 ? (
              displayedCast.map(({ name, character, profilePath }) => (
                <div key={name} style={{ width: 120 }} >
                  <img
                    src={profilePath ? `https://image.tmdb.org/t/p/w185${profilePath}` : "https://www.rockettstgeorge.co.uk/cdn/shop/products/no_selection_10186714-2331-4aff-8cb3-ba304bf72172.jpg?v=1683648945"}
                    alt={name}
                    style={{ width: '100%', borderRadius: 8 }}
                    className="cast-img"
                  />
                  <p style={{ fontWeight: 'bold', margin: '4px 0 0', padding:'3px' }}>{name}</p>
                  <p style={{ fontSize: '0.85em', color: 'darkgray', padding:'3px' }}>{character}</p>
                </div>
              ))
            ) : (
              <p>No cast information available.</p>
            )}
          </div>
          {credits.length > 9 && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '8px' }}>
              <Button
                variant="link"
                onClick={() => setShowAllCast(!showAllCast)}
                className="cast-show-button"
                style={{ padding: 0, fontSize: '17px', fontWeight: 'bold', marginTop: '8px', width: 'max-content' }}
              >
                {showAllCast ? "View Less" : "View All"}
              </Button>
            </div>
          )}
      <div style={{ marginTop: 40 }}>
        <h3 style={{ fontWeight: 700 }}>
          Reviews ({reviews.length})
        </h3>
        {reviewsLoading ? (
          <p>Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p>No reviews available.</p>
        ) : (
          <>
            {displayedReviews.map(renderReview)}
            {reviews.length > 3 && (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '8px' }}>
                <Button
                  variant="link"
                  onClick={() => setShowAllReviews(!showAllReviews)}
                  className="review-show-button"
                  style={{ padding: 0, fontSize: '17px', fontWeight: 'bold', marginTop: '8px', width: 'max-content' }}
                >
                  {showAllReviews ? "View Less" : "View All"}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
      </Row>
      <div style={{ marginTop: 40 }}>
        <h3 style={{fontWeight: 700}}>More Like This</h3>
        {recLoading ? (
          <p>Loading recommendations...</p>
        ) : recommendations.length === 0 ? (
          <p>No recommendations available.</p>
        ) : (
          <div className="recommendations-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
            {recommendations.map((recMovie) => (
              <MovieCard key={recMovie.id} movie={recMovie} />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default MovieDetailPage;