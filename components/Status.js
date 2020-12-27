import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { WHITE } from '../styles/colors'

function Status({name, icon, onPress, actualStatus}) {
    return (
        <TouchableOpacity onPress={() => onPress(name, icon)} style={styles.container} key={() => ({name: name, icon: icon})}>
            <MaterialCommunityIcons name={icon} color={WHITE} size={30} style={styles.icon}/>
            <Text style={styles.text}>
                {name}
            </Text>
            <View style={styles.radio}>
                { name==actualStatus ? <View style={styles.selected}/> : null}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 10,
        marginLeft: 15
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        color: WHITE,
        marginRight: 'auto'
    },
    icon: {
        marginRight: 20
    },
    radio: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        right: 20,
        alignSelf: 'flex-end'
    },
    selected: {
        height: 16,
        width: 16,
        borderRadius: 8,
        backgroundColor: WHITE,
    }
})

export default Status
