import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "../RTK/features/userSlice";

const CreateGroup = ({ setGroup }) => {
  const [groupName, setGroupName] = useState();
  const [searcheUser, setSearchUser] = useState();
  //   const [selectedUser, setSelectedUser] = useState([]);

  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(fetchUser(searcheUser));
  };

  return (
    <div className="fixed inset-0 bg-gray-300 bg-opacity-60 flex items-center justify-center z-[1000] ">
      <div className="modelcontainer bg-white w[500px] h-[500px] relative">
        <div className="close-btn">
          <button onClick={() => setGroup(false)} className="p-2 text-xl">
            X
          </button>
        </div>
        <div className="w-full">
          <label htmlFor="Groupname" className="p-4">
            Group name
          </label>
          <input
            className="shadow appearance-none border rounded w-[90%] py-3 px-3  border-[#a7bcff] text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-3 mx-3"
            id="Groupname"
            type="text"
            placeholder="Group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>
        <div className="w-full">
          <label htmlFor="search" className="p-4">
            Scarch user
          </label>
          <input
            className="shadow appearance-none border rounded w-[90%] py-3 px-3  border-[#a7bcff] text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-3 mx-3"
            id="search"
            type="text"
            placeholder="User name"
            value={searcheUser}
            onChange={(e) => {
              setSearchUser(e.target.value);
              handleSearch(e);
            }}
          />
        </div>
        <div className="group absolute bottom-0 flex justify-center items-center w-full">
          <button className="group p-4 flex justify-center items-center font-normal text-xl text-white  bg-[#5d5b8d] hover:bg-[#6f6ea1] h-12 rounded-md w-[90%] hover:scale-90 my-3 mx-3">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;
