const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { createDatabaseIfNotExists } = require('./models');
const controller = require('./controllers/controller');
const socketIo = require('socket.io');
const http = require('http');
const authJwt = require('./middleware')

const app = express();

app.use(bodyParser.json());
app.use(cors({
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
    origin: 'exp://192.168.1.235:8081'
}));

const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: "exp://192.168.1.235:8081"
    },
    connectionStateRecovery: {
        maxDisconnectionDuration: 3 * 60 * 1000, // 3 minutes
        skipMiddlewares: true
    },
    pingInterval: 25000,
    pingTimeout: 100000
},);

const PORT = process.env.PORT || 5000;

const socketPORT = 8000;

app.post('/users', controller.createUser);

app.get('/users', [authJwt.authJwt.verifyToken], controller.getUsers);

app.get('/account', [authJwt.authJwt.verifyToken], controller.createTestUser);

app.patch(`/odds/:id`, [authJwt.authJwt.verifyToken], controller.updateForTesting);

app.get(`/odds`, [authJwt.authJwt.verifyToken], controller.getOdds);

app.get(`/notifications`, [authJwt.authJwt.verifyToken], controller.getNotifications);

app.post(`/notifications`, [authJwt.authJwt.verifyToken], controller.createNotifications);

app.get(`/auth`, controller.getAuth);

app.get(`/odds/team`, [authJwt.authJwt.verifyToken], controller.getOddsByTeamName);

controller.feed();

io.on('connection', (socket) => {

    socket.on('register', async (userInfo) => {
        controller.register(socket, userInfo);
    })

    socket.on('logIn', async (userInfo) => {
        controller.logIn(socket, userInfo)
    })

    socket.on('joinRoomEmit', async (room, token) => {
        controller.handleUserJoiningRoom(socket, room, token);
    })

    socket.on('leaveRoomEmit', async (room) => {
        controller.handleUserLeavingRoom(socket, room);
    })

    socket.on('userChangesActiveBooks', async (booksActive, userId) => {
        controller.updateUserBooksActive(booksActive, userId);
    })

    socket.on('userChangesActiveChannels', async (channelsActive, userId) => {
        controller.updateUserChannelsActive(channelsActive, userId);
    })

});

setInterval(async () => {
    controller.scanOdds(io, 'basketball_ncaab');
    controller.scanOdds(io, 'basketball_nba');
    controller.scanOdds(io, 'soccer_uefa_champs_league');
    controller.scanNotifications();
}, 20000);

createDatabaseIfNotExists();

app.listen(PORT, () => {
    console.log(`Lets win some money fellas`)
});

server.listen(socketPORT, () => {
    console.log(``);
});