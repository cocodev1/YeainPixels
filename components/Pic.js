import React from 'react'
import {TouchableOpacity, Image, Dimensions} from 'react-native'
import {addPic} from '../db'

function Pic({onPress, source, date}) {

    function press() {
        console.log(source, 'AAAAAA')
        onPress(source)
    }

    return(
        <TouchableOpacity onPress={press} style={{margin: 1}}>
            <Image source={{uri: source}} resizeMode='contain' style={{resizeMode: 'contain', width: (Dimensions.get('screen').width/4)-2, height: (Dimensions.get('screen').height/4)-2}} />
        </TouchableOpacity>
    )
}

export default Pic