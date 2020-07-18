import React from 'react'

import { Route, BrowserRouter, Switch } from 'react-router-dom'

import Home from './components/home'
import About from './components/main/About'
import Lucky from './components/main/Lucky'
import NotFound from './components/main/404'
import Footer from './components/main/Footer'
import Snack from './components/main/snack'

const App = () => {

  return (

      <>
        <BrowserRouter>   
            <Switch>
                <Route path="/" component={Home} exact={true}/>
                <Route path="/d/:id" component={Home} /> 
                <Route path="/About" component={About}/>
                <Route path="/Lucky" component={Lucky}/>

                <Route component={NotFound}/>
            </Switch>
          <Footer />
        </BrowserRouter>
      
      <Snack/>
      </>
      
  )
}

export default App
