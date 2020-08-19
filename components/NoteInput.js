import React, {useState} from 'react'
import {View, TextInput, StyleSheet, KeyboardAvoidingView, Platform} from 'react-native'
import {WHITE, DARK_GRAY, MEDIUM_GRAY} from '../styles/colors'

const NoteInput = function({text , setText, placeholder}) {
    
    const [isFocused, setFocused] = useState(false)

    return(
        <KeyboardAvoidingView behavior="padding" behavior="position" keyboardVerticalOffset={10}>
                <View style={isFocused ? style.focused : undefined} />
                <View style={style.view}>
                    <TextInput style={style.textInput} placeholder={placeholder ? placeholder : "What happened ?"} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} onEndEditing={() => setFocused(false)} defaultValue={text} onChangeText={(text) => {setText(text)}}/>
                </View>
        </KeyboardAvoidingView>
    )

}

const style = StyleSheet.create({
    view: {
        borderWidth: 3,
        borderRadius: 15,
        borderColor: WHITE,
        marginTop: 30,
        marginLeft: 30,
        marginRight: 20,
        padding: 20,
    },
    textInput: {
        height: 20,
        fontSize: 20,
        fontWeight: '700',
        color: WHITE
    },
    focused: {
        position: "absolute",
        backgroundColor: DARK_GRAY,
        opacity: 0.99,
        top: -1000,
        left: 0,
        right: 0,
        bottom: 0,
    }
})

export default NoteInput