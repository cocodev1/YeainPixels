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
        marginTop: 8,
        marginBottom: 8,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    text: {
        color: WHITE,
        fontSize: 22
    }
})

export default LineOption