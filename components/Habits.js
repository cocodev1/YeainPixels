import React, { useState, useEffect } from 'react'
import {StyleSheet, View, FlatList} from 'react-native'
import Title from './Title'
import AddButton from './AddButton'
import Habit from './Habit'
import { useNavigation, useRoute } from '@react-navigation/native'
import {deleteHabitRulen} from '../db'

function Habits({habits, setUptdateHabit, disabled}) {

    const [localHabits, setLocalHabits] = useState([])

    useEffect(() => {
        setLocalHabits([...habits])
    }, [habits])

    function deleteLocalHabit(habit_rules_id) {
        setLocalHabits(localHabits.filter(localHabit => localHabit.habit_rules_id != habit_rules_id))
        //deleteHabitRule(habit_rules_id)  
    } 

    const navigation = useNavigation() 
    const route = useRoute()
    
    const {day} = route.params
    const {mouth} = route.params

    return(
        <View>
            <View style={styles.header}>
                <Title>Your Habits</Title>
                {!disabled ? <AddButton onPress={() => navigation.navigate('Add Habit', {day: day, mouth: mouth, year : '2020', setUptdateHabit: setUptdateHabit})}/> : null}
            </View>
            <FlatList 
                data={localHabits}
                renderItem={({item}) => <Habit deleteHabit={deleteLocalHabit} checked={ item.status ? true : false} name={item.name} active={item.active} habit_rules_id={item.habit_rules_id} key={localHabits.indexOf(item)}>{item.name}</Habit>}/>
        </View>
            
    ) 
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 15
    }
})

export default Habits