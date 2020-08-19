import React, {useState, useEffect} from 'react'
import {TextInput, View, Text, StyleSheet, ScrollView, KeyboardAvoidingView} from 'react-native'
import OptionSelector from '../components/OptionSelector'
import TrackerTypes from '../components/TrackerTypes'
import {getTypes, addType} from '../db'
import InputTypeName from '../components/InputTypeName'
import Icons from '../components/Icons'
import BigButton from '../components/BigButton'
import {addTracker, addTrackerRule} from '../db'

function AddTrackerScreen({route, navigation}) {

    const [types, setTypes] = useState([])

    const [actualType, setActualType] = useState('')
    const [text, setText] = useState('')
    const [iconName, setIconName] = useState('')

    const {day} = route.params
    const {mouth} = route.params
    const {year} = route.params
    const {setNewTrackers} = route.params

    useEffect(() => {
        getTypes().then(dbTypes => {
            setTypes(dbTypes)
        })
    }, [])

    function reloadType() {
        getTypes().then(dbTypes => {
            setTypes(dbTypes)
        })
    }

    function add() {
        addTrackerRule(text, iconName, actualType, year+'-'+mouth+'-'+day)
        navigation.goBack() 
        setNewTrackers({text, actualType})
    }

    return(
        <ScrollView>
            <InputTypeName text={text} setText={setText}/>
            <TrackerTypes types={types} actualType={actualType} setActualType={(type) => setActualType(type)} reloadTypes={reloadType}/>
            <Icons iconName={iconName} setIconName={setIconName}/>
            <BigButton onPress={add}>Done</BigButton>
        </ScrollView>

    )

}

export default AddTrackerScreen