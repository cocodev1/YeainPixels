import React, { useEffect, useState } from 'react' 
import {TouchableOpacity, Text, StyleSheet, ActivityIndicator, Dimensions} from 'react-native'
import { MEDIUM_GRAY, WHITE } from '../styles/colors'
import {BoxShadow} from 'react-native-shadow'

function BigButton({onPress, color, children, loading}) {

    const styles = StyleSheet.create({
        container: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: color ? color : MEDIUM_GRAY,
            borderRadius: 50,
            marginLeft: 15,
            marginRight: 15,
            marginTop: 12,
            marginBottom: 20
        },
        text: {
            color: WHITE,
            fontSize: 25,
            fontWeight: "700",
            padding: 12
        }
    })

    return(
        <TouchableOpacity onPress={onPress} style={styles.container}>
            {loading ? <ActivityIndicator color={WHITE} size={30}/> : <Text style={styles.text}>{children}</Text>}
        </TouchableOpacity>
    )

}


export default  BigButton