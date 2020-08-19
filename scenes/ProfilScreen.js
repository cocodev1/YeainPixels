import React from 'react'
import { View, Text } from 'react-native'
import { WHITE } from '../styles/colors'

export default function ProfilScreen() {
    return(
        <View style={{justifyContent: 'center', alignItems: 'center', textAlign: 'center', bottom: 0, top: 0, left: 0, right: 0, position: 'absolute'}}>
            <Text style={{fontSize: 35, color: WHITE, textAlign: 'center'}}>Comming soon</Text>
        </View>
    )
}