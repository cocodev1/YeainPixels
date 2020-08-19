import React, { memo } from 'react'
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native'
import { MEDIUM_GRAY, WHITE } from '../styles/colors'

function OptionSelector({selected, setSelected, children, width, style}) {

    return(
        <TouchableOpacity style={{...styles.container, width: width, ...style}} activeOpacity={0.9} onPress={() => setSelected(children)} >
            <View style={styles.radio}>
                { selected ? <View style={styles.selected}/> : null}
            </View>
            <Text style={styles.text}>{children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: MEDIUM_GRAY,
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 8,
        marginBottom: 20,
        borderRadius: 20,
    },
    radio: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: WHITE,
        justifyContent: 'center',
        alignItems: 'center'
    },
    selected: {
        height: 16,
        width: 16,
        borderRadius: 8,
        backgroundColor: WHITE,
    },
    text: {
        color: WHITE,
        fontSize: 18,
        paddingRight: 20,
        paddingLeft: 15
    }
})

export default memo(OptionSelector)