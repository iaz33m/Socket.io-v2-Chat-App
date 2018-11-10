var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

const port = 6900;

const website = "RadixCode";

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

const getOnlineUsers = () => {
  let clients = io.sockets.clients().connected;
  let sockets = Object.values(clients);
  let users = sockets.map(s => s.user);
  return users.filter(u => u != undefined);
};

io.on("connection", function(socket) {
  console.log("a user connected");

  const emitOnlineUsers = () => {
    socket.broadcast.emit("users", getOnlineUsers());
  };

  socket.on("add_user", user => {
    socket.emit("server_message", {
      name: website,
      message: `Welcome to ${website} chat !`
    });

    socket.broadcast.emit("server_message", {
      name: website,
      message: `${user.name} just Joined Chat`
    });

    socket.user = user;
    emitOnlineUsers();
  });

  socket.on("message", message => {
    message.name = socket.user.name;
    socket.broadcast.emit("message", message);
  });

  socket.on("typing", () => {
    const name = socket.user.name;
    socket.broadcast.emit("typing", `${name} is typing`);
  });

  socket.on("stopped_typing", () => {
    socket.broadcast.emit("stopped_typing");
  });

  socket.on("disconnect", function() {
    const { user } = socket;

    if (user) {
      socket.broadcast.emit("server_message", {
        name: website,
        message: `${user.name} just left chat`
      });
    }

    emitOnlineUsers();
  });
});

http.listen(port, function() {
  console.log(`listening on *:${port}`);
});
