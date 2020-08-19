import StackNav from './StackNav'
import * as React from 'react';
import {StatusBar} from 'react-native'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import * as colors from '../styles/colors'

export default function Nav() {

    const Theme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary: colors.MEDIUM_GRAY,
            background: colors.DARK_GRAY,
            card: colors.DARK_GRAY,
            text: colors.WHITE,

        }
    }

    return(
        <NavigationContainer theme={Theme}>
            <StatusBar barStyle="light-content" backgroundColor={colors.DARK_GRAY} />
            <StackNav />
        </NavigationContainer>
    )
}