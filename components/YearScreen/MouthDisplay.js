import React from 'react'
import { FlatList } from 'react-native'
import PixelDisplayer from './PixelDisplayer'

function MouthDisplay() {
    const mouths = ['', 'J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'].map((mouth, index) => mouth = {index: index, mouth: mouth })
    return (
        <FlatList 
        data={mouths}
        horizontal
        renderItem={({item}) => <PixelDisplayer key={item.index}>{item.mouth}</PixelDisplayer>}
        />
    )
}

export default MouthDisplay