import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import '../App.css'
import './AppLayout.style.css'
import Footer from '../pages/Homepage/components/Footer/Footer';
import ProfileSelection from '../pages/Homepage/components/ProfileSelection';
import { Dropdown, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import ScrollToTopButton from '../pages/Homepage/components/Banner/Common/ScrollToTopButton';

const AppLayout = () => {
  const [keyword, setKeyword] = useState("")
  const navigate = useNavigate()
  const [showSearch, setShowSearch] = useState(false);

  const toggleSearch = () => {
    setShowSearch(prev => !prev);
  };
  const searchByKeyword=(event) => { 
    event.preventDefault()
    navigate(`/movies?q=${keyword}`)
    setKeyword("")
  }
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showProfileSelection, setShowProfileSelection] = useState(false);
  const handleSignInClick = () => setShowProfileSelection(true);
  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile);
    setShowProfileSelection(false);
  };
  const handleSignOut = () => setSelectedProfile(null);

  return (
    <div className='appLayout'>      
      <Container fluid>
        <Navbar expand="lg" style={{ backgroundColor: '#000' }} data-bs-theme="dark">
            <Navbar.Brand href="/">
              <img
                  src="data:image/jpeg;base64,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"
                  width="100"
                  height="40"
                  className="d-inline-block align-top"
                  alt="Netflix Logo"
                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar" />
            <Navbar.Collapse id="navbar">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/movies">Movies</Nav.Link>
              </Nav>
              <Form className="d-flex" onSubmit={searchByKeyword}>
                <Form.Control
                  type="search"
                  placeholder="Type here"
                  className="me-2 nav-search-input"
                  aria-label="Search"   
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}           
                />
                <Button className='nav-search-btn' onClick={toggleSearch} type="button"><FontAwesomeIcon icon={faMagnifyingGlass} /></Button>
              </Form>
              <Nav>
                {!selectedProfile ? (
                  <Button
                    className='nav-signin-btn'
                    style={{ marginRight: "15px", marginLeft: "8px" }}
                    variant="outline-light"
                    onClick={handleSignInClick}
                  >
                    Sign In
                  </Button>
                ) : (
                  <Button
                    className='nav-signout-btn'
                    style={{ marginRight: "15px", marginLeft: "8px" }}
                    variant="outline-light"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>
                )}
              </Nav>
            </Navbar.Collapse>        
          </Navbar>
        </Container>
        {showProfileSelection && (
          <ProfileSelection onSelect={handleProfileSelect} />
        )}
      <main className='outlet-wrapper'>
        <Outlet></Outlet>
      </main>
      
      <Footer />
        <div
          style={{
            position: 'fixed',
            bottom: '40px',
            right: '40px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            zIndex: 100,
          }}
        >
          <ScrollToTopButton />
        </div>
    </div>
    
  )
}

export default AppLayout