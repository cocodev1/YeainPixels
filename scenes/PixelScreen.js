import React, { useState, useEffect }  from 'react'
import { ScrollView } from 'react-native'
import {getDayByDate} from '../db'
import EmotionDisplay from '../components/PixelScreen/EmotionDisplay'
import Note from '../components/PixelScreen/Note'
import Trackers from '../components/Trackers'
import Habits from '../components/Habits'
import {getAllHabitsByDate} from '../db'
import {connect} from 'react-redux'
import changeColor from '../redux/actions/changeColor'
import {getColorByEmotion} from '../styles/colors'

function PixelScreen({route, navigation, dispatch}) {

    const {year} = route.params
    const {mouth} = route.params
    const {day} = route.params

    const date = year+'-'+mouth+'-'+day
    
    const [dayVal, setDay] = useState({})

    useEffect(() => {
        getDayByDate(date).then(newDay => {
            setDay(newDay)
        })
        .catch(err => {
            console.log(err)
        }) 
    }, [])


    const [habits, setHabits] = useState([])
    const [updateHabit, setUptdateHabit] = useState({})

    useEffect(() => {
        getAllHabitsByDate(date).then(habits => {
            habits = habits.filter(habit => habit != undefined) 
            setHabits(habits)
        })
    }, [updateHabit])

    useEffect(() => {
        dispatch(changeColor(getColorByEmotion(dayVal.emotion), null))
    }, [dayVal])

    return(
        <ScrollView>
            <EmotionDisplay emotion={dayVal.emotion}/>
            <Note>{dayVal.note}</Note>
            <Trackers disabled={true}/>
            <Habits habits={habits} setUptdateHabit={setUptdateHabit} disabled={true}/>
        </ScrollView>
    )
}

const mapStateToProps = (state) => {
    return {
        colorState: state.color,
    }
}
export default connect(mapStateToProps)(PixelScreen)