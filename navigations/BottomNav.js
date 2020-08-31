import * as React from 'react';
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

    const year = moment().year()

    return(
        <Tab.Navigator initialRouteName={'Year'}
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
            inactiveTintColor: '#777777'
        }}>
            <Tab.Screen name="Year" component={type == 'year' ? YearScreen : type == 'mouth' ? MouthViewScreen : LoadingScreen} initialParams={{year: year}}/>
            <Tab.Screen name="Stats" component={StatScreen} initialParams={{year: moment().year()}}/>
            <Tab.Screen name="Account" component={ProfilScreen} />
        </Tab.Navigator>
    )
}