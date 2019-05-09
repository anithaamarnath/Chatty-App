import React, {Component} from 'react';
import MessageList  from './MessageList.jsx';
import ChatBar  from './ChatBar.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    // this is the *only* time you should assign directly to state:
    this.state = {
      currentUser :"Bob",

      messages: [],

  };
    this.addMessage = this.addMessage.bind(this);
    this.addCurrentUser = this.addCurrentUser.bind(this);

  }

  componentDidMount() {
    var connection = new WebSocket("ws://localhost:3001");

   this.setState({connection});
  setTimeout(() => {

    // Add a new message to the list of messages in the data store
    const newMessage = {id: "3", username: "Michelle", content: "Hello there!"};
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
    }, 3000);
  }

  addMessage(content) {

      const newMessage = {username:this.state.currentUser, content: content};

        this.state.connection.send(JSON.stringify(newMessage));
        this.state.connection.onmessage = event => {
      const incomingMessage = JSON.parse(event.data);
      const oldMessage = this.state.messages;
      const newMessages = [...oldMessage, incomingMessage];
        this.setState ({
            messages: newMessages
            });
      }
  }

  addCurrentUser(username){
    this.setState({currentUser: username});
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages= {this.state.messages}/>
        <ChatBar currentUser = {this.state.currentUser} addMessage={this.addMessage} addCurrentUser={this.addCurrentUser} />
      </div>


    );
  }
}
export default App;
