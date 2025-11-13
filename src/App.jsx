import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AppLayout from './layout/AppLayout'
import Homepage from './pages/Homepage/Homepage'
import MoviePage from './pages/Movies/MoviePage'
import MovieDetailPage from './pages/MovieDetail/MovieDetailPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import { Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [count, setCount] = useState(0)
  const [selectedProfile, setSelectedProfile] = useState(null);

  return (
    
      <Routes>
        <Route path="/" element={<AppLayout/>}>
          <Route index element={<Homepage profile={selectedProfile}/>}/>
          <Route path="movies">
            <Route index element={<MoviePage/>}/>
            <Route path=":id" element={<MovieDetailPage/>}/>
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    
  )
}

export default App
