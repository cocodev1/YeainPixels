import React, {useLayoutEffect, useEffect, useState} from 'react'
import {Text, View, StyleSheet} from 'react-native'
import {getAllMoods} from '../../db'
import { WHITE } from '../../styles/colors'
import { useRoute, useNavigation } from '@react-navigation/native'

function AvgMood() {

    const navigation = useNavigation()

    const [avg, setAvg] = useState('')

    const route = useRoute()

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