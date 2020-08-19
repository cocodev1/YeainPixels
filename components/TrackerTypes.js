import React, {useState, useEffect, useRef, useCallback} from 'react'
import {View, StyleSheet, TouchableOpacity, TextInput, Text} from 'react-native'
import OptionSelector from '../components/OptionSelector'
import { WHITE, MEDIUM_GRAY } from '../styles/colors'
import Title from './Title'
import AddButton from './AddButton'
import AddType from './AddType'
import {getTypes, addType} from '../db'

function TrackerTypes({types, reloadTypes, actualType, setActualType}) {

    const refRBSheet = useRef();

    var typeElements = []

    var setActualTypeCallback = useCallback((typeEl) => {
        return setActualType(typeEl)
    }, [])


    types.forEach(typeEl => {
        typeElements.push(<OptionSelector width={120} setSelected={setActualTypeCallback} selected={actualType == typeEl}>{typeEl}</OptionSelector>)
    })

    function addNewType(type) {
        addType(type)
        reloadTypes()
    }

    return(
        <View>
            <View style={styles.containerType}>
                <View style={styles.containerTypeHeader}>
                    <Title>Tracker's  type </Title>
                    <AddButton color={MEDIUM_GRAY} onPress={() => {refRBSheet.current.open()}}/>
                </View>
                <View style={styles.container}>
                        {typeElements}
                </View>
            </View> 
            <AddType ref={refRBSheet} addType={(typeName) => addNewType(typeName)}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: 'space-around',
        marginLeft: 50,
        marginRight: 50,
        marginTop: 0
    },
    containerType: {
        marginTop: 15,
    },  
    containerTypeHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 34,
        marginRight: 34,
        marginBottom: 15
    }
})

export default TrackerTypes