import React, {memo, useMemo} from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { WHITE } from '../styles/colors'

function  Icon(props) {

    const styles = StyleSheet.create({
        icon: {
            padding: 10,
            opacity: props.selected ? 1 : 0.6
        }

    })

    return(
        <TouchableOpacity onPress={() => props.setSelected(props.iconName)}>
            <MaterialCommunityIcons name={props.iconName} color={WHITE} size={30} style={styles.icon}/>
        </TouchableOpacity>
    )

}

export default memo(Icon)