import React from 'react'
import {View, TextInput, Text, StyleSheet} from 'react-native'
import { WHITE } from '../styles/colors'


function InputTypeName({text, setText}) {
    return(
        <View style={styles.nameContainer}>
            <Text style={styles.nameLabel}>Name</Text>
            <View style={styles.nameInput}>
                <TextInput style={styles.nameTextInput} placeholder="Type name" onChangeText={text => setText(text)} defaultValue={text}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    nameContainer: {
        marginLeft: 24,
        marginRight: 60,
        flexDirection: 'column'
    },
    nameLabel: {
        color: WHITE,
        fontSize: 20,
        marginLeft: 10,
        marginBottom: 8,
        fontWeight: "700"
    },
    nameInput: {
        borderColor: WHITE,
        borderWidth: 2,
        borderRadius: 15,
        padding: 3,
    },
    nameTextInput: {
        height: 40,
        fontSize: 18,
        paddingLeft: 15,
        color: WHITE
    }
})

export default InputTypeName