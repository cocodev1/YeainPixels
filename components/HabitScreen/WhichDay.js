import React, { useState, memo, useCallback } from 'react'
import { View, StyleSheet, TextInput, Text } from 'react-native'
import Title from '../Title'
import OptionSelector from '../OptionSelector'
import AdvancedSelector from './AdvancedSelector'
import CheckboxSelector from '../CheckboxSelector'
import { WHITE, MEDIUM_GRAY } from '../../styles/colors'
import { useRoute } from '@react-navigation/native'

function WhichDay({repeat, setRepeat}) {

    const route = useRoute()
    const {day} = route.params
    const {mouth} = route.params
    const {year} = route.params

    const [selected, setSelected] = useState('')
    const [intervalText, setIntervalText] = useState(0)

    function every() {
        setRepeat({type: "every"})
        setSelected('every')

    }

    function week() {
        setRepeat({type: 'week', days: []})
        setSelected('week')
    }

    function only() {
        setRepeat({type: 'only', date: year + '-' + mouth + '-' + day})
        setSelected('only')
    }


    function repeating() {
        setRepeat({type: 'repeating', interval: parseInt(intervalText), begining: year + '-' + mouth + '-' + day})
        setSelected('repeating')
    }

    function mouthFunc() {
        setRepeat({type: 'mouth', days: []})
        setSelected('mouth')
    }

    function addDayToWeek(day) {
        day = day.toLowerCase()
        if(!repeat.days.includes(day)) {
            setRepeat({...repeat, days: [...repeat.days, day]})
        } else {
            setRepeat({...repeat, days: repeat.days.filter(dayIn => dayIn != day)})
        }
    }

    function addDayToMouth(day) {
        if(!repeat.days.includes(day)) {
            setRepeat({...repeat, days: [...repeat.days, day]})
        }else {
            setRepeat({...repeat, days: repeat.days.filter(dayIn => dayIn != day)})
        }
    }

    const addDayToMouthCallback = useCallback((day) => {
        addDayToMouth(day)
    })

    function setIntervalToRepeating() {
        setRepeat({...repeat, interval: intervalText})
    } 

    var mouthDays = []
    
        for(var i = 1; i < 32; i++) {
            const day = i
            mouthDays.push(<CheckboxSelector key={day} color={WHITE} style={styles.weekDay} setCheked={() => addDayToMouthCallback(day)} chekced={repeat.days?.includes(day)}>{day}</CheckboxSelector>)
        }

    return(
        <View style={styles.mainContainer}>
            <View style={styles.header}>
                <Title>Which day</Title>
            </View>
            <OptionSelector setSelected={every} selected={selected == 'every'}>Every Day</OptionSelector>
            <AdvancedSelector name='Certain days in a week' selected={selected == 'week'} setSelected={week}>
                <View style={styles.containerWeek}>
                    <CheckboxSelector style={styles.weekDay} color={WHITE} setCheked={() => addDayToWeek('Monday')} chekced={repeat.days?.includes('Monday'.toLowerCase())}>Monday</CheckboxSelector>
                    <CheckboxSelector style={styles.weekDay} color={WHITE} setCheked={() => addDayToWeek('Tuesday')} chekced={repeat.days?.includes('Tuesday'.toLowerCase())}>Tuesday</CheckboxSelector>
                    <CheckboxSelector style={styles.weekDay} color={WHITE} setCheked={() => addDayToWeek('Wednesday')} chekced={repeat.days?.includes('Wednesday'.toLowerCase())}>Wednesday</CheckboxSelector>
                    <CheckboxSelector style={styles.weekDay} color={WHITE} setCheked={() => addDayToWeek('Thursday')} chekced={repeat.days?.includes('Thursday'.toLowerCase())}>Thursday</CheckboxSelector>
                    <CheckboxSelector style={styles.weekDay} color={WHITE} setCheked={() => addDayToWeek('Friday')} chekced={repeat.days?.includes('Friday'.toLowerCase())}>Friday</CheckboxSelector>
                    <CheckboxSelector style={styles.weekDay} color={WHITE} setCheked={() => addDayToWeek('Saturday')} chekced={repeat.days?.includes('Saturday'.toLowerCase())}>Saturday</CheckboxSelector>
                    <CheckboxSelector style={styles.weekDay} color={WHITE} setCheked={() => addDayToWeek('Sunday')} chekced={repeat.days?.includes('Sunday'.toLowerCase())}>Sunday</CheckboxSelector>
                </View>
            </AdvancedSelector>
            <AdvancedSelector setSelected={mouthFunc} name='Certain days in a mouth' selected={selected == 'mouth'}>
                <View style={styles.containerWeek}>
                    {mouthDays}
                </View>
            </AdvancedSelector>
            <AdvancedSelector setSelected={repeating} name='Repeating' selected={selected == 'repeating'}>
                <View style={styles.repeatingContainer}> 
                <Text style={styles.repeatingText}>Every </Text>
                <TextInput style={styles.repeatingInput} defaultValue={intervalText} onChangeText={t => setIntervalText(t)} onSubmitEditing={setIntervalToRepeating} onBlur={setIntervalToRepeating} keyboardType={"numeric"} autoFocus/>
                <Text style={styles.repeatingText}>days</Text>
                </View>
            </AdvancedSelector>
            <OptionSelector setSelected={only} selected={selected == 'only'}>Only this day</OptionSelector>
        </View>

    )
}

const styles = StyleSheet.create({
    header: {
        marginTop: 10,
        marginBottom: 10
    },
    mainContainer: {
        marginLeft: 20
    },
    weekDay: {
        margin: 8
    },  
    containerWeek: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: MEDIUM_GRAY,
        alignSelf: 'flex-start',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
        marginRight: 15
    },
    repeatingInput: {
        color: WHITE,
        backgroundColor: MEDIUM_GRAY,
        padding: 10,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        fontSize: 18,
        width: 45
    },
    repeatingContainer: {
        flexDirection: 'row',
        backgroundColor: MEDIUM_GRAY,
        alignItems: 'center',
        paddingLeft: 9,
        paddingRight: 9,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    repeatingText: {
        color: WHITE,
        fontSize: 18,
    }
})

export default WhichDay