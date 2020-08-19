import React, {useCallback} from 'react'
import { StyleSheet, View } from 'react-native'
import Icon from './Icon'

function IconRow(props) {

    var setSelected = useCallback((name) => {
        props.setSelected(name)
    }, [])

    var iconComponents = props.iconNames.map(iconName => <Icon iconName={iconName} setSelected={setSelected} selected={props.iconSelected == iconName}/>)

    return (
    <View style={styles.container}>
        {iconComponents}
    </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    icon: {
        padding: 10,
        opacity: 0.6
    }
})

export default IconRow