import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  /**
   * Sometimes StrictMode is confusing, like for example when merging array
   * items in state. I was getting duplicate key, even though I was using a
   * Set to get rid of repeated items. The StrictMode was rendering twice, hence
   * the errors.
   */
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
)
