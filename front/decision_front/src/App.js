import React from 'react'

import { StateProvider } from './store.js'
import { Route, BrowserRouter, Switch } from 'react-router-dom'

import Home from './components/home'
import About from './components/main/About'
import NotFound from './components/main/404'
import Footer from './components/Footer.js'
import Snack from './components/main/snack'


function App() {

  return (

      <StateProvider>
        <BrowserRouter>   
        <Switch>
            <Route path="/" component={Home} exact={true}/>
            <Route path="/d/:id" component={Home} /> 
            <Route path="/About" component={About}/>
            <Route component={NotFound}/>
        </Switch>
        <Footer />
      </BrowserRouter>
      
      <Snack/>
      </StateProvider>
      
  )
}

export default App
