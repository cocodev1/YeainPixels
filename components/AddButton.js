import React from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'; 
import {WHITE} from '../styles/colors'
import {connect} from 'react-redux'
import { useNavigation } from '@react-navigation/native';

function AddTrackerButton(props) {

    const style = StyleSheet.create({
        back: {
            backgroundColor: props.color ? props.color : props.colorState,
            borderRadius: 50,
            width: 40,
            height: 40,
            alignItems: "center",
            textAlignVertical: 'center',
            justifyContent: 'center'
        }
    })

    return(
        <TouchableOpacity style={style.back} onPress={props.onPress}>
            <FontAwesome5 name="plus" size={20} color={WHITE} />
        </TouchableOpacity>
    )

}

const mapStateToProps = (state) => {
    return {
        colorState: state.color
    }
}
export default connect(mapStateToProps)(AddTrackerButton)