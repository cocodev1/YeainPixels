import React, {memo, useMemo} from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { WHITE } from '../styles/colors'

function  Icon({setSelected, iconName, selected, padding}) {

    const styles = StyleSheet.create({
        icon: {
            padding: padding == undefined ? 10 : padding,
            opacity: selected ? 1 : 0.6
        }

    })

    return(
        <TouchableOpacity onPress={() => setSelected(iconName)}>
            <MaterialCommunityIcons name={iconName} color={WHITE} size={30} style={styles.icon}/>
        </TouchableOpacity>
    )

}

export default memo(Icon)