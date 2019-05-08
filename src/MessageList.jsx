import React, {Component} from 'react';
import Message  from './Message.jsx';



export default function MessageList(props) {
  const listMessage = props.messages.map((mess) =>{return <Message key={mess.id} username ={mess.username} content={mess.content} />});

    return (
    <main className="messages">
    {listMessage}
    </main>


    );

}



