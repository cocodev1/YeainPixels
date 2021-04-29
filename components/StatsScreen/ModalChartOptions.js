import  React, { forwardRef } from "react"
import RBSheet from "react-native-raw-bottom-sheet"
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native'
import _ from 'lodash'
import { DARK_GRAY, WHITE } from "../../styles/colors"

const ModalChartOptions = forwardRef(({options, setOption}, ref) => {

    function onPress(option) {
        setOption(option)
        ref.current.close()
    }

    return(
        <RBSheet
        ref={ref}
        height={200}
        customStyles={{
            container: {
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                backgroundColor: DARK_GRAY,
                opacity: 1,
                flexDirection: "column",
                justifyContent: 'space-evenly',
                alignItems: 'center'
            
            },
        }}>
            {_.values(options).map((option, i) => 
            <TouchableOpacity key={i} onPress={() => onPress(option)}>
                <Text style={styles.touchText}>{option}</Text>
            </TouchableOpacity>
            )}
        
        </RBSheet>
    )

})

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: 'space-around',
    },
    touchText: {
        color: WHITE,
        fontSize: 24
    }
})

export default ModalChartOptions