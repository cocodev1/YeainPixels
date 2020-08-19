import React from 'react'
import {Dimensions, FlatList, StyleSheet, Text} from 'react-native'
import { DARK_GRAY, WHITE } from '../../../styles/colors'

const names = ['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((name, index) => {return {index: index, name: name}})
const size = (Dimensions.get('screen').width/7)-2

function WeekNameDisplay() {

    return (
        <FlatList 
        data={names}
        horizontal
        renderItem={({item}) => <Text key={item.index} style={styles.text}>{item.name}</Text>}/>
    )

}

const styles = StyleSheet.create({
    text: {
        margin: 1,
        width: size,
        height: size,
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: DARK_GRAY,
        color: WHITE,
        fontSize: 16    
    }
})

export default WeekNameDisplay