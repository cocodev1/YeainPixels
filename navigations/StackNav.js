import React, {useEffect, useRef, } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import BottomNav from './BottomNav'
import FillPixelScreen from '../scenes/FillPixelScreen'
import AddTrackerScreen from '../scenes/AddTrackerScreen'
import AddHabitScreen from '../scenes/AddHabitScreen'
import PixelScreen from '../scenes/PixelScreen'

import moment from 'moment'
import TypeDisplaySelector from '../components/TypeDisplaySelector'
import LogoTitle from '../components/LogoTitle'
import { getDisplayType, getYears } from '../db'
import { getFocusedRouteNameFromRoute} from '@react-navigation/native'

const Stack = createStackNavigator()

function getNameForPixel(route) {
   return ({title: moment(route.params.year+'-'+route.params.mouth+'-'+route.params.day, 'YYYY-MM-DD').format("MMM Do YYYY")})
}

export default function StackNav() {

    const viewYear = useRef()

    useEffect(() => {
        getDisplayType().then(type => viewYear.current = type)
    }, [])


    return(
        <Stack.Navigator initialRouteName='Year in Pixels'>
            <Stack.Screen name="Year in Pixels" component={BottomNav} initialParams={{type: viewYear, year: moment().format('YYYY')}}
            options={({route}) => ({
                headerTitle: () => <LogoTitle childrenTitle={getFocusedRouteNameFromRoute(route)}/>,
                headerRight: () => (<TypeDisplaySelector childrenTitle={getFocusedRouteNameFromRoute(route)}/>)
            })}/>
            <Stack.Screen name="Fill Pixel" component={FillPixelScreen} initialParams={{ day: 30, mouth: "07", year: "2020" }} 
                options={({route}) => getNameForPixel(route)}/>
            <Stack.Screen name="Pixel" component={PixelScreen} 
                options={({route}) => getNameForPixel(route)}/>
            <Stack.Screen name="Add tracker" component={AddTrackerScreen} />
            <Stack.Screen name="Add Habit" component={AddHabitScreen} />
        </Stack.Navigator>
    )
}