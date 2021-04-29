import React, {useLayoutEffect, useEffect, useState} from 'react'
import {Text, View, StyleSheet, Dimensions} from 'react-native'
import {getAllMoods} from '../../db'
import { MEDIUM_GRAY, WHITE } from '../../styles/colors'
import { useRoute, useNavigation } from '@react-navigation/native'
import {Svg, Line, Circle} from 'react-native-svg'
import * as d3 from 'd3'
import _ from 'lodash'
import {ALIZARIN, PUMPKIN, PETER_RIVER, EMERALD, TURQUOISE} from '../../styles/colors'

function AvgMood() {

    const colors =  [ALIZARIN, PUMPKIN, PETER_RIVER, EMERALD, TURQUOISE]

    const WIDTH = Dimensions.get('screen').width
    const HEIGHT = 70
    const MARGIN = 100
    const navigation = useNavigation()

    const [avg, setAvg] = useState(0)

    const route = useRoute()

    const x = d3.scaleLinear()
        .domain([0, 4])
        .range([0, WIDTH-MARGIN])

    useLayoutEffect(() => {
        getAllMoods(route.params.year).then(moods => {
            setAvg(moods.map(mood => mood = mood+1).reduce((previous, current) => previous+current)/moods.length-1)
        })
    }, [])

    useEffect(() => {
        const focus = navigation.addListener('focus', () => {
            getAllMoods(route.params.year).then(moods => {
                setAvg(moods.map(mood => mood = mood+1).reduce((previous, current) => previous+current)/moods.length-1)
            })
        })
        return focus
    }, [navigation])

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Mood of the year</Text>
            <Text style={styles.avgText}>{Math.round(avg*100)/100}</Text>
            <Svg width={WIDTH-MARGIN} height={HEIGHT}>
                {colors.map((color, i) => <Line x1={(WIDTH-MARGIN)/5*i} x2={(WIDTH-MARGIN)/5*(i+1)} y1={HEIGHT/2} y2={HEIGHT/2} strokeLinejoin={'round'} stroke={color} strokeWidth={5}/>)}
                <Circle cx={x(avg)} cy={HEIGHT/2} r={8} fill={MEDIUM_GRAY}/>
            </Svg>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
    },
    text: {
        color: WHITE,
        fontSize: 22,
    },
    avgText: {
        marginTop: 10,
        color: WHITE,
        fontSize: 28,
        fontWeight: '700'
    }
})

export default AvgMood