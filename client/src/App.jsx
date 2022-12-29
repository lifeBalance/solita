import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// pages
import HomePage from './pages/HomePage'
import StationsPage from './pages/StationsPage'
import JourneysPage from './pages/JourneysPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<HomePage />}
        />

        <Route
          path='/stations'
          element={<StationsPage />}
        />

        <Route
          path='/journeys'
          element={<JourneysPage />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
