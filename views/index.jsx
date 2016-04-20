var socket = io();

import React from 'react';
import {render} from 'react-dom';

var Root = React.createClass({
  displayName: 'Root',
  getInitialState : function(){
    return {name:'',roomName:'', inLobby:false}
  },
  createRoom: function(){
    socket.emit('createRoom', this.state.name)

  },

  joinRoom: function(){

  },

  nameChanged: function(data){
      this.setState({name:data.target.value});
      console.log("name changing to : "+this.state.name);
  },

  roomChanged: function(data){
      this.setState({roomName:data.target.value});
      console.log("room namechanging to : "+this.state.roomName);
  },

  render : function(){
    return(
      <div id="root">
        <PreLobby createRoom = {this.createRoom}
                  name = {this.state.name}
                  joinRoom = {this.joinRoom}
                  roomName = {this.state.roomName}
                  nameChanged = {this.nameChanged}
                  roomChanged = {this.roomChanged}
                  class = {this.state.inLobby ? '' : 'hidden'}/>
        <Lobby class = {this.state.inLobby ? '' : 'hidden'}/>
      </div>
    )
  }
})
var PreLobby = React.createClass({
  displayName: 'PreLobby',
  getInitialState: function(){
    return {room:{}}
  },
  _userJoined: function(room){

  },
  componentDidMount: function(){
    socket.on('user joined', this._userJoined);
  }

  render: function() {
    return (
      <div id="preLobby" className = {this.props.class}>
        <input id = "n"
               autoComplete = "off"
               value= {this.props.name}
               onChange = {this.props.nameChanged}/>
        <input id = "r"
               autoComplete = "off"
               value = {this.props.roomName}
               onChange = {this.props.roomChanged}/>
        <RoomButton id = "createRoom"
                    onClick = {this.props.createRoom}>
          Create Room
        </RoomButton>
        <RoomButton id = "joinRoom"
                    onClick = {this.props.joinRoom}>
          Join Room
        </RoomButton>
      </div>
    );
  }
})



var RoomButton =React.createClass({
  render: function(){
    return(
      <button className="btn btn-default"
        id ={this.props.id}
        onClick = {this.props.onClick}>
        {this.props.children}
      </button>
    )
  }
})

var Lobby = React.createClass({

  getInitialState : function(){
    return {
      users:[],
      gameState:'setup',
      roomId :'',
      mission : '0',
      missions : [],
      missionLead : '',
      messages : []
    }
  },

  componentDidMount : function(){
    socket.on('chat message',this._messageReceive)
  },

  _messageRecieve : function(msg){
      var messages = this.state.messages;
      messages.push(msg);
      this.setState({messages: messages});
  },

  render: function(){
    return(
      <div id ="lobby" className={this.props.class}>
        <RoomName data = {"Room ID: "+this.state.roomId}/>
        <UsersList users = {this.state.users}/>
        <MessageList messages = {this.state.messages}/>
        <MessageForm/>
      </div>
    )
  }
});

var MessageForm = React.createClass({
  getInitialState: function() {
  return {message: ''};
  },
  textChanged: function(msg){
    this.setState({message:msg.target.value});
    console.log("text is changing to "+this.state.message);
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var message = this.state.message.trim();
    if (!message) {
      return;
    }
    console.log("socket emitting");
    socket.emit('chat message', {message: message});
    this.setState({message:''});
  },
  render: function(){
    return(
      <form className = "messageForm"
            onSubmit={this.handleSubmit}>
        <input type="text"
          placeholder="Say something"
          value = {this.state.message}
          onChange={this.textChanged}/>
        <input type="submit" value="send"/>
      </form>
    )
  }
});
var RoomName = React.createClass({
  render:function(){
    return(
      <h1 id = "roomName">
        {this.props.data}
      </h1>
    )
  }
});

var UsersList = React.createClass({
  render:function(){
    return(
      <ul>
        {
          this.props.users.map((user, i)=>{
            return(
              <li key={i}>
                {user[1]}
              </li>
            )
          })
        }
      </ul>
    )
  }
})
var Message = React.createClass({
  render(){
    return(
      <div className="message">
      <span>{this.props.message}</span>
      </div>
    )
  }
})

var MessageList = React.createClass({
  render(){
    return(
      <div className="messageList">
        {
          this.props.messages.map((message, i)=>{
            return(
              <Message
                key={i}
                text={message.text}/>
            )
          })
        }
      </div>
    )
  }
})


render(
  <Root/>,
  document.getElementById('root')
);
