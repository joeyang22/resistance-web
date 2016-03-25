var socket = io();
var first = true;
var roomId;
var room;
function init(){
  $('#preLobby').show();
  $('#lobby').hide();
}
function createRoom() {
  socket.emit('createRoom',$('#n').val());
}

function joinRoom() {
  var data = {
    roomId: $('#r').val(),
    userId: $('#n').val()
  }
  socket.emit('joinRoom',data);
}

function createGame(){
  if (room.users.length>=5){
      socket.emit('gameStart');
  }else{
    return false;
  }
}

//html events
$('#messageEnter').submit(function(){
  socket.emit('chatMessage', {message:$('#m').val(), roomId:roomId});
  $('#m').val('');
  return false;
});


$('#createRoom').click(function(){
  createRoom()
});


$('#joinRoom').click(function(){
  joinRoom()
});

//socket events
socket.on('chat message', function(msg){
  $('#messages').append($('<li>').text(msg));
});

socket.on('user joined', function(room){
  room = room;
  if(first){
    $('#preLobby').hide();
    $('#lobby').show();
    first = false;
    for (var i = 0; i< room.users.length; i++){
      $('#playerList').append($('<li>').text(room.users[i]));
    }
  }else{
    $('#playerList').append($('<li>').text(room.users.pop()));
  }
})

socket.on('room id', function(id){
  roomId = id;
  $('#roomName').text("Room id: "+id);
  socket.off('room id');
})

init();
