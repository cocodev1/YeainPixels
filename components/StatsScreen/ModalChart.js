import  React, { forwardRef, useEffect } from "react"
import RBSheet from "react-native-raw-bottom-sheet"
import { Text as TextC, Dimensions, StyleSheet, View, TouchableOpacity} from 'react-native'
import * as d3 from "d3"
import { Svg, Path, Text, LinearGradient, Defs, Stop } from 'react-native-svg'
import { DARK_GRAY, WHITE } from "../../styles/colors"
import moment from "moment"
import _ from 'lodash'
import shortNumber from 'short-number'
import BigButton from "../BigButton"
import { FontAwesome5 } from "@expo/vector-icons" 
import { useRef } from "react"
import { useState } from "react"
import ModalChartOptions from './ModalChartOptions'
import dayjs from 'dayjs/locale/en'

var ModalChart = forwardRef(({ data }, ref) => {

    const options = {week: 'Last 7 days', mouth: 'Last 30 days', all: 'All the time'}
    const [option, setOption] = useState(options.all)

    const [datas, setDatas] = useState(data)

    const optionRef = useRef()

    useEffect(() => {

        if(option == options.week) {
            setDatas(data.filter(d => moment(d.day).isBetween(moment().subtract(7, 'd'), moment(), 'days', '[]')))
        }else if(option == options.mouth) {
            setDatas(data.filter(d => moment(d.day).isBetween(moment().subtract('30', 'days'), moment(), 'days', '[]')))
        }else if(option == options.all) {
            setDatas(data)
        }
    }, [option, data])

    if(datas.length > 0) {
        const WIDTH = Dimensions.get('screen').width
        const HEIGHT = 250
        const GRAPHWIDTH = Dimensions.get('screen').width-50
        const GRAPHHEIGHT = 200

        const MARGIN = 10

        const max  = Math.max(...datas.map(d => d.value))
        const yAxisValue = []
        for(var i = 1; i < 11; i++) {
            yAxisValue.push(shortNumber(Math.round(max/10*i)))
        }

        const dataExtent = d3.extent(datas, d => moment(d.day, 'YYYY-MM-DD').toDate())

        const x = d3.scaleTime()
            .domain(dataExtent)
            .range([0, GRAPHWIDTH-MARGIN*2])
        
        const timeRange = d3.timeDays(dataExtent[0], dataExtent[1])
        var xAxisValue = _.chunk(timeRange, timeRange.length/4)
        xAxisValue.pop()
        xAxisValue = xAxisValue.map(d => d[0])

        const y = d3.scaleLinear()
            .domain(d3.extent(datas, d => d.value))
            .range([GRAPHHEIGHT, 0])

        const yAxis = d3.scalePoint()
            .domain(yAxisValue)
            .range([GRAPHHEIGHT, 0])
        
        const d = d3.line()
            .x(d => x(moment(d.day, 'YYYY-MM-DD').toDate()))
            .y(d => y(d.value))
            .curve(d3.curveCatmullRom.alpha(0.5))
            (datas)

        return(
            <RBSheet 
            ref={ref}
            height={400}
            customStyles={{
                container: {
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    backgroundColor: DARK_GRAY,
                    opacity: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                
                },
            }}
            >
                <TouchableOpacity style={styles.textContainer} onPress={() => optionRef.current.open()}>
                    <TextC style={styles.text}>{option}</TextC>
                    <FontAwesome5 name='angle-down' size={22} color={WHITE}/>
                </TouchableOpacity>
                <Svg width={WIDTH-MARGIN*2} height={HEIGHT} style={styles.svg}>

                    <Path 
                    d={`${d}`}
                    stroke={WHITE}
                    strokeWidth={2}
                    fill='transparent' 
                    x={50}/>

                    <Path 
                    d={`${d} L ${GRAPHWIDTH-MARGIN*2} ${GRAPHHEIGHT} L 0 ${GRAPHHEIGHT}`}
                    fill='url(#grad)' 
                    x={50}/>

                    {xAxisValue.map(d => <Text x={x(new Date(d))+50} y={HEIGHT} fontSize={15} fill={WHITE} opacity={0.5}>{moment(d).format('MMM D')}</Text>)}
                    {yAxisValue.map(d => <Text x={5} y={yAxis(d)} fontSize={15} fill={WHITE} opacity={0.5}>{d}</Text>)}


                    <Defs>
                        <LinearGradient id='grad' x1='0%' x2='0%' y1='0%' y2='100%'>
                            <Stop offset='0%' stopColor={WHITE} stopOpacity={0.6} />
                            <Stop offset='99%' stopColor={WHITE} stopOpacity={0} />
                        </LinearGradient>
                    </Defs>
                </Svg>
                <View style={styles.buttonContainer}>
                    <BigButton onPress={() => ref.current.close()}>Close</BigButton>
                </View>
                <ModalChartOptions ref={optionRef} options={options} setOption={setOption}/>
            </RBSheet>
        )
    } else {
        return (
            <RBSheet 
            ref={ref}
            height={400}
            customStyles={{
                container: {
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    backgroundColor: DARK_GRAY,
                    opacity: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                
                },
            }}
            >
                <TouchableOpacity style={{...styles.textContainer, marginBottom: 'auto', paddingTop: 19}} onPress={() => optionRef.current.open()}>
                    <TextC style={styles.text}>{option}</TextC>
                    <FontAwesome5 name='angle-down' size={22} color={WHITE}/>
                </TouchableOpacity>
                <TextC style={styles.text}>No data availaible</TextC>
                <View style={styles.buttonContainer}>
                    <BigButton onPress={() => ref.current.close()}>Close</BigButton>
                </View>
                <ModalChartOptions ref={optionRef} options={options} setOption={setOption}/>
            </RBSheet>
        )
    }
}) 

const styles = StyleSheet.create({
    title: {
        alignSelf: 'flex-start', 
        color: WHITE,
        padding: 20
    },
    buttonContainer: {
        alignSelf: 'stretch',
    },
    text: {
        color: WHITE,
        fontSize: 22,
        paddingRight: 6
    },
    textContainer: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 12,
        paddingLeft: 16,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
})

export default ModalChart