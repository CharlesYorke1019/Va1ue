const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { createDatabaseIfNotExists } = require('./models');
const controller = require('./controllers/controller');
const socketIo = require('socket.io');
const http = require('http');

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

app.get('/users', controller.getUsers);

app.get(`/feed`, controller.feed);

app.patch(`/odds/:id`, controller.updateForTesting);

app.get(`/odds`, controller.getOdds);

app.get(`/notifications`, controller.getNotifications);

app.post(`/notifications`, controller.createNotifications);

app.get(`/auth`, controller.createTestUser);

app.get(`/odds/team`, controller.getOddsByTeamName)

io.on('connection', (socket) => {

    socket.on('register', async (userInfo) => {
        controller.register(socket, userInfo);
    })

    socket.on('logIn', async (userInfo) => {
        controller.logIn(socket, userInfo)
    })

    socket.on('joinRoomEmit', async (room) => {
        controller.handleUserJoiningRoom(socket, room);
    })

    socket.on('leaveRoomEmit', async (room) => {
        controller.handleUserLeavingRoom(socket, room);
    })

    socket.on('userChangesActiveBooks', async (booksActive, userId) => {
        controller.updateUserBooksActive(booksActive, userId);
    })

});

setInterval(async () => {
    controller.scanOdds(io, 'basketball_ncaab');
    controller.scanOdds(io, 'basketball_nba');
    controller.scanNotifications();
}, 20000);

createDatabaseIfNotExists();

app.listen(PORT, () => {
    console.log(`Lets win some money fellas`)
});

server.listen(socketPORT, () => {
    console.log(``);
});