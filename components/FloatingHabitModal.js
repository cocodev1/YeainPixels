import React, {useState, useEffect} from 'react'
import {Text, TouchableOpacity, StyleSheet, FlatList, View} from 'react-native'
import Icon from './Icon'
import {getAllStatus} from '../db'
import { MEDIUM_GRAY, WHITE } from '../styles/colors'

function ModalStatusLine({name, children, add}) {
    return(
        <TouchableOpacity onPres={add} style={{flexDirection: 'row'}}>
            <Icon iconName={name} selected={true} padding={0}/> 
            <Text style={styles.text}>{children}</Text>
        </TouchableOpacity>
    )
}

function FloatingHabitModal({add}) {

    const [allStatus, setAllStatus] = useState([])

    useEffect(() => {
       getAllStatus().then(all => setAllStatus(all))
    }, [])

    return(
        <View>
            <FlatList 
            style={styles.container}
            data={allStatus}
            keyExtractor={(item) => toString(allStatus.indexOf(item))}
            renderItem={({item}) => 
                <ModalStatusLine name={item.icon} add={() => add(item.name)}>{item.name}</ModalStatusLine>}
                />
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: MEDIUM_GRAY,
        top: -30,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 5,
        paddingBottom: 5,
    },
    text: {
        color: WHITE,
        fontSize: 25,
        paddingLeft: 5
    }

})

export default FloatingHabitModal