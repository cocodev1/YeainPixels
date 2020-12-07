import React from 'react'
import {} from 'react-native'
import {LineChart} from 'react-native-chart-kit'
import { DARK_GRAY, WHITE, MEDIUM_GRAY } from '../../styles/colors'
import moment from 'moment'

function BezierChart({valueList, dateList}) {

    const data = {
        labels: dateList.map(date => date = moment(date, 'YYYY-MM-DD').format('MM/DD')),
        datasets: [
            {
                data: valueList
            }
        ]

    }

    const chartConfig = {
        backgroundGradientFrom: MEDIUM_GRAY,
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: MEDIUM_GRAY,
        backgroundGradientToOpacity: 0,
        fillShadowGradient: WHITE,
        fillShadowGradientOpacity: 0.6,
        color: (opacity = 1) => WHITE,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    }

    return (
        <LineChart 
            data={data}
            width={170}
            height={100}
            chartConfig={chartConfig}
            segments={1}
            withHorizontalLabels={false}
            withVerticalLabels={false}
            withOuterLines={false}
            withInnerLines={false}
            withDots={false}
            bezier
        />
    )
} 

export default BezierChart