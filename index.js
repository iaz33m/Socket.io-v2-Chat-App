var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

const port = 6600;

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket) {
  console.log("a user connected");

  socket.on("new_visitor", user => {
    console.log("new_visitor", user);
    socket.user = user;
  });

  socket.on("disconnect", function() {
    console.log("user disconnected");
  });
});

http.listen(port, function() {
  console.log(`listening on *:${port}`);
});
