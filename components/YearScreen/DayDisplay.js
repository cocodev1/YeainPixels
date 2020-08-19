import React from 'react'
import {FlatList} from 'react-native'
import PixelDisplayer from './PixelDisplayer'

function DayDisplay() {
    const nums = Array.from(Array(32).keys()).filter(num => num != 0)

    return (
        <FlatList 
        data={nums}
        renderItem={({item}) => <PixelDisplayer>{item.toString()}</PixelDisplayer>}
        style={{alignSelf: 'flex-start'}}
        />
    )
}

export default DayDisplay