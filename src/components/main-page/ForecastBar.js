import React from "react";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { intoTemp, intoDay } from "../../lib/_utils"; //
 import { forecastForCurrentDay } from "../../lib/_utils";
const ForecastBar = ({ forecastData, unit }) => {
  const [forecast, setForecast] = useState();
 
  useEffect(() => {
    const data = forecastData ? forecastForCurrentDay(forecastData.list) : null;
    setForecast((f) => data);
  }, [forecastData]);
 
  if (!forecastData) {
    return <Text>Fetching forecast data...</Text>;
  }
 
  // Helper function to format date into a weekday
  const getDateOfWeek = (date) => {
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };
 
return (
    <View style={styles.forecastBar}>
        {forecast ? (
            forecast.slice(0, 7).map((dayForecast, index) => {
                const day = intoDay(dayForecast.dt);
                const temp = intoTemp(dayForecast ? dayForecast.main.temp : 0, unit );
                const feelsLike = intoTemp(dayForecast ? dayForecast.main.feels_like : 0, unit);
                return (
                    <View key={index} style={styles.forecastTab}>
                        <Text style={styles.dayText}>{day}</Text>
                        <Text style={styles.tempText}>{temp}</Text>
                        <Text style={[styles.tempText, styles.feelsLike]}>{feelsLike}</Text>
                    </View>
                );
            })
        ) : (
            <Text>Loading</Text>
        )}
    </View>
);
};
 
const styles = StyleSheet.create({
  forecastBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#46BCFE", // Your desired background color
    borderRadius: 10,
    padding: 10,
  },
  forecastTab: {
    alignItems: "center",
    gap: 5,
  },
  dayText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
  tempText: {
    fontSize: 16,
    color: "#ffffff",
  },
    feelsLike: {
        fontSize: 12,
        fontWeight: "300",
    },
});
 
export default ForecastBar;