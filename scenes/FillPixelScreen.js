import React, { useState, useEffect} from 'react'
import { ScrollView } from 'react-native'
import ImagePicker from '../components/ImagePicker'
import EmotionSelector from '../components/EmotionSelector'
import NoteInput from '../components/NoteInput'
import Trackers from '../components/Trackers'
import Habits  from '../components/Habits'
import {connect} from 'react-redux'
import {getAllHabitsByDate, addDay} from '../db'
import BigButton from '../components/BigButton'
import changeColor from '../redux/actions/changeColor'
import { MEDIUM_GRAY } from '../styles/colors'

function FillPixelScreen({route, navigation, emotionState, colorState, dispatch}) {

    useEffect(() => {
    dispatch(changeColor(MEDIUM_GRAY, null))
    }, [])

    const [text, setText] = useState('')
    const [newTrackers, setNewTrackers] = useState(null)
    const [habits, setHabits] = useState([])
    const [updateHabit, setUptdateHabit] = useState({})
    const {year} = route.params
    const {mouth} = route.params
    const {day} = route.params
    const date = year+'-'+mouth+'-'+day
    const {update} = route.params
    
    useEffect(() => {
        getAllHabitsByDate(date).then(habits => {
            habits = habits.filter(habit => habit != undefined) 
            setHabits(habits)
        })
    }, [updateHabit])

    const [isLoading, setLoading] = useState(false)

    function add() {
        console.log(update, 'eo')
        update({date, emotionState, text})
        setLoading(true)
        addDay(date, emotionState, text)
        setLoading(false)
        navigation.goBack()
    }


    return(
        <ScrollView> 
            <ImagePicker />
            <EmotionSelector />
            <NoteInput text={text} setText={setText}/>
            <Trackers newTrackers={newTrackers} setNewTrackers={(tr) => setNewTrackers(tr)}/>
            <Habits habits={habits} setUptdateHabit={setUptdateHabit}/>
            <BigButton onPress={add} color={colorState} loading={isLoading}>Done</BigButton>
        </ScrollView>
    )
}

const mapStateToProps = (state) => {
    return {
        colorState: state.color,
        emotionState: state.emotion
    }
}
export default connect(mapStateToProps)(FillPixelScreen)