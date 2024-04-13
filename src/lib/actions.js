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