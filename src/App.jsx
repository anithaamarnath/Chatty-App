import React, {Component} from 'react';
import MessageList  from './MessageList.jsx';
import ChatBar  from './ChatBar.jsx';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser :"Bob", messages: [],
      userConnected: 0};
    this.addMessage = this.addMessage.bind(this);
    this.addCurrentUser = this.addCurrentUser.bind(this);

  }


  componentDidMount() {
    var connection = new WebSocket("ws://localhost:3001");
      this.setState({connection});
        connection.onmessage = event => {
          const incomingMess = JSON.parse(event.data);

          console.log(incomingMess);
          console.log(incomingMess.type);

          const oldMessage = this.state.messages;
          const newMessages = [...oldMessage, incomingMess];
        switch(incomingMess.type) {
          case "incomingMessage":

            this.setState ({messages: newMessages});
              break;
          case "incomingNotification":

            this.setState({messages: newMessages});
              break;
          case "userConnected" :
          this.setState({userConnected:incomingMess.content});
              break;
          default:

            throw new Error("Unknown event type " + incomingMess.type);
        }
      }

  }
  addMessage(content) {
    const newMessage = {type: "postMessage",username:this.state.currentUser, content: content};
      this.state.connection.send(JSON.stringify(newMessage));

  }

  addCurrentUser(username){

    const newMessage = {type: "postNotification", content: `${this.state.currentUser} the user name is changed ${username}`};
     this.setState({currentUser: username });
    this.state.connection.send(JSON.stringify(newMessage));

  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <p className="navUser"> {this.state.userConnected} user online</p>
        </nav>
        <MessageList messages= {this.state.messages}/>
        <ChatBar currentUser = {this.state.currentUser} addMessage={this.addMessage} addCurrentUser={this.addCurrentUser} />
      </div>

    );
  }
}

export default App;
