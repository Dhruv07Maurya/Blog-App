import React, { useState } from "react";

import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

const ChatWindow = ({ selectedPerson }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `Hi ${selectedPerson.name}! How can I help you?`,
      sender: "bot",
    },
  ]);
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        sender: "user",
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h3>Chat with {selectedPerson.name}</h3>
      </div>
      <div className="chat-body">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            text={message.text}
            sender={message.sender}
          />
        ))}
      </div>
      <MessageInput
        message={message}
        setMessage={setMessage}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default ChatWindow;
