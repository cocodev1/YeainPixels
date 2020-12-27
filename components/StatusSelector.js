import React, { forwardRef, useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import {getAllStatus} from '../db/index'
import RBSheet from 'react-native-raw-bottom-sheet'
import { DARK_GRAY } from '../styles/colors'
import Status from './Status'

var  StatusSelector = forwardRef(({setStatus, actualStatus}, ref) =>  {

    const [allStatus, setAllStatus] = useState([])

    useEffect(() => {
        getAllStatus().then(status => {setAllStatus(status)})
    }, [])
    
    function onPress(status, icon) {
        setStatus(status, icon)
    }

    return (
        <RBSheet
        ref={ref}
        closeOnPressMask={true}
        height={55*allStatus.length}
        customStyles={{
            wrapper: {
            },
            container: {
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                backgroundColor: DARK_GRAY,
                opacity: 1,
            },
        }}
        >
            <FlatList 
            data={allStatus}
            renderItem={({item}) => (<Status name={item.name} icon={item.icon} onPress={onPress} actualStatus={actualStatus}/>)}
            keyExtractor={({item}) => (item)}/>
        </RBSheet>
    )
})

export default StatusSelector