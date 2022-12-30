import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  /**
   * Sometimes StrictMode is confusing, like for example when merging array
   * items in state. I was getting duplicate key error, even though I was using
   * a Set to get rid of repeated items. I think that because the StrictMode 
   * was rendering twice, I was getting the error.
   */
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
)
