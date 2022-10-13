const app = require("express")();
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const port = process.env.PORT;

const users = [{}];

app.get("/", (res, req) => {
  res.send("Hello server");
});

io.on("connection", (socket) => {
  console.log("Socket is active");

  socket.on("joined", ({ user }) => {
    users[socket.id] = user;

    console.log(`${user} has joined`);

    socket.emit(`welcome`, {
      user: "Admin",
      message: `Welcome to the chat ${users[socket.id]}`,
    });

    socket.broadcast.emit("userjoined", {
      user: "Admin",
      message: `${users[socket.id]} has joined`,
    });
  });

  socket.on("message", ({ message, id }) => {
    io.emit("sendMessage", { user: users[id], message, id });
  });

  socket.on("disconnect", () => {
    console.log(`User left`);

    socket.broadcast.emit("leave", {
      user: "Admin",
      message: `${users[socket.id]} has left`,
    });
  });
});

server.listen(port, () => {
  console.log(`server is active on http://localhost:${port}`);
});
