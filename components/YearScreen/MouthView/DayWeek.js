import React, { useState, useEffect, useCallback } from 'react'
import {TouchableOpacity, StyleSheet, Dimensions, Text} from 'react-native'
import {MEDIUM_GRAY, getColorByEmotion, WHITE} from '../../../styles/colors'
import moment from 'moment'
import {getDayByDate} from '../../../db'
import { useNavigation } from '@react-navigation/native'

function DayWeek({date, isToUpdate}) {
    
    const navigation = useNavigation()

    const size = (Dimensions.get('screen').width/7)-2

    function getMarginLeft() {
        const start = moment(date, 'YYYY-MM-DD').startOf('month')
        if(moment(date, 'YYYY-MM-DD').isSame(start)) {
            const weekNumber = start.weekday()
            if(weekNumber != 0) {
                return (size+2) * (weekNumber-1)
            }else {
                return (size+2) * (6)
            }
        }else {
            return 0
        }
    }

    const [update, setUpdate] = useState(null)
    const [day, setDay] = useState(null)
    const [color, setColor] = useState(null)

    useEffect(() => {
        getDayByDate(date).then(newDay => {
            if(newDay) {
                setDay(newDay)
            }
        })
    }, [isToUpdate, update])

    useEffect(() => {
        if(day) {
            setColor(getColorByEmotion(day.emotion))
        }else {
            setColor(MEDIUM_GRAY)
        }
    }, [day])

    function getNav() {
        const dateArray = date.split('-')
        const year = dateArray[0]
        const mouth = dateArray[1]
        const d = dateArray[2]
        if(day) {
            navigation.navigate('Pixel', {year: year, mouth: mouth, day: d})
        }else{
            navigation.navigate('Fill Pixel', {year: year, mouth: mouth, day: d, update: setUpdate})
        }
    }

    const styles = StyleSheet.create({
        dayWeek: {
            width: size,
            height: size,
            margin: 1,
            marginLeft: getMarginLeft() + 1,
            backgroundColor: color
        }
    })

    return(
        <TouchableOpacity style={styles.dayWeek} onPress={getNav}>
            <Text style={{margin: 4, color: WHITE}}>{date.split('-')[2]}</Text>
        </TouchableOpacity>
    )

}

export default DayWeek 