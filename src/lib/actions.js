import axios from 'axios';
import config from '../../config';

export const getCurrentWeather = async (lat, lon) => {
    try{
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${config.API_KEY}`);
        return response.data;        
    } catch (error){
        console.error(error);
    }
}

export const getForcast = async (lat, lon) => {
    try{
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${config.API_KEY}`)
        return response.data;
    } catch (error){
        console.error(error);
    }
}

export const getGeoCode = async (cityName) => {
    try {
        const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${config.API_KEY}`);
        
        // Map response data to a new array
        const data = response.data.map(item => ({
            name: item.name,
            lat: item.lat,
            lon: item.lon,
            country: item.country,
            state: item.state
        }));

        return data;
    } catch (error) {
        console.error('Error fetching geo code:', error);
        throw error; // Re-throw the error for handling in the calling code
    }
};

export const getCity = async (lat, lon) => {
    try{
        const response = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${config.API_KEY}`);
        const { name } = response.data[0];
        return name;
    }
    catch(error){
        console.error(error);
    }
}