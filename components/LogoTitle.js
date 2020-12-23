import React, {useRef} from 'react'
import {TouchableOpacity, Text} from 'react-native'
import { connect } from 'react-redux'
import ChooseYear from '../components/ChooseYear'
import { WHITE } from '../styles/colors'

function LogoTitle({childrenTitle, year}) {

    const chooseYearActive = useRef()

    if(childrenTitle) {
        if(childrenTitle == 'Year') {

            return (
                <TouchableOpacity onPress={() => chooseYearActive.current.open()}>
                    <Text style={{color: WHITE, fontWeight: '700', fontSize: 22}}>{year + "˅"}</Text>
                    <ChooseYear ref={chooseYearActive}/>
                </TouchableOpacity>
            )
        }else {
            return (
                <Text style={{color: WHITE, fontWeight: '700', fontSize: 22}}>{childrenTitle}</Text>
            )
        }
    }
    return (
        <TouchableOpacity onPress={() => chooseYearActive.current.open()}>
            <Text style={{color: WHITE, fontWeight: '700', fontSize: 22}}>{year + "˅"}</Text>
            <ChooseYear ref={chooseYearActive}/>
        </TouchableOpacity>
    )
  }


export default connect(state => ({year: state.changeYearReducer.year}))(LogoTitle)