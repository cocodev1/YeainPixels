import React, { useState, useEffect, useLayoutEffect }  from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import {getDayByDate} from '../db'
import EmotionDisplay from '../components/PixelScreen/EmotionDisplay'
import Note from '../components/PixelScreen/Note'
import Trackers from '../components/Trackers'
import Habits from '../components/Habits'
import ImageDisplayer from '../components/ImageDisplayer'
import {getAllHabitsByDate, getPic} from '../db'
import {connect} from 'react-redux'
import changeColor from '../redux/actions/changeColor'
import {getColorByEmotion, WHITE} from '../styles/colors'
import {MaterialCommunityIcons} from '@expo/vector-icons'

function PixelScreen({route, navigation, dispatch}) {

    const {year} = route.params
    const {mouth} = route.params
    const {day} = route.params
    const {update} = route.params

    const date = year+'-'+mouth+'-'+day
    
    const [dayVal, setDay] = useState({})

    useEffect(() => {
        getDayByDate(date).then(newDay => {
            setDay(newDay)
            navigation.setOptions({
                headerRight: () => (
                    <TouchableOpacity style={{padding: 15}} onPress={() => navigation.navigate('Fill Pixel', 
                    {year: year,
                    mouth: mouth,
                    day: day,
                    update: update, 
                    data: newDay})}>
                        <MaterialCommunityIcons name='pencil-outline' color={WHITE} size={24}/>
                    </TouchableOpacity>
                    )
            })
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
    }, [])

    useEffect(() => {
        dispatch(changeColor(getColorByEmotion(dayVal.emotion), null))
    }, [dayVal])

    const [pic, setPic] = useState(null)

    useLayoutEffect(() => {
        getPic(date).then(uri => setPic(uri))
    }, [])

    return(
        <ScrollView>
            {pic ? <ImageDisplayer uri={pic} /> : null}
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