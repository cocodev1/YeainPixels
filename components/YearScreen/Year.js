import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useRoute } from '@react-navigation/native'
import Mouth from './Mouth'
import {getDaysByYear} from '../../db'
import DayDisplay from './DayDisplay'
import AddTodayPixelButton from '../AddTodayPixelButton'

function Year() {

    const route = useRoute()

    const {year} = route.params

    const [days, setDays] = useState([])

    const [update, setUpdate] = useState({})

    useEffect(() => {
        getDaysByYear(year).then(newDays => setDays(newDays))
    }, [update])

    const nums = Array.from(Array(13).keys()).filter(num => num != 0)

    return(
        <View>
            <View style={styles.container}>
                <DayDisplay />
                <FlatList 
                    data={nums}
                    keyExtractor={(num) => num.toString()}
                    horizontal
                    renderItem={({item}) => <Mouth 
                        days={days} 
                        mouth={item}
                        year={year}
                        update={setUpdate}
                        />}
                    scrollEnabled={false}
                    contentContainerStyle={{paddingBottom: (Dimensions.get('screen').width/13)-2}}/>
            </View>
            <AddTodayPixelButton update={setUpdate}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    }
})

export default Year