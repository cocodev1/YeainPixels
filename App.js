import React from 'react'
import Nav from './navigations/'
import {Provider} from 'react-redux'
import Store from './redux/store/configureStore'
import {createTables} from './db'
import AppSplashAnimated from './AppSplashAnimated'

export default function App() {
  createTables()
  return (
    <AppSplashAnimated>
      <Provider store={Store}>
        <Nav />
      </Provider> 
    </AppSplashAnimated>
  )
}

