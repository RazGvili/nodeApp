import React from 'react'
import Home from './components/home'

import { StateProvider } from './store.js'

import AppRouter from './AppRouter'


function App() {

  return (

      <StateProvider>
        <AppRouter/>
      </StateProvider>
  )
}

export default App
