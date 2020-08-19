import React from 'react'
import {StyleSheet, View, ActivityIndicator} from 'react-native'
import { WHITE } from '../styles/colors'

function LoadingScreen() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size='large' color={WHITE}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        top: 0,
        bottom: 0,
        alignItems: 'center'
    }
})

export default LoadingScreen