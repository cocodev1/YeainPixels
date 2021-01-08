import React, {useEffect, useRef, useState} from 'react'
import {TouchableOpacity, Text, View, ActivityIndicator, StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import ChooseYear from '../components/ChooseYear'
import { WHITE } from '../styles/colors'

function Loader() {
    return (
        <View style={styles.container}>
            <ActivityIndicator color={WHITE} size='large'/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1,
        justifyContent: 'center',
        top: 0,
        bottom: 0,
        alignItems: 'center'
    }
})

function LogoTitle({childrenTitle, year}) {

    const chooseYearActive = useRef()

    if(childrenTitle) {
        if(childrenTitle == 'Year') {

            return (
                <TouchableOpacity onPress={() => {chooseYearActive.current.open()}}>
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
        <TouchableOpacity onPress={() => {chooseYearActive.current.open()}}>
            <Text style={{color: WHITE, fontWeight: '700', fontSize: 22}}>{year + "˅"}</Text>
            <ChooseYear ref={chooseYearActive}/>
        </TouchableOpacity>
    )
  }


export default connect(state => ({year: state.changeYearReducer.year}))(LogoTitle)