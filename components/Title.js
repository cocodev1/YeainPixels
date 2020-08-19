import React from 'react'
import {Text, StyleSheet} from 'react-native'
import {WHITE} from '../styles/colors'

function Title({children, style}) {
    return(
        <Text style={{...styles.title, ...style}}>{children}</Text>
    )
}


const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        fontWeight: "700",
        color: WHITE
    }
})

export default Title