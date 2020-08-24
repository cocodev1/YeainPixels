import React, {useState, useEffect, useLayoutEffect, useRef} from 'react';
import {Text} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';

import BottomNav from './BottomNav'
import FillPixelScreen from '../scenes/FillPixelScreen'
import AddTrackerScreen from '../scenes/AddTrackerScreen'
import AddHabitScreen from '../scenes/AddHabitScreen';
import PixelScreen from '../scenes/PixelScreen'

import moment, { isMoment } from 'moment'
import TypeDisplaySelector from '../components/TypeDisplaySelector'
import { WHITE } from '../styles/colors';
import { getDisplayType } from '../db';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Stack = createStackNavigator();

function LogoTitle({childrenTitle}) {
    return (
      <Text style={{color: WHITE, fontWeight: '700', fontSize: 22}}>{childrenTitle || 'Year'}</Text>
    );
  }

export default function StackNav() {

    const viewYear = useRef()

    useEffect(() => {
        getDisplayType().then(type => viewYear.current = type)
    }, [])

    return(
        <Stack.Navigator initialRouteName='Year in Pixels'>
            <Stack.Screen name="Year in Pixels" component={BottomNav} initialParams={{type: viewYear}}
            options={({route}) => ({
                headerTitle: () => <LogoTitle childrenTitle={getFocusedRouteNameFromRoute(route)}/>,
                headerRight: () => (<TypeDisplaySelector childrenTitle={getFocusedRouteNameFromRoute(route)}/>)
            })}/>
            <Stack.Screen name="Fill Pixel" component={FillPixelScreen} initialParams={{ day: 30, mouth: "07", year: "2020" }} 
                options={({route}) => ({title: moment(route.params.year+'-'+route.params.mouth+'-'+route.params.day, 'YYYY-MM-DD').format("MMM Do YYYY")})}/>
            <Stack.Screen name="Pixel" component={PixelScreen} />
            <Stack.Screen name="Add tracker" component={AddTrackerScreen} />
            <Stack.Screen name="Add Habit" component={AddHabitScreen} />
        </Stack.Navigator>
    )
}