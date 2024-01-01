import cam from "../images/cam.png";
import more from "../images/more.png";
import avt from "../images/avtar.png";
import MessagesView from "./MessagesView";
import Input from "./Input";
import { useContext } from "react";
import { ChatContext } from "../context/Chatcontext";

const Chat = () => {
  const { data } = useContext(ChatContext);
  // console.log(data.user, "username");

  return (
    <div className="chat items-center h-[65px] justify-between bg-[#5d5b8d] w-full">
      <div className="chatinfo flex justify-between h-[65px] w-full items-center">
        <span className="text text-gray-300 p-[10px]">
          {data.user.displayName}
        </span>
        <div className="flex gap-[10px] p-[10px] items-center">
          <img
            src={cam}
            alt="cam"
            className="cam h-[24px] cursor-pointer hover:scale-125"
          />
          <img
            src={avt}
            alt="add"
            className="avt h-[24px] cursor-pointer hover:scale-125"
          />
          <img
            src={more}
            alt="more"
            className="more h-[24px] cursor-pointer hover:scale-125"
          />
        </div>
      </div>
      <MessagesView />
      <Input />
    </div>
  );
};

export default Chat;
