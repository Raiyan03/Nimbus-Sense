import React from "react";
import { View, TextInput, Text, Button, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { getCurrentWeather } from "../../lib/actions";
import {intoTemp} from "../../lib/_utils";

const Card = ({ city, lat, lon, unit }) => {
    const [weather, setWeather] = useState();

    useEffect(()=>{
        (async () => {
            const data = await getCurrentWeather(lat, lon);
            setWeather(w => data);
        })()
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {city} - { weather ?  intoTemp(weather.main.temp, unit) : 0}
            </Text>
            <Text style={styles.desc}>{ weather ? weather.weather[0].description : ''}</Text>
            <View style={styles.line}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginTop: 10,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start"
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    line: {
        height: 1,
        backgroundColor: '#C7AEAE',
        marginTop: 5, // Adjust as needed
    },
    desc: {
        fontSize: 16,
    },
});

export default Card;