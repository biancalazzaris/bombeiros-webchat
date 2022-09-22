const { log } = require('console');
const express = require('express');
const app = express();

//servidor do node, em vez do express
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.set('view engine', 'ejs');
app.set("views", "./app/views");

app.get('/', (req, res) => {
    res.render("index");
});

app.get('/chat', (req, res) => {
    res.render("chat");
});

app.post('/chat', (req, res) => {
    res.render("chat");
});

io.on('connection', (socket) => {
    console.log('SOCKET INSTANCE', socket.id);
    socket.on('welcome', (data) => {
        console.log('EVENTO DO CLIENTE CHEGOU NO SERVIDOR ', data);
    });
    socket.on('iniciaChat', (data) => {
        socket.emit('showMessage', data)
        console.log('Palavra recebida:', data);
    });
});



http.listen(5000, () => {
    console.log('servidor rodando: http://localhost:5000');
});
