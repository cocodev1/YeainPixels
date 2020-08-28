import React, {useEffect, useState} from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image} from 'react-native'
import {MEDIUM_GRAY, WHITE} from '../styles/colors'
import {mainStyle} from '../styles/mixins'
import {addPic} from '../db'

export default function ImagePicker({pic, date, onPress}) {

    const [uri, setUri] = useState(pic)

    useEffect(() => {
        setUri(pic)
    }, [pic])

    return(
        <View style={mainStyle.bigContainer}>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.container}>
                    {uri ? 
                    <Image source={{uri: uri}} style={{resizeMode: 'cover', width: 200, height: 200, borderRadius: 25}}/> : 
                    <Text style={styles.text}>
                        Pick an Image
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
        marginTop: 10,
        borderRadius: 56
    },
    text: {
        color: WHITE,
        backgroundColor: MEDIUM_GRAY,
        textAlign: 'center',
        padding: 100,
        borderRadius: 20,
        borderWidth: 2
    }
})