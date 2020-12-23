import React from 'react'
import {TouchableOpacity, View, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {MEDIUM_GRAY} from '../styles/colors'
import changeColor from '../redux/actions/changeColor'
import mainStyle from '../styles/mixins'

var Emotion = function(props) {

    const _changeColor = function() {
        props.dispatch(changeColor(props.color, props.emotion))
    }

    const _changeColorToNull = function() {
        props.dispatch(changeColor(MEDIUM_GRAY, null))
    }

    if(props.emotionState != props.emotion) {
        return(
            <View>
                <TouchableOpacity onPress={() => _changeColor()} style={style.emotion}>
                    {props.children}
                </TouchableOpacity>
            </View>
        )
    }else {
        return(
            <TouchableOpacity style={{...style.emotion, borderColor: props.color}} onPress={() => _changeColorToNull()}>
                {props.children}
            </TouchableOpacity>
        )
    }
}

const style = StyleSheet.create({
    emotion: {
        borderWidth: 2,
        borderRadius: 500,
        shadowColor: "blue"
    }
})

const mapStateToProps = (state) => {
    return {
        colorState: state.colorReducer.color,
        emotionState: state.colorReducer.emotion
    }
}
export default connect(mapStateToProps)(Emotion)