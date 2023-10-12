import React from "react";
import ChatMessage from "./ChatMessage";
import ChatUserProfile from "./ChatUserProfile";

const ChatArea = () => {
  return (
    <div className="w-full flex h-full">
      <div className="w-full h-full">
        <ChatMessage />
      </div>

      <div className="w-[290px] h-full">
        <ChatUserProfile />
      </div>
    </div>
  );
};

export default ChatArea;
