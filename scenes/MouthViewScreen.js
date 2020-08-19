import React from 'react'
import {FlatList} from 'react-native'
import MouthWeekView from '../components/YearScreen/MouthView/MouthWeekView'
import moment from 'moment'

function MouthViewScreen({route, navigation}) {

    const mouths = Array.from(Array(13).keys()).filter(mouth => mouth != 0)

    const {year} = route.params

    return(
        <>  
            <WeekNameDisplay />
            <FlatList 
            data={mouths}
            renderItem={({item}) => <MouthWeekView year={year} mouth={item} key={item}/>}
            initialScrollIndex={moment().format('M')-1}/>
        </>
    )
}
import WeekNameDisplay from '../components/YearScreen/MouthView/WeekNameDisplay'

export default MouthViewScreen