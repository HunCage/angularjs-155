const express = require("express");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const app = express();

app.use(cookieParser());

app.use("/", express.static(__dirname + "/"));

app.get("/", function (req, res) {
	let index = fs.readFileSync("index.html", "utf8");
	console.log(index);
	res.send(index);
});

function getRequestBody(req, callBack) {
	let requestData = "";
	req.on("data", function (dataPackage) {
		requestData += dataPackage;
	});
	req.on("end", function () {
		callBack(requestData);
	});
}

app.post("/dologin", function (req, res) {
	getRequestBody(req, function (requestData) {
		let serverResponse = {
			userId: 0,
			loggedIn: false,
		};
		let user = findUser(JSON.parse(requestData));
		if (user !== null) {
			serverResponse.userId = user.id;
			serverResponse.loggedIn = true;
			res.writeHead(200, {
				"Set-Cookie": "ittoken=" + user.token,
				"Content-Type": "application/json",
			});
		}
		res.end(JSON.stringify(serverResponse));
	});
});

app.get("/users", function (req, res) {
	let user = checkUser(req, res);
	if (!user) return;

	res.send(JSON.stringify(getUsers()));
});

app.get("/checklogin", function (req, res) {
	let user = checkUser(req, res);
	if (!user) return;

	let fullResponse = {
		loggedIn: true,
		user: user,
	};
	res.send(JSON.stringify(fullResponse));
});

function findUser(loginData) {
	let currentUser = null;
	let users = getUsers();
	for (let k in users) {
		if (
			users[k].email === loginData.email &&
			users[k].pass === loginData.pass
		) {
			let d = new Date();
			let token = "token_" + d.getTime();
			currentUser = users[k];
			currentUser.id = k;
			currentUser.token = token;
			saveSession({
				id: k,
				token: token,
			});
		}
	}
	return currentUser;
}

function getUsers() {
	let users = fs.readFileSync(__dirname + "/json/user.json", "utf8");
	return JSON.parse(users);
}

function checkUser(req, res) {
	let sessions = getSessions();
	let users = getUsers();

	let cookie = req.cookies.ittoken;
	let user = false;
	for (let k in sessions) {
		if (sessions[k].token === cookie) {
			user = users[sessions[k].id];
		}
	}
	if (user !== false) {
		return user;
	} else {
		let err = { loggedIn: false };
		res.send(JSON.stringify(err));
		return false;
	}
}

app.post("/user", function (req, res) {
	let user = checkUser(req, res);
	if (!user) return;

	getRequestBody(req, function (requestData) {
		let user = JSON.parse(requestData);
		let users = getUsers();
		for (let k in users) {
			if (users[k].email === user.email) {
				for (let j in user) {
					users[k][j] = user[j];
				}
			}
		}
		fs.writeFileSync(__dirname + "/json/user.json", JSON.stringify(users));

		res.send(JSON.stringify({ success: true }));
	});
});

function getSessions() {
	let sessions = fs.readFileSync(__dirname + "/json/session.json", "utf8");
	if (sessions === "") {
		sessions = [];
	} else {
		sessions = JSON.parse(sessions);
	}
	return sessions;
}

function saveSession(sessionData) {
	let sessions = getSessions();

	sessions.push(sessionData);

	fs.writeFileSync(
		__dirname + "/json/session.json",
		JSON.stringify(sessions)
	);
}

app.listen(3000, function () {
	console.log("Example app listening on port 3000!");
});
