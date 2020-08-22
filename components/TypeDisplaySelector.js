import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import Icon from './Icon'
import { useNavigation, useRoute } from '@react-navigation/native'

import {getDisplayType, changeDisplayType} from '../db'


function TypeDisplaySelector({childrenTitle}) {

    const {setParams} = useNavigation()
    const route = useRoute()   

    useEffect(() => {
        getDisplayType().then(type => setParams({...route.params, type: type}))
    }, []) 

    if(childrenTitle == 'Year') {
        return (
            <View style={styles.container}>
                <Icon setSelected={() => {setParams({...route.params, type: 'mouth'}); changeDisplayType('mouth')}} selected={route.params.type == 'mouth' ? true : false} iconName='view-agenda'/>
                <Icon setSelected={() => {setParams({...route.params, type: 'year'}); changeDisplayType('year')}} selected={route.params.type == 'year' ? true : false} iconName='view-comfy'/>
            </View>
        )
    }else {
        return(
            <View />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    }
})

export default TypeDisplaySelector