import React, {Component} from 'react';
import MessageList  from './MessageList.jsx';
import ChatBar  from './ChatBar.jsx';
import messages from '../messages.json';
import { generateRandomId } from "./utils.js";

class App extends Component {
  constructor(props) {
    super(props);
    // this is the *only* time you should assign directly to state:
    this.state = {

      messages: messages,
      currentUser : 'Anonymous'
};
    this.addMessage = this.addMessage.bind(this);

  }

  componentDidMount() {
    console.log("componentDidMount <App />");
  setTimeout(() => {
    console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    const newMessage = {id: "3", username: "Michelle", content: "Hello there!"};
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
  }, 3000);
}

addMessage(content) {
    const newMessage = {id: generateRandomId() , username:this.state.currentUser, content: content};
    const oldMessage = this.state.messages;
    const newMessages = [...oldMessage, newMessage];
    this.setState ({
      messages: newMessages
    });

  }


  render() {
    return (
      <div>

        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
       <MessageList messages= {this.state.messages}/>
        <ChatBar currentUser = {this.state.currentUser} addMessage={this.addMessage}/>
    </div>


    );
  }
}
export default App;
