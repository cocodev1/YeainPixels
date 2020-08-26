import React, { useState, useEffect } from 'react'
import { FlatList, ScrollView, StyleSheet, View, Text, TextInput } from 'react-native'
import iconsData from '../MaterialCommunityIcons.json'
import IconRow from './IconRow'
import Title from './Title'
import { MaterialIcons } from '@expo/vector-icons'; 
import { WHITE } from '../styles/colors'

function Icons({iconName, setIconName}) {
    
    const iconNames = Object.keys(iconsData)
    const iconNamesSplit = []

    while(iconNames.length) {
        var chunk = iconNames.splice(0, 6)
        iconNamesSplit.push(chunk)
    }
    const [icons, setIcons] = useState(iconNamesSplit)
    const [searchText, setSearchText] = useState('')
    const [iconSelected, setIconSelected] = useState('')

    useEffect(() => {

        var filteredIcons = Object.keys(iconsData).filter(iconName => iconName.includes(searchText.toLowerCase()))
        var newIconNameSplit = []
        
        while(filteredIcons.length) {
            var chunk = filteredIcons.splice(0, 6)
            newIconNameSplit.push(chunk)
        }
        
        setIcons([...newIconNameSplit])

    }, [searchText])

    return(
        <View style={styles.mainContainer}>
            <View style={styles.header}>
                <Title>Icons</Title>
                <View style={styles.searchBar}>
                    <MaterialIcons name="search" size={34} color={WHITE} />
                    <TextInput placeholder="Search" style={styles.searchBarInput} defaultValue={searchText} onChangeText={(text) => setSearchText(text)}/>
                </View>
            </View>
            <FlatList 
                data={icons} 
                initialNumToRender={8} 
                maxToRenderPerBatch={5} 
                windowSize={3} 
                nestedScrollEnabled 
                renderItem={({item}) => <IconRow setSelected={(name) => setIconName(name)} iconSelected={iconName} iconNames={item}/>} 
                contentContainerStyle={{ flexGrow: 1, }} 
                style={styles.container}
                />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 250,
        marginRight: 40,
        marginLeft: 40,
        marginBottom: 10,
        marginTop: 15
    },
    mainContainer: {
        marginTop: 10
    },
    header: {
        flexDirection: 'column',
        marginLeft: 34
    },
    searchBar: {
        flexDirection: 'row',
        marginTop: 15
    },
    searchBarInput: {
        fontSize: 22,
        color: WHITE,
        marginLeft: 10,
        flex: 1
    }
})

export default Icons