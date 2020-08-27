import React, {useState} from 'react'
import {View, StyleSheet, Text, TextInput} from 'react-native'
import Title from '../Title'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRoute } from '@react-navigation/native'
import moment from "moment"
import AdvancedSelector from './AdvancedSelector';
import { WHITE, MEDIUM_GRAY } from '../../styles/colors';
import OptionSelector from '../OptionSelector';

function Objective({objective, setObjective, repeat}) {

    const route = useRoute()
    const {day} = route.params
    const {mouth} = route.params
    const {year} = route.params

    const [date, setDate] = useState(moment(year + '-' + mouth + '-' + day, 'YYYY-MM-DD').toDate())
    //const [dateToShow, setDateToShow] = useState(date.toDateString)
    const [mode, setMode] = useState('date')
    const [show, setShow] = useState(false)

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setObjective({type: 'date', maxDate: moment(currentDate).format('YYYY-MM-DD')})
      };

    const [selected, setSelected] = useState('')

    function dateFunc() {
        setSelected('date')
        setShow(true)
    }


    const [timesText, setTimesText] = useState('')
    function timeFunc() {
        setObjective({type: 'numberOfTimes', actualTimes: 0, maxTimes: parseInt(timesText)})
    }



    return (
        <View style={styles.mainContainer}>
            <View style={styles.header}>
                <Title>Objective</Title>
            </View>
            {repeat.type != 'only' ? 
                <View>
                    <AdvancedSelector selected={selected == 'date'} name='Complete when specific date' setSelected={dateFunc}>
                        <Text style={styles.dateText}>{'Until ' + moment(date).format('YYYY-MM-DD')}</Text>
                    </AdvancedSelector>
                    <AdvancedSelector selected={selected == 'times'} name='Complete when number of times' setSelected={() => setSelected('times')}>
                        <View style={styles.timeContainer}>
                            <Text style={styles.timesText}>Complete when habit is done </Text>
                                <TextInput style={styles.timesInput} autoFocus keyboardType='numeric' defaultValue={timesText} onChangeText={(t) => setTimesText(t)} onSubmitEditing={timeFunc} onBlur={timeFunc} />
                            <Text style={styles.timesText}> times</Text>
                        </View>
                    </AdvancedSelector>
                    <OptionSelector selected={selected == 'never'} setSelected={() => {setSelected('never'); setObjective({type: 'never'})}}>Never complete</OptionSelector>
                </View>
            : null }
            {show && (
                <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="spinner"
                onChange={onChange}
                />
            )}
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
    dateText: {
        color: WHITE,
        backgroundColor: MEDIUM_GRAY,
        fontSize: 18,
        padding: 12,
        justifyContent: 'center',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20
    },
    timeContainer: {
        flexDirection: 'row',
        color: WHITE,
        backgroundColor: MEDIUM_GRAY,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20
    },
    timesText: {
        fontSize: 18,
        color: WHITE
    },
    timesInput: {
        width: 18,
        fontSize: 12,
        color: WHITE,
        textAlignVertical: 'center'
    }
})


export default Objective