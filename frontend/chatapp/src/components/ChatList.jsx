import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/Authcontext";
import { ChatContext } from "../context/Chatcontext";
import { db } from "../firebase";

const ChatList = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="chats ">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            className="userchat flex gap-3 p-[10px] hover:bg-[#2f2d52]"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <img
              className="profile w-[50px] h-[50px] bg-white rounded-[50%]"
              src={chat[1].userInfo.photoURL}
              alt=""
            />
            <div className="flex items-center justify-between w-full">
              <div>
                <span className="text-white font-bold text-[18px]">
                  {chat[1]?.userInfo?.displayName}
                </span>
                <p className="text-[14px] text-gray-400">
                  {chat[1]?.lastMessage?.text}
                </p>
              </div>
              <div className="">
                <span className="text-gray-300">
                  {chat[1].date?.toDate().toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ChatList;
