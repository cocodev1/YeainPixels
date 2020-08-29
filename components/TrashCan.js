import React from 'react'
import {TouchableOpacity} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { MEDIUM_GRAY, WHITE } from '../styles/colors'
import {connect} from 'react-redux'


function TrashCan({onPress, color}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <FontAwesome5 name="trash" size={26} color={color == MEDIUM_GRAY ? WHITE : color} />
        </TouchableOpacity>
    )
}
const mapStateToProps = (state) => {
    return {
        color: state.color
    }
}
export default connect(mapStateToProps)(TrashCan)