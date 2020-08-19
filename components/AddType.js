import React, { useRef, useState, useEffect, forwardRef } from "react";
import { View, TouchableOpacity, Text, TextInput, StyleSheet, Keyboard } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { DARK_GRAY, WHITE, MEDIUM_GRAY} from '../styles/colors'
import {addType} from '../db'

var SetTrackerValue = forwardRef((props, ref) =>  {

    const [text, setText] = useState('');

    function onSubmit() {
        ref.current.close()
        props.addType(text)
        Keyboard.dismiss()
    }

    return (
        <RBSheet
        ref={ref}
        closeOnPressMask={true}
        height={135}
        customStyles={{
            wrapper: {
            },
            container: {
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                backgroundColor: DARK_GRAY,
                opacity: 1
            },
        }}
        >
            <View>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="Type a value" style={styles.input} onChangeText={text => setText(text)} defaultValue={text} onSubmitEditing={onSubmit}/>
                    <TouchableOpacity style={styles.setButton} onPress={onSubmit}>
                        <Text style={styles.setButtonText}>Add</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </RBSheet>
  )
})

const styles = StyleSheet.create({
    inputContainer: {
        borderWidth: 3,
        borderColor: WHITE,
        borderRadius: 50,
        margin: 15,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 55
    },
    input: {
        fontSize: 18,
        marginLeft: 18,
        color: WHITE
    },
    setButton: {
        borderRadius: 50,
        backgroundColor: MEDIUM_GRAY,
        height: 38,
        width: 80,
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    setButtonText: {
        color: WHITE,
        fontWeight: '700',
        fontSize: 18
    }
})

export default SetTrackerValue