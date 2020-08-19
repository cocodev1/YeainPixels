import React, { useState } from 'react'
import {Text, StyleSheet, TouchableOpacity} from 'react-native'
import Checkbox from './Checkbox'
import { WHITE } from '../styles/colors'
import {addHabit, incrementNumberOfTimesHabitRule} from '../db'
import { useRoute } from '@react-navigation/native'

function Habit({children, checked, name, habit_rules_id}) {
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
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    habit: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20
    },
    text: {
        paddingLeft: 8,
        color: WHITE,
        fontSize: 22
    }
})

export default Habit