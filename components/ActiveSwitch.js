import React, {useState} from 'react'
import {Switch, View} from 'react-native'

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
            onValueChange={toggleSwitch}
            value={isEnabled}/>
        </View>
    )
}

export default ActiveSwitch