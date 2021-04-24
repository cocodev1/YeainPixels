import React, {useEffect, useState} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import moment from 'moment'
import { FontAwesome5 } from '@expo/vector-icons'; 

import {YearScreen, StatScreen, ProfilScreen} from '../scenes/'
import { WHITE, MEDIUM_GRAY } from '../styles/colors';
import MouthViewScreen from '../scenes/MouthViewScreen';
import LoadingScreen from '../scenes/LoadingScreen';

const Tab = createBottomTabNavigator();

export default function BottomNav({route, navigation}) {
    const {type} = route.params
    const {year} = route.params

    const [y, setY] = useState(year)

    useEffect(() => {
        console.log(year)
        navigation.setParams({...route.params, year})
        setY(year)
    }, [year])

    return(
        <Tab.Navigator initialRouteName={'Stats'}
        screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
                let iconName
                
                if(route.name == "Year") {
                    iconName = 'calendar-alt'
                }else if(route.name == 'Stats') {
                    iconName = 'chart-area'
                }else if(route.name == 'Account') {
                    iconName = 'user'
                }
                return <FontAwesome5 name={iconName} size={size} color={color}/>
            }
        })}
        tabBarOptions={{
            activeTintColor: WHITE,
            inactiveTintColor: '#777777',
            showLabel: false
        }}>
            <Tab.Screen name="Year" component={type == 'year' ? YearScreen : type == 'mouth' ? MouthViewScreen : LoadingScreen} initialParams={{year: y}}/>
            <Tab.Screen name="Stats" component={StatScreen} initialParams={{year: moment().year()}}/>
            <Tab.Screen name="Account" component={ProfilScreen} />
        </Tab.Navigator>
    )
}