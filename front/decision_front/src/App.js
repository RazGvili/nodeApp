import React from 'react'

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
