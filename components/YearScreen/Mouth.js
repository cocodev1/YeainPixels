import React, { useState, useEffect, useCallback } from 'react'
import {FlatList} from 'react-native'
import moment from 'moment'
import { ALIZARIN, PUMPKIN, PETER_RIVER, EMERALD, TURQUOISE, MEDIUM_GRAY, DARK_GRAY,  getColorByEmotion} from '../../styles/colors'
import Pixel from './Pixel'

function Mouth({mouth, year, days, update}) {

    function range(start, end) {
        return Array(end - start + 1).fill().map((_, idx) => start + idx)
      }

    const updateCallback = useCallback((day) => update(day), [])

    const nums = range(1, 31)

    function getPixelColors() {
        var colors = []
        for(var num = 1; num < 32; num++) {
            var date = year+'-'+mouth+'-'+num
            if(!moment(date, 'YYYY-MM-DD').isValid()) {
                colors.push({day: num, color: DARK_GRAY})
            }else {
                var day = days.filter(day2 => day2.day == date)[0]
                if(day) {
                    colors.push({day: num, color: getColorByEmotion(day.emotion)})
                }else {
                    colors.push({day: num, color: MEDIUM_GRAY})
                }
            }
        }
        return colors
    }

    function getColor(num) {
        return pixelColors.filter(pixel => pixel.day == num)[0].color
    }

    const [pixelColors, setPixelColors] = useState(getPixelColors())

    useEffect(() => {
        setPixelColors(getPixelColors())
    }, [days])


    return(
        <FlatList 
        data={nums}
        keyExtractor={item => item.toString()}
        renderItem={({item}) => <Pixel
            key={item.toString()}
            isClickable={getColor(item) != DARK_GRAY} 
            display={getColor(item) != MEDIUM_GRAY} 
            color={getColor(item)} 
            update={updateCallback}
            day={item}
            mouth={mouth}
            year={year}/>}
            scrollEnabled={false}/>
    ) 
}

export default Mouth