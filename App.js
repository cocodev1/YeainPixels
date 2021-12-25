import React, {useState, useEffect} from 'react'
import Nav from './navigations/'
import {Provider} from 'react-redux'
import Store from './redux/store/configureStore'
import {createTables, addUuid, getUuid, dropTables} from './db'
import AppSplashAnimated from './AppSplashAnimated'
import * as Segment from 'expo-analytics-segment'
import { AppEventsLogger } from "react-native-fbsdk-next"

export default function App() {

  useEffect(() => {
    const run = async () => {
      await createTables()
      await addUuid()
      const uuid = await getUuid()
      Segment.initialize({androidWriteKey: process.env.WRITE_KEY, iosWriteKey: process.env.WRITE_KEY})
      Segment.identify(uuid)
    }
    run()
  }, [])

  return (
    <AppSplashAnimated>
      <Provider store={Store}>
        <Nav />
      </Provider> 
    </AppSplashAnimated>
  )
}

