const io = require('socket.io-client');
import Constants from "expo-constants";

let hostUri = Constants.expoConfig.hostUri;

let final = hostUri.substring(0, hostUri.length - 5);

let PORT = 8000;

const socket = io(`http://${final}:${PORT}`, {
    recconection: true, 
    recconectionAttempts: Infinity,
    extraHeaders: {
        Authorization: ''
    }
});

export default socket