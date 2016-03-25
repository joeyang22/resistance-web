var gameStates = ["setup", "selecting", "voting", "mission", "revealing"]
var spies = [2,2,3,3,3,5];
exports.Room = function(user){
  this.users = [];
  this.gameState = gameStates[0];
  this.id = getRandomRoomName(5);
  this.mission = 0;
  this.missions = [];
  this.roles = {};
  this.init = initGame();
}

function getRandomRoomName(length) {
  var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var text = "";
  for (var i = 0; i < length; i++) {
    text += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }
  return text;
}

function initGame(){
  var spyCount = spies[users.length-5];
}
