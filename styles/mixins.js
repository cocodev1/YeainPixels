import { StyleSheet } from 'react-native'

const mainStyle = StyleSheet.create({
    bigContainer: {
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    emotion: {
    }
})

const truncate = (input) => input.length > 5 ? `${input.substring(0, 5)}...` : input

export {mainStyle, truncate}