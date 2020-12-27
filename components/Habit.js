import React, { useRef, useState } from 'react'
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native'
import ActiveSwitch from './ActiveSwitch'
import Checkbox from './Checkbox'
import { WHITE } from '../styles/colors'
import {addHabit, incrementNumberOfTimesHabitRule, changeActiveHabit} from '../db'
import { useRoute } from '@react-navigation/native'
import TrashCan from './TrashCan'
import StatusSelector from './StatusSelector'
import {MaterialCommunityIcons} from '@expo/vector-icons'

function Habit({children, checked, name, habit_rules_id, active, status_icon, actualStatus, deleteHabit}) {

    const ref = useRef()

    const route = useRoute()
    const {year} = route.params
    const {mouth} = route.params
    const {day} = route.params
    const date = year+'-'+mouth+'-'+day

    const [icon, setIcon] = useState(status_icon)
    const [isCheked, setChecked] = useState(checked)
    const [isActive, setActive] = useState(active)

    function add(status, status_icon) {
        //setChecked(true)
        setIcon(status_icon)
        addHabit(date, habit_rules_id, name, status, status_icon)
        incrementNumberOfTimesHabitRule(habit_rules_id)
        ref.current.close()
    }

    function disable() {
        changeActiveHabit(habit_rules_id, isActive == 1 ? 0 : 1)
        setActive(isActive == 1 ? 0 : 1)
    }
    return (
        <TouchableOpacity onPress={() => ref.current.open()} style={styles.habit}>
            {icon ? <MaterialCommunityIcons name={icon} color={WHITE} size={30}/> : <Checkbox checked={isCheked}/>}
            <Text style={styles.text}>{children}</Text>
            <View style={{position: 'absolute', right: 0}}>
                <ActiveSwitch defaultValue={isActive == 1 ? true : false} onPressActive={disable} onPressDesactive={disable}/>
            </View>
            <StatusSelector ref={ref} setStatus={add} actualStatus={actualStatus}/>
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