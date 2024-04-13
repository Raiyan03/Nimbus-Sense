export const intoTemp = (num) => {
    return Math.ceil(parseInt(num));
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
    const format = { weekday: 'long' }
    const readableTime = date.toLocaleDateString('en-us', format);
    return readableTime;
}