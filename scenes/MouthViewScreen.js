import React, { useState } from 'react'
import {FlatList} from 'react-native'
import MouthWeekView from '../components/YearScreen/MouthView/MouthWeekView'
import WeekNameDisplay from '../components/YearScreen/MouthView/WeekNameDisplay'
import AddTodayPixelButton from '../components/AddTodayPixelButton'
import moment from 'moment'
import { useStore } from 'react-redux'

function MouthViewScreen({route, navigation}) {

    const mouths = Array.from(Array(13).keys()).filter(mouth => mouth != 0)

    const {year} = route.params

    const [isToUpdate, setToUpdate] = useState({})

    return(
        <>  
            <WeekNameDisplay update={setToUpdate}/>
            <AddTodayPixelButton isUpdate={isToUpdate} update={() => {setToUpdate('yes')}}/>
            <FlatList 
            data={mouths}
            renderItem={({item}) => <MouthWeekView year={year} mouth={item} key={item} isToUpdate={isToUpdate}/>}
            initialScrollIndex={moment().format('M')-1}/>
        </>
    )
}

export default MouthViewScreen