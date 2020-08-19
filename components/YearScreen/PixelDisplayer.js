import React from 'react'
import {Text, StyleSheet, Dimensions} from 'react-native'
import { DARK_GRAY, WHITE, MEDIUM_GRAY } from '../../styles/colors'

function PixelDisplayer({children}) {
    return(
        <Text style={styles.pixel}>
            {children}
        </Text>
    )
}


const styles = StyleSheet.create({
    pixel: {
        width: (Dimensions.get('screen').width/13)-2,
        height: (Dimensions.get('screen').width/13)-2,
        margin: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: WHITE,
    }
})

export default PixelDisplayer