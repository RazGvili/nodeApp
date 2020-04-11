import React from 'react'

import { Route, BrowserRouter, Switch } from 'react-router-dom'

import Home from './components/home'
import About from './components/main/About'
import NotFound from './components/main/404'

const AppRouter = () => (

    <BrowserRouter>   
        <Switch>
            <Route path="/" component={Home} exact={true}/>
            <Route path="/:slug" component={Home} />
            <Route path="/About" component={About}/>
            <Route component={NotFound}/>
        </Switch>
    </BrowserRouter>
)

export default AppRouter