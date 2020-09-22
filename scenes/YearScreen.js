import React, { useState } from 'react'
import { View, ScrollView } from 'react-native'
import Year from '../components/YearScreen/Year'
import MouthDisplay from '../components/YearScreen/MouthDisplay'
import AddTodayPixelButton from '../components/AddTodayPixelButton'

export default function YearScreen() {

    const [update, setUpdate] = useState({})

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