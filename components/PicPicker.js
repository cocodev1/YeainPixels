import React, {useState, useEffect, forwardRef} from 'react'
import {FlatList, Dimensions, ActivityIndicator} from 'react-native'
import Pic from './Pic'
import * as MediaLibrary from 'expo-media-library';
import RBSheet from "react-native-raw-bottom-sheet";
import { WHITE, DARK_GRAY } from '../styles/colors';
import {addPic} from '../db'

var PicPicker = forwardRef(({setPic, date}, ref) =>  {

    const [pics, setPics] = useState([])

    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        MediaLibrary.requestPermissionsAsync().then(perm => {
            if(perm.granted) {
                MediaLibrary.getPermissionsAsync().then(permission => {
                    if(permission.granted) {
                        MediaLibrary.getAssetsAsync({sortBy: [MediaLibrary.SortBy.creationTime]}).then(res => {
                            var picUris = []
                            for (const photo of res.assets) {
                                picUris.push(photo.uri)
                            }
                            setPics(picUris)
                            setLoading(false)
                        })
                    }
                })
            }
        })
    }, [])

    function press(uri) {
        setPic(uri)
        addPic(date, uri)
        ref.current.close()
    }

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
            data={pics}
            keyExtractor={(item) => {return item.image}}
            renderItem={({item}) => <Pic onPress={press} source={item} key={item} date={date}/>}
            numColumns={4}/>}
        </RBSheet>
            
    )
})

export default PicPicker