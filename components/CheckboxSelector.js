import React from 'react'
import { TouchableOpacity, StyleSheet, Text } from 'react-native'
import Checkbox from './Checkbox'
import { WHITE } from '../styles/colors'

function CheckboxSelector({chekced, setCheked, children, style, color}) {

    return(
        <TouchableOpacity style={{...styles.container, ...style}} onPress={() => setCheked(children)}>
            <Checkbox checked={chekced} color={color}/>
            <Text style={styles.text}>{children}</Text>
        </TouchableOpacity>

    )

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: "center",
        flexWrap: 'nowrap',
        alignItems: 'center'
    },
    text: {
        paddingLeft: 10,
        color: WHITE,
        fontSize: 16
    }
})

export default CheckboxSelector