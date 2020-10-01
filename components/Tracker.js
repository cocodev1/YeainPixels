import React, {useMemo, useRef, useState, useEffect} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Button, TextInput} from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { connect } from 'react-redux'
import {WHITE, DARK_GRAY} from '../styles/colors'
import {truncate} from '../styles/mixins'
import {BoxShadow} from 'react-native-shadow'
import SetTrackerValue from './SetTrackerValue'
import moment from 'moment'
import {useRoute} from '@react-navigation/native'
import shortNumber from 'short-number'

function Tracker(props) {
    const route = useRoute();

    const {day} = route.params
    const {mouth} = route.params
    const {year} = route.params
    const navDate = moment(year + '-' + mouth + '-' + day, 'YYYY-MM-DD')

    const style = StyleSheet.create({

        mainContainer: {
            width: 130,
            height: 130,
            borderRadius: 25,
            marginBottom: 30,
            backgroundColor: props.color
        },
        iconContainer: {
            marginTop: 15,
            marginLeft: 20,
            marginRight: 20,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        textContainer: {
            marginTop: 0,
            marginBottom: 15,
            marginLeft: 20,
            flex: 1,
            flexDirection: 'column',
        },
        textName: {
            fontSize: 25,
            fontWeight: "600",
            color: WHITE,
        },
        textValue: {
            fontSize: 18,
            color: WHITE,
            opacity: 0.8,
            alignSelf: 'flex-start',
            marginRight: 8
        }
    })

    const shadowOpt = {
        width: 130,
        height: 130,
        color: props.color,
        border: 5,
        radius: 25,
        opacity: 0.25,
        x: 6,
        y: 6,
        style: style.mainContainer,
      }

    const refRBSheet = useRef();

    const [value, setValue] = useState(props.value)
    const [updated, setUpdated] = useState(props.updated)

    const [valueToDisplay, setValueToDisplay] = useState('')

      
    function getValueToDisplay() {
        if(props.generated == true && (value == null || value == undefined)) {
            setValueToDisplay("Update it")
        }else
        if(value == null || value == "null"){
            setValueToDisplay("Not this day")
        }else {
            setValueToDisplay(`${shortNumber(parseInt(value))} ${props.type}`)
        }

    }

    useEffect(() => {
        getValueToDisplay()
        props.generated == false
    }, [updated, value])

    const [icon, setIcon] = useState(null)

    function getIcon() {
        if(props.generated && (value == null || value == undefined)) {
            if(moment(moment().format('YYYY-MM-DD'), 'YYYY-MM-DD').isSame(navDate)) {
                return <FontAwesome name="circle" size={18} color={WHITE} />
            }else if(moment().isAfter(navDate)) {
                return <MaterialCommunityIcons name="update" size={26} color={WHITE}/>
            }else if(moment().isBefore(navDate)) {
                return <MaterialIcons name="watch-later" size={26} color={WHITE} />
            }
        }else {
            if(value == null || value == "null") {
                return <MaterialCommunityIcons name="close" size={30} color={WHITE} />
            }else {
                return <MaterialIcons name="done" size={30} color={WHITE} />
            }
        }
    }

    useEffect(() => {
        setIcon(getIcon())
    }, [value])

    return(
        <TouchableOpacity activeOpacity={1} onPress={() => {refRBSheet.current.open()}}>
            <BoxShadow setting={shadowOpt}>
                <View style={style.iconContainer}>
                    <MaterialCommunityIcons name={props.icon} size={45} color={WHITE}/>
                    {icon}
                </View>
                <View style={style.textContainer}>
                    <Text style={style.textName}>{truncate(props.name)}</Text>
                    <Text style={style.textValue} adjustsFontSizeToFit>{valueToDisplay}</Text>
                </View>
            </BoxShadow>
            <SetTrackerValue ref={refRBSheet} value={value} setValue={setValue} setUpdated={setUpdated} id={props.generated ? null : props.id} generated={props.generated} tracker_rules_id={props.generated ? props.id : props.tracker_rules_id} active={props.active} icon={props.icon} type={props.type} name={props.name} navDay={navDate.format("YYYY-MM-DD")}/>
        </TouchableOpacity>
    )
}

const mapStateToProps = (state) => {
    return {
        color: state.color,
    }
}
export default connect(mapStateToProps)(Tracker)