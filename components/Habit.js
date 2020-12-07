import React, { useState } from 'react'
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native'
import ActiveSwitch from './ActiveSwitch'
import Checkbox from './Checkbox'
import { WHITE } from '../styles/colors'
import {addHabit, incrementNumberOfTimesHabitRule, changeActiveHabit} from '../db'
import { useRoute } from '@react-navigation/native'
import TrashCan from './TrashCan'
import FloatingHabitModal from './FloatingHabitModal'

function Habit({children, checked, name, habit_rules_id, active, deleteHabit}) {

    const route = useRoute()
    const {year} = route.params
    const {mouth} = route.params
    const {day} = route.params
    const date = year+'-'+mouth+'-'+day

    const [isCheked, setChecked] = useState(checked)
    const [isActive, setActive] = useState(active)

    const [isModalShow, setShowModal] = useState(false)

    function add(status) {
        setChecked(true)
        addHabit(date, habit_rules_id, name, status)
        incrementNumberOfTimesHabitRule(habit_rules_id)
    }

    function disable() {
        changeActiveHabit(habit_rules_id, isActive == 1 ? 0 : 1)
        setActive(isActive == 1 ? 0 : 1)
    }

    return (
        <TouchableOpacity onPress={() => setShowModal(!isModalShow)} style={styles.habit}>
            <View>
                <Checkbox checked={isCheked}/>
                {isModalShow ? <View style={{position: 'relative'}}><FloatingHabitModal add={add}/></View> : null}
            </View>
            <Text style={styles.text}>{children}</Text>
            <View style={{position: 'absolute', right: 0}}>
                <ActiveSwitch defaultValue={isActive == 1 ? true : false} onPressActive={disable} onPressDesactive={disable}/>
            </View>
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
        paddingRight: 50,
        color: WHITE,
        fontSize: 22
    }
})

export default Habit