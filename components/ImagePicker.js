import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text} from 'react-native'
import {MEDIUM_GRAY, WHITE} from '../styles/colors'
import {mainStyle} from '../styles'
import * as db from '../db'

export default function ImagePicker(props) {

    return(
        <View style={mainStyle.bigContainer}>
            <TouchableOpacity>
                <View style={styles.container}>
                    <Text style={styles.text}>
                        PickImage
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: MEDIUM_GRAY,
        width: 330,
        height: 180,
        marginTop: 10,
        borderRadius: 56
    },
    text: {
        color: WHITE,
        textAlign: 'center',
    }
})