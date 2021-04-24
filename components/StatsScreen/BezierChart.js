import React from 'react'
import {} from 'react-native'
import { DARK_GRAY, WHITE, MEDIUM_GRAY } from '../../styles/colors'
import moment from 'moment'
import {Svg, Path, LinearGradient, Stop, Defs, Text, Line} from 'react-native-svg'
import * as d3 from 'd3'

function BezierChart({data}) {

    const WIDTH = 100
    const HEIGHT = 70

    const x = d3.scaleTime()
        .domain(d3.extent(data, d => new Date(d.day)))
        .range([0, WIDTH])
    
    const y = d3.scaleLinear()
        .domain(d3.extent(data, d => d.value))
        .range([HEIGHT-5, 5])

    const d = d3.line()
        .x(d => x(new Date(d.day)))
        .y(d => y(d.value))
        .curve(d3.curveCatmullRom.alpha(0.5))
        (data)

    return (
        <Svg width={WIDTH} height={HEIGHT}>
            <Path 
            d={`${d}`}
            stroke={WHITE}
            strokeWidth={2}
            fill='transparent'/>

            <Path 
            d={`${d} L ${WIDTH} ${HEIGHT} L 0 ${HEIGHT}`}
            fill='url(#grad)'/>

            <Defs>
                <LinearGradient id='grad' x1='0%' x2='0%' y1='0%' y2='100%'>
                    <Stop offset='0%' stopColor={WHITE} stopOpacity={0.6} />
                    <Stop offset='100%' stopColor={WHITE} stopOpacity={0} />
                </LinearGradient>
            </Defs>
        </Svg>
    )
} 

export default BezierChart