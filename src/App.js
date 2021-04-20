import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from './Routes'
import {Header, Footer} from './Components/Common'


const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes />
      <Footer />
    </BrowserRouter>
  )
}


export default App;
