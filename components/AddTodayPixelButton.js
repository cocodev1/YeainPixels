import React from 'react'
import {TouchableOpacity, StyleSheet, Dimensions, View} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import {getDayByDate} from '../db'
import moment from 'moment'
import { WHITE, MEDIUM_GRAY, DARK_GRAY } from '../styles/colors'


function AddTodayPixelButton(props) {
    const navigation = useNavigation()
    const today = moment()
    const day = today.date()
    const mouth = today.format('MM') 
    const year = today.year()

    console.log(year, mouth, day)

    return(
        <View>
           {props.update != "" ? <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Fill Pixel', {day: day, mouth: mouth, year: year, update: props.update})}>
                <MaterialCommunityIcons name="pencil" size={24} color={WHITE} />
            </TouchableOpacity> : null}
        </View>
  
    )

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