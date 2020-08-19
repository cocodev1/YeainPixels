import React, { useState } from 'react'
import { View, ScrollView } from 'react-native'
import NoteInput from '../components/NoteInput'
import InputTypeName from '../components/InputTypeName'
import WhichDay from '../components/HabitScreen/WhichDay'
import Objective from '../components/HabitScreen/Objective'
import BigButton from '../components/BigButton'
import { MEDIUM_GRAY } from '../styles/colors'
import {addHabitRule} from '../db'


function AddHabitScreen({route, navigation}) {
    const {year} = route.params
    const {mouth} = route.params
    const {day} = route.params
    const date = year+'-'+mouth+'-'+day
    const {setUptdateHabit} = route.params

    const [name, setName] = useState('')
    const [repeat, setRepeat] = useState({})
    const [objective, setObjective] = useState({})
    const [selected, setSelected] = useState('')

    function add() {
        var option = JSON.stringify({day: repeat, objective: objective})
        addHabitRule(name, date, option)
        setUptdateHabit(option)
        navigation.goBack()
    }

    return(
        <ScrollView>
            <InputTypeName text={name} setText={setName}/>
            <WhichDay repeat={repeat} setRepeat={setRepeat}/>
            <Objective objective={objective} setObjective={setObjective} repeat={repeat}/>
            <BigButton color={MEDIUM_GRAY} onPress={add}>Done</BigButton>
        </ScrollView>
    )
}

export default AddHabitScreen