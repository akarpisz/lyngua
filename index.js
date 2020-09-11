const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const app = express();
const api = require("./routes/api");

const PORT = process.env.PORT || 5001;


require("dotenv").config(path.join(__dirname, "/.env"));
const cors = require("cors");


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/lyngua", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
});


app.use(cors());

// app.use(cors({
// 	origin: process.env.ALLOW_ORIGIN,
// 	credentials: true,
// 	allowedHeaders: "X-Requested-With, Content-Type, Authorization",
// 	methods: "GET, POST, PATCH, PUT, POST, DELETE, OPTIONS"
// }));

app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(logger("dev"));
app.use("/api", api);
app.get("/*", (req, res)=>{
	return res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, ()=>{
	console.log(`App started, server listening on port ${PORT}`);
});