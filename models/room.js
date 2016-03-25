var gameStates = ["setup", "selecting", "voting", "mission", "revealing"]
var spies = [0,0,1,0,0,2,2,3,3,3,5];
var missionCounts = {
  1:[0,0,0,0,0],
  3:[99,2,1,3,4],
  5:[2,3,2,3,3],
  6:[2,3,4,3,4],
  7:[2,3,3,4,4],
  8:[3,4,4,5,5],
  9:[3,4,4,5,5],
  10:[3,4,4,5,5]
}
function Room(user){
  this.users = [];
  this.gameState = gameStates[0];
  this.id = getRandomRoomName(5);
  this.mission = 0;
  this.missions = [];
  this.roles = {}
  this.missionLead = 0;
  this.players = 0;
  this.missionUsers = 0;

}

function getRandomRoomName(length) {
  var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var text = "";
  for (var i = 0; i < length; i++) {
    text += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }
  return text;
}

Room.prototype.initGame = function(){
  var room = this;
  room.players = room.users.length;
  var spyCount = spies[room.players];
  var roleArray = room.users;
  console.log(roleArray);
  while (spyCount>0){
    var i = Math.floor(Math.random()*roleArray.length);
    room.roles[roleArray[i]] = 'evil';
    roleArray.splice(i,1);
    spyCount--;
  }
  for (var k = 0; k<roleArray.length; k++){
    room.roles[roleArray[k][0]] = 'good';
  }
  console.log(room);
  room.missionLead = Math.floor(Math.random()*room.users.length);
  this.initSelecting();
}

Room.prototype.initSelecting = function(){
  var room = this;
  room.gameState = gameStates[1];
  if (room.missionLead == room.players-1){
    room.missionLead = 0;
  }else{
    room.missionLead+=1;
  }
  room.missionUsers = missionCounts[room.players][room.mission];
}

function shuffleArr(arr){
}

module.exports = Room;
