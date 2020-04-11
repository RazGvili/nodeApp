import React from 'react'
import Home from './components/home'
import About from './components/main/About'
import { StateProvider } from './store.js'

import { Route, BrowserRouter } from 'react-router-dom'

const routes = (

  <BrowserRouter>   
      <div>
        <Route path="/" component={Home} exact={true}/>
        <Route path="/About" component={About}/>
      </div>
  </BrowserRouter>

)


function App() {

  return (


      <StateProvider>
        <div>
          <Home/>
        </div>
      </StateProvider>


  )
}

export default App
