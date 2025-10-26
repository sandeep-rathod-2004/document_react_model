import React from "react";

const ChatMessage = ({ message }) => {
  const isUser = message.sender === "user";
  return (
    <div className={`chat-message ${isUser ? "user" : "ai"}`}>
      <p>{message.text}</p>
    </div>
  );
};

export default ChatMessage;
