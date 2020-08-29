import React from 'react'
import {Image, Dimensions, View} from 'react-native'
import Lightbox from 'react-native-lightbox';

function ImageDisplayer({uri}) {

    return(
        <Lightbox renderContent={function() {
            return (
                <View style={{width: Dimensions.get('screen').width, height: Dimensions.get('screen').height}}>
                    <Image source={{uri: uri}} style={{resizeMode: 'contain', flex: 1}} />
                </View>
            )
        }}>
            <View style={{flexDirection: 'row', justifyContent: 'center', flex: 1}}>
                <Image source={{uri: uri}} style={{resizeMode: 'cover', width: 200, height: 200, borderRadius: 25}}/> 
            </View>
        </Lightbox>
    )

} 

export default ImageDisplayer