import React, { useRef, useState, useEffect, forwardRef } from "react";
import { View, TouchableOpacity, Text, TextInput, StyleSheet } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { DARK_GRAY, WHITE, MEDIUM_GRAY} from '../styles/colors'
import {updateTracker, addTracker} from '../db'

var SetTrackerValue = forwardRef((props, ref) =>  {

    const [text, setText] = useState('');
    function onSubmit() {
        ref.current.close()
        if(props.generated == false) {
            updateTracker(props.id, 1, text)
        }else {
            console.log(props)
            addTracker(props.name, props.icon, text, props.type, props.navDay, props.tracker_rules_id)
        }
        props.setValue(text)
        props.setUpdated(1)
    }

    function onSubmitSame() {
        ref.current.close()
        updateTracker(props.id, 1, props.value)
        props.setValue(props.value)
        props.setUpdated(1)
    }

    function onSubmitNotToday() {
        ref.current.close()
        updateTracker(props.id, 1, null)
        props.setValue("null")
        props.setUpdated(1)
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
                <View style={styles.optionContainer}>
                    <TouchableOpacity style={styles.optionButton} onPress={onSubmitSame}>
                            <Text style={styles.optionText}>Like last day</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionButton} onPress={onSubmitNotToday}>
                            <Text style={styles.optionText}>Not today</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="Type a value" style={styles.input} onChangeText={text => setText(text)} defaultValue={text} keyboardType='numeric' onSubmitEditing={onSubmit}/>
                    <TouchableOpacity style={styles.setButton} onPress={onSubmit}>
                        <Text style={styles.setButtonText}>Set</Text>
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
    },
    optionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    optionButton: {
        backgroundColor: MEDIUM_GRAY,
        borderRadius: 50,
        marginTop: 15,
        width: 170,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    optionText: {
        color: WHITE,
        fontSize: 16,
        fontWeight: '600',
        padding: 7
    }
})

export default SetTrackerValue