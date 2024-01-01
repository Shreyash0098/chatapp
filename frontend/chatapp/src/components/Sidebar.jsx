import Navbar from "../components/Navbar";
import Searchfield from "./Searchfield";
import ChatList from "./ChatList";
import CreateGroup from "./CreateGroup";
import { useState } from "react";

const Sidebar = () => {
  const [createGroup, setGroup] = useState(false);

  return (
    <div className={`sidebar flex flex-col w-1/3 bg-[#3e3c61] relative`}>
      <Navbar />
      <Searchfield />
      <ChatList />
      <div className="group flex justify-center items-center absolute bottom-0 w-full mb-3">
        <button
          className="group p-4 flex justify-center items-center font-normal text-xl text-white  bg-[#5d5b8d] hover:bg-[#6f6ea1] h-12 rounded-md w-[90%] hover:scale-90"
          onClick={(e) => setGroup(true)}
        >
          <i className="fa-solid fa-plus p-1" style={{ color: "#ffffff" }}></i>
          Create group
        </button>
      </div>
      {createGroup && <CreateGroup setGroup={setGroup} />}
    </div>
  );
};

export default Sidebar;
