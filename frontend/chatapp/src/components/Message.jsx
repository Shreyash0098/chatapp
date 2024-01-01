import React, { useContext, useEffect, useRef } from "react";

import { AuthContext } from "../context/Authcontext";
import { ChatContext } from "../context/Chatcontext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  console.log(message);

  return (
    <div
      ref={ref}
      className={`message bg-[#ddddf7] p-[10px] flex gap-2 ${
        message.senderId === currentUser.uid && "flex-row-reverse"
      }`}
    >
      <div className="msginfo flex-col">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
          className="h-[50px] w-[50px] rounded-[50%]"
        />
        <span className=" text-gray-400">
          {message?.date?.toDate().toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </span>
      </div>
      <div className="messagecontant flex-col max-w-[80%]">
        {message.text && (
          <p
            className={`p-[10px]  ${
              message.senderId === currentUser.uid &&
              "!bg-[#a5a5ff] text-white font-medium rounded-br-[10px] rounder-tl-[10px] rounded-bl-[10px]"
            } bg-white rounded-br-[10px] rounded-tr-[10px] rounded-bl-[10px] max-w-max`}
          >
            {message.text}
          </p>
        )}
        <img
          src={message.img}
          alt=""
          className={`img m-6   ${
            message.senderId === currentUser.uid && "flex-row-reverse"
          }`}
        />
      </div>
    </div>
  );
};

export default Message;
