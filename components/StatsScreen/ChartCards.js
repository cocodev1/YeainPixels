import React, { useEffect, useState } from 'react'
import {View, StyleSheet} from 'react-native'
import {getTrackerByYear} from '../../db'
import BezierChart from './BezierChart'
import ChartCard from './ChartCard'

function ChartCards({year}) {

    const [trackersSplit, setTrackersSplit] = useState([])

    useEffect(() => {
        getTrackerByYear(year)
            .then(trackers => {
                var trackersById = {}
                for(var tracker of trackers) {
                    if(!trackersById[tracker.tracker_rules_id]) {trackersById[tracker.tracker_rules_id] = []}
                    trackersById[tracker.tracker_rules_id].push(tracker)
                }
                var trackerObjs = []
                for(var trackerId in trackersById) {
                    var obj = {
                        name: trackersById[trackerId][0].name,
                        dateList: trackersById[trackerId].map(tracker => {return tracker.day}),
                        valueList: trackersById[trackerId].map(tracker => {return tracker.value})
                    }
                    trackerObjs.push(obj)
                }
                setTrackersSplit(trackerObjs.map(trackersSplitObj => <ChartCard title={trackersSplitObj.name} key={trackerObjs.indexOf(trackersSplitObj)}><BezierChart dateList={trackersSplitObj.dateList} valueList={trackersSplitObj.valueList}/></ChartCard>))
            })
    }, [])
    return(
        <View style={styles.container}>
            {trackersSplit}
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
