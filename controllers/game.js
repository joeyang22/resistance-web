var io;
var gameSocket;
var rooms = {};
var Room = require('../models/room.js').Room;
var gameStates = ["setup", "selecting", "voting", "mission", "revealing"];

exports.initializeApp = function(socketIo, socket) {
  io = socketIo;
  gameSocket = socket;
  gameSocket.on('createRoom', createLobby);
  gameSocket.on('chatMessage', newMessage);
  gameSocket.on('joinRoom', userJoined);
  gameSocket.on('gameStart', startGame);
}

function createLobby(data){
  var socket = this;
  var room = new Room(data);
  rooms[room.id] = room;
  socket.join(room.id);
  userJoined({roomId:room.id, userId:data}, socket);

}

function userJoined(data, socket){
  var socket = socket || this;
  if (data != null && rooms[data.roomId] != null) {
    socket.join(data.roomId.toUpperCase());
    rooms[data.roomId].users.push(data.userId);
    io.in(data.roomId.toUpperCase()).emit("user joined", rooms[data.roomId.toUpperCase()]);
    io.in(data.roomId.toUpperCase()).emit('room id', data.roomId);
  } else {
    console.log("failed to join room");
  }
}

function newMessage(data){
  io.in(data.roomId).emit('chat message', data.message);
}

function startGame(data){
  rooms[data.roomId].
  io.in(data.roomId).emit(n)
}
