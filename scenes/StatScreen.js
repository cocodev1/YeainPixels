import React, {useEffect} from 'react'
import AvgMood from '../components/StatsScreen/AvgMood'
import { View, Text } from 'react-native'
import { WHITE } from '../styles/colors'
import ChartCards from '../components/StatsScreen/ChartCards'

export default function StatScreen({route, navigation}) {

    const { year } = route.params

    return(
        <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <AvgMood />
            <Text style={{color: WHITE, fontSize: 22}}>More Stats comming soon !</Text>
            <ChartCards year={year} />
        </View>
    )
}