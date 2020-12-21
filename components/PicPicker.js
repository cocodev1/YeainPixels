import React, {useState, useEffect, forwardRef} from 'react'
import {FlatList, Dimensions, ActivityIndicator} from 'react-native'
import Pic from './Pic'
import * as MediaLibrary from 'expo-media-library';
import RBSheet from "react-native-raw-bottom-sheet";
import { WHITE, DARK_GRAY } from '../styles/colors';
import {addPic} from '../db'

var PicPicker = forwardRef(({setPic, date, pics, isLoading}, ref) =>  {

    const [p, setP] = useState([])

    function press(uri) {
        setPic(uri)
        addPic(date, uri)
        ref.current.close()
    }

    useEffect(() => {
        setP(pics)
    }, [pics.length, isLoading, ref])

    return(
        <RBSheet
        ref={ref}
        closeOnPressMask={true}
        height={Dimensions.get('screen').height/1.8}
        customStyles={{
            container: {
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                backgroundColor: DARK_GRAY,
                opacity: 1
            },
        }}
        >
            {isLoading ? 
            <ActivityIndicator color={WHITE} size='large'/> : 
            <FlatList 
            data={p}
            keyExtractor={(item) => {return item.image}}
            renderItem={({item}) => <Pic onPress={press} source={item} key={item} date={date}/>}
            numColumns={4}/>}
        </RBSheet>
            
    )
})

export default PicPicker