import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useRoute } from '@react-navigation/native'
import Mouth from './Mouth'
import {getDaysByYear} from '../../db'
import DayDisplay from './DayDisplay'
import AddTodayPixelButton from '../AddTodayPixelButton'
import { connect } from 'react-redux'

function Year({update, setUpdate, year}) {

    const route = useRoute()

    const [days, setDays] = useState([])

    useEffect(() => {
        getDaysByYear(year).then(newDays => {setDays(newDays)})
    }, [update, route])

    const nums = Array.from(Array(13).keys()).filter(num => num != 0)

    return(
        <View>
            <View style={styles.container}>
                <DayDisplay />
                <FlatList 
                    data={nums}
                    keyExtractor={(num) => num.toString()}
                    horizontal
                    renderItem={({item}) => <Mouth 
                        days={days} 
                        mouth={item}
                        year={year}
                        update={setUpdate}
                        />}
                    scrollEnabled={false}
                    contentContainerStyle={{paddingBottom: (Dimensions.get('screen').width/13)-2}}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    }
})

const mapStateToProps = (state) => {
    return {
        year: state.changeYearReducer.year
    }
}
export default connect(mapStateToProps)(Year)