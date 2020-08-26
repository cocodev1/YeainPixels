import React from 'react'
import {View, StyleSheet, Text} from 'react-native'
import ActiveSwitch from './ActiveSwitch'
import {WHITE} from '../styles/colors'

function LineOption({defaultValue, onPressActive, onPressDesactive, children}) {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>{children}</Text>
            <ActiveSwitch defaultValue={defaultValue} onPressActive={onPressActive} onPressDesactive={onPressDesactive}/>
        </View>
    )
} 

const styles = StyleSheet.create({
    container: {
        margin: 16,
        justifyContent: 'space-between'
    },
    text: {
        color: WHITE,
        fontSize: 14
    }
})

export default LineOption