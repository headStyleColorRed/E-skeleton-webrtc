
const express = require("express")
const app = express();
const server = require("http").Server(app)
const io = require("socket.io")(server)
const bodyParser = require("body-parser")
const Cors = require("cors")
const { v4: uuidV4 } = require("uuid")
const port = 8893;

// Middlewares
app.use(Cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// Open port
server.listen(port, () => console.log("Listening port " + port));


// ++++++++++++++++ HTTP METHODS +++++++++++++++++++ //

app.get("/", (req, res) => {
	res.send("E-skeleton-webrtc is up and running! :D")
})


app.get("/join-room", (req, res) => {
	res.redirect(`/${uuidV4()}`)
})

app.get("/:room", (req, res) => {
	res.send("loool")
} )

app.get("/users", async (req, res) => {					//	 B O R R A R
	const users = await User.find();					//	 B O R R A R
	res.json(users);									//	 B O R R A R
});

app.get("/deleteUsers", async (req, res) => {			//	 B O R R A R
	await User.deleteMany();							//	 B O R R A R
	res.json("Users deleted");							//	 B O R R A R
});