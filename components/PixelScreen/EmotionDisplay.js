import React from 'react'
import { StyleSheet, View } from 'react-native'
import Frown from '../../assets/svgs/emoticon/emoticon-frown-outline.svg'
import Sad from '../../assets/svgs/emoticon/emoticon-sad-outline.svg'
import Neutral from '../../assets/svgs/emoticon/emoticon-neutral-outline.svg'
import Happy from '../../assets/svgs/emoticon/emoticon-happy-outline.svg'
import Excited from '../../assets/svgs/emoticon/emoticon-excited-outline.svg'
import * as colors from '../../styles/colors'


function EmotionDisplay({emotion}) {

    switch (emotion) {
        case 0:
            return(
                <View style={styles.container}>
                    <Frown width={iconSize} height={iconSize} fill={colors.ALIZARIN}/>
                </View>
            )
        case 1:
            return(
                <View style={styles.container}>
                    <Sad width={iconSize} height={iconSize} fill={colors.PUMPKIN}/>
                </View>
            )
            case 2:
                return(
                    <View style={styles.container}>
                        <Neutral width={iconSize} height={iconSize} fill={colors.PETER_RIVER}/>
                    </View>
                )
            case 3:
                return(
                    <View style={styles.container}>
                        <Happy width={iconSize} height={iconSize} fill={colors.EMERALD}/>
                    </View>
                )
            case 4:
                return(
                    <View style={styles.container}>
                        <Excited width={iconSize} height={iconSize} fill={colors.TURQUOISE}/>
                    </View>
                )
    
        default:
            return <View></View>
    }

}

const iconSize = 50

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30
    }
})

export default EmotionDisplay