import React, { useState, useEffect } from 'react'
import { useSearchMovieQuery } from '../../hooks/useSearchMovie'
import { useSearchParams } from 'react-router-dom'
import { Alert, Col, Container, Row, Spinner, Form, Dropdown } from 'react-bootstrap'
import MovieCard from '../Homepage/components/MovieCard/MovieCard'
import ReactPaginate from 'react-paginate';
import './MoviePage.style.css'
import { useMovieGenreListQuery } from '../../hooks/usePopularMovies'

const MoviePage = () => {
  const [query, setQuery] = useSearchParams()
  const [page, setPage] = useState(1)
  const [selectedGenre, setSelectedGenre] = useState("")  

  const handleGenreSelect = (eventKey) => {
    setSelectedGenre(eventKey);
    setQuery({});
    setPage(1);
  };

  const keyword = query.get("q")
  const { data: genres, isLoading: genresLoading } = useMovieGenreListQuery()
  const {data, isLoading, isError, error} = useSearchMovieQuery({keyword, page, genre: keyword ? "" : selectedGenre})
  
  console.log("data", data)
  const genreName = genres?.find(g => g.id === Number(selectedGenre))?.name || "All";
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortField, setSortField] = useState("popularity");

  const maxPages = 500;
  const totalPages = data?.total_pages ? Math.min(data.total_pages, maxPages) : 1;

  useEffect(() => {
    setPage(1);
  }, [keyword]);

  const handlePageClick = ({selected}) => { 
    setPage(selected + 1)
   }
  
  if(isLoading || genresLoading){
    return (
      <div className="loading-spinner-wrapper">
        <Spinner animation="grow" role="status" variant='danger' style={{ width: '5rem', height: '5rem' }}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      </div>
    )
  }

  if(isError) {
    return <Alert variant="danger">{err?.message || 'Error loading data'}</Alert>;
  }

  const handleSortFieldSelect = (field) => {
    setSortField(field);
  };

  const handleSortOrderSelect = (order) => {
    setSortOrder(order);
  };

  const sortedResults = data?.results
  ? [...data.results].sort((a, b) => {
      if (sortField === "release_date") {
        const dateA = new Date(a.release_date);
        const dateB = new Date(b.release_date);
        return sortOrder === "desc"
          ? dateB - dateA
          : dateA - dateB;
      } else {
        return sortOrder === "desc"
          ? b[sortField] - a[sortField]
          : a[sortField] - b[sortField];
      }
    })
  : [];

  const sortFieldLabels = {
  popularity: "🔥Popularity",
  vote_average: "⭐Ratings",
  release_date: "📅Release Date"
};

  return (
    <Container>
      <Row>
        <Col lg={4} xs={12} className='custom'>
          <Form.Label className="custom-label">Search by Genre</Form.Label>
            <Dropdown onSelect={handleGenreSelect}>
              <Dropdown.Toggle variant="secondary" id="dropdown-genre"  className="custom-dropdown-toggle">
                {genreName}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="">All</Dropdown.Item>
                {genres?.map((genre) => (
                  <Dropdown.Item eventKey={genre.id.toString()} key={genre.id}>
                    {genre.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Form.Label className="custom-label mt-3">Select a Field</Form.Label>
              <Dropdown onSelect={handleSortFieldSelect}>
                <Dropdown.Toggle variant="secondary" className="custom-dropdown-toggle">
                  {sortFieldLabels[sortField] || "Select"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="popularity">🔥Popularity</Dropdown.Item>
                  <Dropdown.Item eventKey="vote_average">⭐Ratings</Dropdown.Item>
                  <Dropdown.Item eventKey="release_date">📅Release Date</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Form.Label className="custom-label mt-3">Sort by Order</Form.Label>
              <Dropdown onSelect={handleSortOrderSelect}>
                <Dropdown.Toggle variant="secondary" className='mb-3 custom-dropdown-toggle'>{sortOrder === "desc" ? "High to Low" : "Low to High"}</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="desc">High to Low</Dropdown.Item>
                  <Dropdown.Item eventKey="asc">Low to High</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
        </Col>        
        <Col lg={8} xs={12}>
           {!isLoading && sortedResults.length === 0 ? (
            <p className="no-result-message">
              Sorry, we couldn't find any results of "{keyword}"
            </p>
          ) : (
            <>
              <Row className="justify-content-center justify-content-lg-start">
                {sortedResults.map((movie, index) => (
                  <Col key={index} lg={4} xs={12} className="d-flex justify-content-center">
                    <MovieCard movie={movie} />
                  </Col>
                ))}
              </Row>
              <ReactPaginate
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                marginPagesDisplayed={1}
                pageCount={totalPages}
                previousLabel="<"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
                forcePage={page - 1}
              />
            </>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default MoviePage