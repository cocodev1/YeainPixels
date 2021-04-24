import React, {useRef} from 'react'
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native'
import {DARK_GRAY, WHITE, MEDIUM_GRAY} from '../../styles/colors'
import BezierChart from './BezierChart'
import ModalChart from './ModalChart'

function ChartCard({children, title, data}) {

    const ref = useRef()

    return(
        <TouchableOpacity style={styles.mainContainer}>
            <Text style={styles.title}>{title}</Text>
            <View><BezierChart data={data} /></View>
            <ModalChart ref={ref}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        width: 130,
        height: 130,
        borderRadius: 25,
        marginBottom: 30,
        marginTop: 30,
        backgroundColor: MEDIUM_GRAY,
        marginRight: 20,
        marginLeft: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: WHITE,
        fontSize: 18,
        margin: 5,
        marginLeft: 10
    }
})

export default ChartCard