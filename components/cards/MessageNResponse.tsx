import React from "react";

interface IMessage {
  message: string;
  ai_response: string | number;
}

const MessageNResponse = ({ message, ai_response }: IMessage) => {
  return (
    <div className="flex flex-col gap-3">
      <p className="user-message">{message}</p>
      <p className="ai-message">{ai_response}</p>
    </div>
  );
};

export default MessageNResponse;
