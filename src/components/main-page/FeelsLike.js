import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { intoTemp } from "../../lib/_utils";
const FeelsLike = ({ weather, unit }) => {
    const [weatherData, setWeatherData] = useState();

    useEffect(() => {
        const data = weather ? weather : null;
        setWeatherData(d => data);
    }, [weather]);
    
    const feelsLike = weatherData ? intoTemp(weatherData.main.feels_like, unit) : '...';
    return (
        <View style={styles.boxStyle}>
            <Text style={styles.infoLabel}>Feels Like</Text>
            <Text style={styles.textStyle}>{feelsLike}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    boxStyle: {
        backgroundColor: '#29B6F6', // Lighter blue for day
        borderRadius: 75,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20,
        justifyContent: 'center', // Center content vertically
    },
    infoLabel: {
        color: 'white',
        fontSize: 20,
        alignSelf: 'flex-start',
        marginTop: 10, // Add margin-top for spacing
    },
    textStyle: {
        color: 'white',
        fontSize: 30,
        marginTop: 10,
    },
    error: {
        color: 'red'
    },
});

export default FeelsLike;