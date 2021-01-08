import React, {useEffect, useState, useMemo} from 'react'
import {View, Text, StyleSheet, FlatList} from 'react-native'
import Tracker from './Tracker'
import {getTrackersByDate, getRelativeTrackersByDate, addTracker, dropTables, createTables, getDb} from '../db'
import { useRoute, useNavigation } from '@react-navigation/native';
import AddTrackerButton from './AddButton'
import Title from './Title'
import moment from 'moment'

function Trackers({newTrackers, setNewTrackers, disabled}) {

    const route = useRoute()
    const navigation = useNavigation()

    const {day} = route.params
    const {mouth} = route.params
    const {year} = route.params

    const date = year.toString() + "-" + mouth.toString() + "-" + day.toString()

    const [trackers, setTrackers] = useState([])

    useEffect(() => {
        getRelativeTrackersByDate(date).then(trackers => { 
            setTrackers(trackers)
        })
    }, [newTrackers])

    var trackerComponents = []
    trackers.forEach(tr => {
        trackerComponents.push(<Tracker {...tr} key={tr.id} />)
    })

    return(
        <View style={style.mainContainer}>
            <View style={style.header}> 
                <Title>Your Trackers</Title>
                {!disabled ? <AddTrackerButton onPress={() => navigation.navigate('Add tracker', {day: day, mouth: mouth, year : '2020', setNewTrackers: setNewTrackers})}/> : null}
            </View>
            <View style={style.trackerList}>{trackerComponents}</View>
        </View>
    )
}

const style = StyleSheet.create({

    mainContainer: {
        margin: 20
    },  
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    trackerList: {
        flex: 1,
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: 'space-around',
        marginTop: 20
    }

})

export default Trackers