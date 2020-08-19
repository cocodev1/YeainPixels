import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { WHITE } from '../../styles/colors'

function Note({children}) {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>{children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 20
    },
    text: {
        fontSize: 22,
        color: WHITE,
        padding: 20,
        textAlign: 'center'
    }
})

export default Note