import React, { useState } from 'react'
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native'
import Checkbox from './Checkbox'
import { WHITE } from '../styles/colors'
import {addHabit, incrementNumberOfTimesHabitRule} from '../db'
import { useRoute } from '@react-navigation/native'
import TrashCan from './TrashCan'

function Habit({children, checked, name, habit_rules_id, deleteHabit}) {
    const route = useRoute()
    const {year} = route.params
    const {mouth} = route.params
    const {day} = route.params
    const date = year+'-'+mouth+'-'+day

    const [isCheked, setChecked] = useState(checked)

    function add() {
        setChecked(true)
        addHabit(date, habit_rules_id, name, 'done')
        incrementNumberOfTimesHabitRule(habit_rules_id)
    }

    return (
        <TouchableOpacity onPress={add} style={styles.habit}>
            <Checkbox checked={isCheked}/>
            <Text style={styles.text}>{children}</Text>
            <View style={{position: 'absolute', right: 8}}><TrashCan onPress={() => deleteHabit(habit_rules_id)} /></View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    habit: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
    },
    text: {
        paddingLeft: 8,
        color: WHITE,
        fontSize: 22
    }
})

export default Habit