import React, {memo} from 'react'
import {TouchableOpacity, Dimensions, StyleSheet, View, Text} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { WHITE } from '../../styles/colors'

function Pixel({color, year, mouth, day, isClickable, display, update}) {

    const navigation = useNavigation()

    const styles = StyleSheet.create({
        pixel: {
            width: (Dimensions.get('screen').width/13)-2,
            height: (Dimensions.get('screen').width/13)-2,
            margin: 1,
            backgroundColor: color,
            justifyContent: 'center',
            alignItems: 'center',
            color: WHITE
        }
    })

    function getNavigate() {
        if(display) {
            return navigation.navigate('Pixel', {year: year, mouth: mouth, day: day})
        }else {
            return navigation.navigate('Fill Pixel', {year: year, mouth: mouth, day: day, update: update})
        }
    }

    if(isClickable ==  true) {
        return(
            <TouchableOpacity style={styles.pixel} onPress={getNavigate} disabled={!isClickable}>
            </TouchableOpacity>
        )
    }else {
        return(
            <View style={{...styles.pixel}}>
                <Text style={{color: 'green'}}></Text>
            </View>
        )
    }
}



export default memo(Pixel)