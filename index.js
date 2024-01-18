const app = require('express')();
const server = require('http').createServer(app)
const io = require('socket.io')(server);
const PORT = 3000

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/chat.html');
});

server.listen(PORT, () => {
  console.log('Server is running on port: ' + PORT);
});

io.on('connection', (socket) => {

  socket.on('disconnect', () => {
    io.emit('send message', { message: `${socket.username} has left the chat`, user: "Verlaat Bot" })
  });

  socket.on('new message', (msg) => {
    console.log(socket.username, ":", msg)
    io.emit('send message', { message: msg, user: socket.username });
  });

  socket.on('new user', (usr) => {
    socket.username = usr;
    io.emit('send message', { message: `${socket.username} Is de chat gejoind NULL is de Root bot`, user: "Welkom bot" })
  });
});
