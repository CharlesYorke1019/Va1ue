const axios = require('axios');

module.exports = () => {
    const holder = axios.create({
        baseURL: "https://api.the-odds-api.com",
        headers: {
            "Content-Type": "application/json",
        }
    });

    return holder;
};