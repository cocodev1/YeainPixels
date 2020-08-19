import React from 'react'
import {View, StyleSheet} from 'react-native'
import mainStyle from '../styles/mixins'
import Emotion from './Emotion'
import Frown from '../assets/svgs/emoticon/emoticon-frown-outline.svg'
import Sad from '../assets/svgs/emoticon/emoticon-sad-outline.svg'
import Neutral from '../assets/svgs/emoticon/emoticon-neutral-outline.svg'
import Happy from '../assets/svgs/emoticon/emoticon-happy-outline.svg'
import Excited from '../assets/svgs/emoticon/emoticon-excited-outline.svg'
import * as colors from '../styles/colors'
import {connect} from 'react-redux'

var EmotionSelector = function(props) {
    return(
    <View style={style.container}>
        <View style={style.emotionContainer}>
            <Emotion emotion={4} color={colors.TURQUOISE} >
                    <Excited width={iconSize} height={iconSize} fill={props.emotionState == 4 ? colors.TURQUOISE : colors.WHITE}/>
            </Emotion>
            <Emotion emotion={3} color={colors.EMERALD}>
                <Happy width={iconSize} height={iconSize} fill={props.emotionState == 3 ? colors.EMERALD : colors.WHITE}/>
            </Emotion>
            <Emotion emotion={2} color={colors.PETER_RIVER}>
                <Neutral width={iconSize} height={iconSize} fill={props.emotionState == 2 ? colors.PETER_RIVER : colors.WHITE}/>
            </Emotion>
            <Emotion emotion={1} color={colors.PUMPKIN}>
                <Sad width={iconSize} height={iconSize} fill={props.emotionState == 1 ? colors.PUMPKIN : colors.WHITE}/>
            </Emotion>
            <Emotion emotion={0} color={colors.ALIZARIN} >
                <Frown width={iconSize} height={iconSize} fill={props.emotionState == 0 ? colors.ALIZARIN : colors.WHITE}/>
            </Emotion>
        </View>
    </View>
    )
}

const iconSize = 50

const style = StyleSheet.create({
    container: {
        ...mainStyle.bigContainer,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 20
    },
    emotionContainer: {
        flexDirection: "row",
    },

})

const mapStateToProps = (state) => {
    return {
        colorState: state.color,
        emotionState: state.emotion
    }
}
export default connect(mapStateToProps)(EmotionSelector)