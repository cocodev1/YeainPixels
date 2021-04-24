import React, { useEffect, useState } from 'react'
import {View, StyleSheet} from 'react-native'
import {getTrackers} from '../../db'
import ChartCard from './ChartCard'

function ChartCards({year}) {

    const [trackers, setTrackers] = useState([])

    useEffect(() => {
        const run = async () => {
            setTrackers(await getTrackers())
        }
        run()
    }, [])

    return(
        <View style={styles.container}>
            {trackers.map(tracker => <ChartCard data={tracker} title={tracker[0].name}/>)}
        </View> 
    )
}

const styles = StyleSheet.create({
    container: {
        left: 0,
        right: 0,
        flex: 1,
        backgroundColor: 'red',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    }
})

export default ChartCards
