import React from 'react'
import { View, ScrollView } from 'react-native'
import Year from '../components/YearScreen/Year'
import MouthDisplay from '../components/YearScreen/MouthDisplay'
import AddTodayPixelButton from '../components/AddTodayPixelButton'

export default function YearScreen() {
    return(
        <View>
            <MouthDisplay />
            <AddTodayPixelButton update={''}/>
            <ScrollView>
                <Year />
            </ScrollView>
        </View>
    )
}