import React, { useState } from 'react'
import { View, ScrollView } from 'react-native'
import Year from '../components/YearScreen/Year'
import MouthDisplay from '../components/YearScreen/MouthDisplay'
import AddTodayPixelButton from '../components/AddTodayPixelButton'
import { useFocusEffect } from '@react-navigation/native'
import * as Segment from 'expo-analytics-segment'

function YearScreen() {

    const [update, setUpdate] = useState({})

    useFocusEffect(() => {
        Segment.screen('Year Screen')
    })

    return(
        <View>
            <MouthDisplay />
            <AddTodayPixelButton update={setUpdate} isUpdate={update}/>
            <ScrollView>
                <Year update={update} setUpdate={setUpdate}/>
            </ScrollView>
        
        </View>
    )
}

export default YearScreen