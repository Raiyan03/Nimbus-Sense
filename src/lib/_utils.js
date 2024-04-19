export const intoTemp = (num, unit) => {
    if (unit.trim().toLowerCase() === 'celsius') {
        return `${Math.ceil(parseInt(num))}°C`;
    } else {
        return `${Math.ceil(parseInt(intoFarenheit(num)))}°F`;
    }
}


export const intoTime = (time) => {
    const date = new Date(time * 1000)
    const format = { hour: 'numeric',  minute: 'numeric', hour12: true }
    const readableTime = date.toLocaleTimeString('en-us', format);
    return readableTime;
}

export const intoKM = (num) => {
    return Math.ceil(parseInt(num) / 1000);
}

export const intoDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const format = { day: 'numeric', month: 'numeric', year: 'numeric' }
    const readableTime = date.toLocaleDateString('en-us', format);
    return readableTime;
}

export const intoDay = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const format = { weekday: 'short' };
    const readableTime = date.toLocaleDateString('en-us', format);
    return readableTime;
}

const intoFarenheit = (celsius) => {
    const fahrenheit = (celsius * 9/5) + 32;
    return fahrenheit;
}

export const forecastForCurrentDay = (forecast) => {
    const data = forecast;
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set hours to midnight for comparison
    
    // Create a map to store objects for each day
    const objectsMap = new Map();

    data.forEach(obj => {
        const objDate = new Date(obj.dt * 1000); // Convert timestamp to milliseconds
        objDate.setHours(0, 0, 0, 0); // Set hours to midnight for comparison

        // Check if the object is for today
        if (objDate.getTime() === currentDate.getTime()) {
            return; // Skip objects for today
        }

        // Add the object to the map
        const dateString = objDate.toISOString().slice(0, 10); // Get YYYY-MM-DD format
        if (!objectsMap.has(dateString)) {
            objectsMap.set(dateString, obj);
        }
    });

    // Convert the map values to an array
    const objectsForOtherDays = Array.from(objectsMap.values());
    return objectsForOtherDays;
}