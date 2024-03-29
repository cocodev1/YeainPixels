import React, { useState, useEffect, useRef} from 'react'
import { ScrollView } from 'react-native'
import ImagePicker from '../components/ImagePicker'
import EmotionSelector from '../components/EmotionSelector'
import NoteInput from '../components/NoteInput'
import Trackers from '../components/Trackers'
import Habits  from '../components/Habits'
import {connect} from 'react-redux'
import {getAllHabitsByDate, addDay, deleteHabitRule, getDayByDate, getDaysByYear, editDay} from '../db'
import BigButton from '../components/BigButton'
import changeColor from '../redux/actions/changeColor'
import { getColorByEmotion, MEDIUM_GRAY } from '../styles/colors'
import PicPicker from '../components/PicPicker'
import {getPic} from '../db'
import * as MediaLibrary from 'expo-media-library'
import * as Segment from 'expo-analytics-segment'
import {useFocusEffect, useNavigation} from '@react-navigation/native'

function FillPixelScreen({route, nav, emotionState, colorState, dispatch}) {

    const navigation = useNavigation()

    useEffect(() => {
        if(data) {
            dispatch(changeColor(getColorByEmotion(data.emotion), data.emotion))
            setText(data.note)
        }else {
            dispatch(changeColor(MEDIUM_GRAY, null)) 
        }
    }, [data])

    useFocusEffect(() => {
        Segment.screen('Fill Pixel')
    })

    const [text, setText] = useState('')
    const [newTrackers, setNewTrackers] = useState(null)
    const [habits, setHabits] = useState([])
    const [updateHabit, setUptdateHabit] = useState({})
    const {year} = route.params
    const {mouth} = route.params
    const {day} = route.params
    const date = year+'-'+mouth+'-'+day
    const {update} = route.params
    const {data} = route.params

    useEffect(() => {
        getAllHabitsByDate(date).then(habits => {
            habits = habits.filter(habit => habit != undefined) 
            setHabits(habits)
        })
    }, [updateHabit])

    const [isLoading, setLoading] = useState(false)

    function add() {
        console.log('add')
        Segment.trackWithProperties('Add pixel', {pixel: date, pic: pic, emo: emotionState})
        setLoading(true)
        addDay(date, emotionState, text)
        update({date, emotionState, text})
        setLoading(false)
        navigation.goBack()
    }

    function edit() {
        console.log('edit')
        Segment.trackWithProperties('Edit pixel', {pixel: date, pic: pic, emo: emotionState})
        setLoading(true)
        editDay(date, emotionState, text)
        update({date, emotionState, text})
        setLoading(false)
        navigation.goBack()
        navigation.goBack()
    }

    function deleteHabit(id) {
        deleteHabitRule(id)
        newHabits = habits.filter(habit => habit.habit_rules_id != id)
        setHabits(newHabits)
    }

    const refRBSheet = useRef()

    const [pic, setPic] = useState(null)

    const [pics, setPics] = useState([])

    const [isLoading2, setLoading2] = useState(true)

    useEffect(() => {
        getPic(date).then(pic => {
            setPic(pic)
        })
    }, [])

    function autoPic() {
        Segment.trackWithProperties('add pic', {day: year+'-'+mouth+'-'+day})
        MediaLibrary.requestPermissionsAsync().then(perm => {
            if(perm.granted) {
                MediaLibrary.getPermissionsAsync().then(permission => {
                    if(permission.granted) {
                        MediaLibrary.getAssetsAsync({sortBy: [MediaLibrary.SortBy.creationTime]}).then(res => {
                            var picUris = []
                            for (const photo of res.assets) {
                                picUris.push(photo.uri)
                            }
                            setPics(picUris)
                            setLoading2(false)
                        })
                        refRBSheet.current.open()
                    }
                })
            }
        })
    }

    return(
        <ScrollView> 
            <ImagePicker pic={pic} date={date} onPress={() => autoPic()}/>
            <EmotionSelector />
            <NoteInput text={text} setText={setText}/>
            <Trackers newTrackers={newTrackers} setNewTrackers={(tr) => setNewTrackers(tr)}/>
            <Habits habits={habits} setUptdateHabit={setUptdateHabit} deleteHabit={deleteHabit}/>
            <BigButton onPress={!data ? add : edit} color={colorState} loading={isLoading}>Done</BigButton>
            <PicPicker ref={refRBSheet} setPic={setPic} date={date} pics={pics} isLoading={isLoading2}/>
        </ScrollView>
    )
}

const mapStateToProps = (state) => {
    return {
        colorState: state.colorReducer.color,
        emotionState: state.colorReducer.emotion
    }
}
export default connect(mapStateToProps)(FillPixelScreen)