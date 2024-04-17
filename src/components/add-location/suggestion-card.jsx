import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const SuggestionCard = ({city, country, state}) => {
  return (
    
    <View style={style.Container}>
        <Text style={style.Title}>{city}</Text>
        <Text style={style.SubTitle}>{ state? state+',' : "" } {country}</Text>
    </View>
  )
}

const style = StyleSheet.create({
    Container: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        margin: 1,
        borderRadius: 10,
    },
    Title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    SubTitle: {
        fontSize: 16,
    }
})

export default SuggestionCard