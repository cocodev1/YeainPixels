import React from 'react'
import {StyleSheet, View} from 'react-native'
import {connect} from 'react-redux'
import { WHITE, MEDIUM_GRAY } from '../styles/colors'

function Checkbox({checked, color, colorState, setStatus}) {
    const styles = StyleSheet.create({
        checkbox: {
            padding: 5,
            width: 30,
            height: 30,
            borderWidth: 2.5,
            borderColor: color ? color : colorState != MEDIUM_GRAY ? colorState : WHITE,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center'
            //backgroundColor: selected ? color != MEDIUM_GRAY ? color : WHITE : undefined
        },
        fill: {
            width: 20,
            height: 20,
            borderRadius: 5,
            backgroundColor: checked ? color ? color : colorState != MEDIUM_GRAY ? colorState : WHITE : undefined
        }
    })

    return (
        <View style={styles.checkbox}>
           {checked ? <View style={styles.fill} /> : null}
        </View>
    )
}


const mapStateToProps = (state) => {
    return {
        colorState: state.color
    }
}
export default connect(mapStateToProps)(Checkbox) 