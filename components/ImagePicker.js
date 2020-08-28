import React, {useEffect, useState} from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image} from 'react-native'
import {MEDIUM_GRAY, WHITE} from '../styles/colors'
import {mainStyle} from '../styles/mixins'
import {addPic} from '../db'

export default function ImagePicker({pic, date, onPress}) {

    const [uri, setUri] = useState(pic)

    useEffect(() => {
        addPic(date, pic)
        setUri(pic)
    }, [pic])

    return(
        <View style={mainStyle.bigContainer}>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.container}>
                    {uri ? 
                    <Image source={{uri: uri}} resizeMode='contain'/> : 
                    <Text style={styles.text}>
                        PickImage
                    </Text>}
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: MEDIUM_GRAY,
        width: 330,
        height: 180,
        marginTop: 10,
        borderRadius: 56
    },
    text: {
        color: WHITE,
        textAlign: 'center',
    }
})