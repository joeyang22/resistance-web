var socket = io();
var first = true;
var roomId;
var room;
var name;
function init(){
  $('#preLobby').show();
  $('#lobby').hide();
}
function createRoom() {
  socket.emit('createRoom',$('#n').val());
  name = $('#n').val();
}

function joinRoom() {
  var data = {
    roomId: $('#r').val(),
    userId: $('#n').val()
  }
  name = $('#n').val();
  socket.emit('joinRoom',data);
}

function createGame(){
  // if (room.users.length>=5){
      socket.emit('gameStart', {roomId:roomId});
  // }else{
  //   return false;
  // }
}


//html events
$('#messageEnter').submit(function(){
  socket.emit('chatMessage', {message:name+" : "+$('#m').val(), roomId:roomId});
  $('#m').val('');
  return false;
});


$('#createRoom').click(function(){
  createRoom()
});


$('#joinRoom').click(function(){
  joinRoom()
});

$('#startGame').click(function(){
  createGame()
});

// //socket events
// socket.on('chat message', function(msg){
//   $('#messages').append($('<li>').text(msg));
// });

socket.on('user joined', function(room){
  room = room;
  if(first){
    console.log(room);
    $('#preLobby').hide();
    $('#lobby').show();
    first = false;
    for (var i = 0; i< room.users.length; i++){
      $('#playerList').append($('<li>').text(room.users[i][1]));
    }
  }else{
    $('#playerList').append($('<li>').text(room.users.pop()[1]));
  }
})

socket.on('room id', function(id){
  roomId = id;
  $('#roomName').text("Room id: "+id);
  socket.off('room id');
})

socket.on('gameStart', function(room){
  room = room;
  $('#missionLeader').text(room.users[room.missionLead][1] + " is selecting members to go on a quest");
});

socket.on('selectingMembers', function(room){
  console.log('wow!');
  $('#missionLeader').text("Choose "+room.missionUsers+" people to go on a quest.");
});
init();
