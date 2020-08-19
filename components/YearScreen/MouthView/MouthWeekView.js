import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import DayWeek from './DayWeek'
import moment from 'moment'
import { WHITE } from '../../../styles/colors'

function MouthWeekView({mouth, year, update}) {

    var endNum = moment(mouth+'-'+year, 'MM-YYYY').endOf('month').date()

    var allDayObjects = Array.from(Array(endNum+1).keys()).filter(dayNum => dayNum != 0).map(dayNum => dayNum = {day: year+'-'+mouth+'-'+dayNum})

    var allDayObjectsComponents = allDayObjects.map(dayObject => dayObject = <DayWeek key={dayObject.day} date={dayObject.day} update={update}/>)

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.text}>{moment(mouth, 'MM').format('MMMM')}</Text>
            <View style={styles.container}>
                {allDayObjectsComponents}
            </View>
        </View>

    )


}

const styles = StyleSheet.create({
    container: {
        marginBottom: 35,
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    text: {
        fontSize: 25, 
        color: WHITE, 
        textAlign: 'center'
    }
})

export default MouthWeekView