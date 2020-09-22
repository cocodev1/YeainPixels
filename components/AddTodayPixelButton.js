import React, { useState, useEffect } from 'react'
import {TouchableOpacity, StyleSheet, Dimensions, View} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import {getDayByDate} from '../db'
import moment from 'moment'
import { WHITE, MEDIUM_GRAY, DARK_GRAY } from '../styles/colors'
import {BoxShadow} from 'react-native-shadow'


function AddTodayPixelButton({update, isUpdate}) {

    const [isVisible, setVisible] = useState(true)

    const navigation = useNavigation()
    useEffect(() => {
        getDayByDate(moment().format('YYYY-M-D')).then(day => {
            if(day) {
                setVisible(false)
            }
            else {
                setVisible(true)
            }

        })
    }, [isUpdate])

    const today = moment()
    const day = today.format('D')
    const mouth = today.format('M') 
    const year = today.year()
    function open() {
        navigation.navigate('Fill Pixel', {day: day, mouth: mouth, year: year, update: update})
    }
    if(isVisible) {
        return(
            <TouchableOpacity style={styles.container} onPress={open}>
                <MaterialCommunityIcons name="pencil" size={24} color={WHITE} />
            </TouchableOpacity>
        )
    }else {
        return (
            <View />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: 55,
        height: 55,
        position: 'absolute',
        bottom: 35,
        right: 35,
        zIndex: 2,
        backgroundColor: MEDIUM_GRAY,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
    }
})

const shadowOpt = {
    width: 55,
    height: 55,
    color: DARK_GRAY,
    border: 5,
    radius: 50,
    opacity: 0.40,
    x: 6,
    y: 6,
    style: styles.container,
  }


export default AddTodayPixelButton