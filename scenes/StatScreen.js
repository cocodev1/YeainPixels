import React, {useEffect} from 'react'
import AvgMood from '../components/StatsScreen/AvgMood'
import { View, Text } from 'react-native'
import { WHITE } from '../styles/colors'

export default function StatScreen() {

    return(
        <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <AvgMood />
            <Text style={{color: WHITE, fontSize: 22}}>More Stats comming soon !</Text>
        </View>
    )
}