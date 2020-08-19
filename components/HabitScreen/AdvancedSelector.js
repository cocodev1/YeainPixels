import React from 'react'
import {View, StyleSheet} from 'react-native'
import OptionSelector from '../OptionSelector'
import { MEDIUM_GRAY } from '../../styles/colors'

function AdvancedSelector({selected, setSelected, name, children}) {

    return(
        <View>
            <OptionSelector setSelected={() => setSelected(name)} selected={selected} style={selected ? style.OptionSelector: null}>{name}</OptionSelector>
            <View style={style.container}>{selected ? children : null}</View>
        </View>
    )

}

const style = StyleSheet.create({
    container: {
        top: -20,
        alignSelf: 'flex-start'

    },
    OptionSelector: {
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0
    }
})

export default AdvancedSelector