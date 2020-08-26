import React, {useState} from 'react'
import {Switch, View} from 'react-native'
import {WHITE, MEDIUM_GRAY, DARK_GRAY} from '../styles/colors'

function ActiveSwitch({defaultValue, onPressActive, onPressDesactive}) {

    const [isEnabled, setIsEnabled] = useState(defaultValue)

    function toggleSwitch() {
        if(isEnabled == true) {
            onPressDesactive()
            setIsEnabled(false)
        }else if(isEnabled == false) {
            onPressActive()
            setIsEnabled(true)
        }
    }

    return(
        <View>
            <Switch 
            trackColor={{true: MEDIUM_GRAY, false: DARK_GRAY}}
            thumbColor={isEnabled ? WHITE : MEDIUM_GRAY}
            onValueChange={toggleSwitch}
            value={isEnabled}/>
        </View>
    )
}

export default ActiveSwitch