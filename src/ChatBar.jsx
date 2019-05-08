import React, {Component} from 'react';



export default function ChatBar(props) {


    const onKeyPress = evt => {
      if(evt.key == 'Enter'){
      evt.preventDefault();
      const messageInput= evt.target;
      props.addMessage(messageInput.value);
      messageInput.value = "";
      }
    };
    return (

      <footer className="chatbar">
      <input   className="chatbar-username" placeholder="Your Name (Optional)"  defaultValue= {props.currentUser}/>
      <input onKeyPress = {onKeyPress} className="chatbar-message" name ="messageInput" placeholder="Type a message and hit ENTER"  />
      </footer>


    );


}

