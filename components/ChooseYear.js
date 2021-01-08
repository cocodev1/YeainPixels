import React, { forwardRef, useEffect, useState } from "react"
import { FlatList, TouchableOpacity, StyleSheet, Text, View, ActivityIndicator } from "react-native"

import RBSheet from 'react-native-raw-bottom-sheet'
import { getYears } from "../db"
import { DARK_GRAY, MEDIUM_GRAY, WHITE } from "../styles/colors"

import moment from 'moment'

import { connect }  from 'react-redux'
import changeYear from "../redux/actions/changeYear"

var ChooseYear = forwardRef(({year, dispatch}, ref) =>  {

    const [loading, setLoading] = useState(false)

    const styles = StyleSheet   .create({
        container: {
            flex: 1,
            padding: 20,
        },
        text: {
            color: WHITE,
            fontSize: 25,
            fontWeight: 'bold',
            textAlign: 'center'
        }
    })

    const [years, setYears] = useState([])

    useEffect(() => {
        getYears().then(yearsOfDb => {
            if(!yearsOfDb.includes(moment().format('YYYY'))) {
                yearsOfDb.push(moment().format('YYYY'))
                
            }
            if(!yearsOfDb.includes(moment().year()+1)) {
                yearsOfDb.push(moment().year()+1)
            }
            setYears(yearsOfDb)
        })
    }, [])

    return (
        <View>
            <RBSheet
            ref={ref}
            closeOnPressMask={true}
            height={100}
            customStyles={{
                wrapper: {
                },
                container: {
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    backgroundColor: DARK_GRAY,
                    opacity: 1,
                },
            }}
            >
                    <FlatList
                    data={years}
                    renderItem={({item}) => {
                        return (
                            <TouchableOpacity key={item} onPress={() => {dispatch(changeYear(item)); ref.current.close()}} style={{justifyContent: 'center', padding: 10, flexDirection: 'row'}}>
                                <Text style={{...styles.text, color: item == year ? WHITE : MEDIUM_GRAY, fontSize: 28 }}>{item}</Text>
                            </TouchableOpacity>
                        )
                    }}
                    keyExtractor={({item}) => item}/>
        </RBSheet>
    </View>
    )

})


const mapStateToProps = (state) => {
    return {
        year: state.changeYearReducer.year
    }
}
export default connect(mapStateToProps, null, null, {forwardRef: true})(ChooseYear)