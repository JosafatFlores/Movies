import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import routes from './Routes/index'

const App = () => {
  return (
    <BrowserRouter>
      <routes />
    </BrowserRouter>
  )
}


export default App;
