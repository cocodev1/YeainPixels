import React from 'react';
import Nav from './navigations/'
import {Provider} from 'react-redux'
import Store from './redux/store/configureStore'
import {createTables} from './db'

export default function App() {
  createTables()
  return (
    <Provider store={Store}>
      <Nav />
    </Provider> 
  );
}

