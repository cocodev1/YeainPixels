import React from 'react'
import {StyleSheet, View, FlatList} from 'react-native'
import Title from './Title'
import AddButton from './AddButton'
import Habit from './Habit'
import { useNavigation, useRoute } from '@react-navigation/native';

function Habits({habits, setUptdateHabit, disabled}) {
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
                data={habits}
                renderItem={({item}) => <Habit checked={ item.status ? true : false} name={item.name} habit_rules_id={item.habit_rules_id}>{item.name}</Habit>}
                keyExtractor={(item) => habits.indexOf(item)}/>
        </View>
            
    ) 
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10
    }
})

export default Habits