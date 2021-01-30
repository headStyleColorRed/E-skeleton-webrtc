const express = require("express")
const app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server, { origins: '*:*' });
const port = 8893;
const { v4: uuidV4 } = require("uuid")
const Cors = require("cors")



app.use(Cors());

server.listen(port, () => {
    console.log('server started on PORT 8893');
});

app.get('/', (req, res) => {
	res.send("E-skeleton-webrtc is up and running! :D")
});


io.on('connection', async (socket) => {
    console.log('a user connected');
    

    socket.on("join-room", (roomId) => {
        console.log("user joined room: " + roomId);
        socket.join(roomId)
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
	});
	
	socket.on('stream', (stream, id) => {
		console.log('streamiiingj');
		console.log(stream);
		console.log(id);
    });

    socket.on("message", (stream, room) => {
		console.log("streaming");
		console.log(stream);
        io.sockets.in(room).emit('server-stream', stream);
    })


});