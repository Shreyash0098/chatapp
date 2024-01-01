import { useEffect, useState } from "react";

const ForgotPSW = () => {
  const [newPSW, setnewPSW] = useState("");
  const [conformPSW, setConformPSW] = useState("");
  const [match, setMatch] = useState(false);

  const handleReset = (e) => {
    e.preventDefault();
    if (newPSW && conformPSW === "") {
      return;
    }
  };

  useEffect(() => {
    if (newPSW && conformPSW === "") {
      setMatch(false);
    }
    if (newPSW === conformPSW) {
      setMatch(true);
    } else {
      setMatch(false);
    }
  }, [newPSW, conformPSW]);

  return (
    <div className="h-screen bg-[#a7bcff] py-20 p-4 md:p-20 lg:p-32">
      <div className="max-w-sm bg-white rounded-lg overflow-hidden shadow-lg mx-auto ga">
        <div className="p-6">
          <div className="title flex flex-col justify-center items-center">
            <span className="logo font-bold text-[25px] text-[#5d5d8d]">
              Chat App
            </span>
            <span className="title text-[#5d5d8d] p-1">Reset password</span>
          </div>
          <form
            className="form"
            onSubmit={(e) => {
              handleReset(e);
            }}
          >
            <span>New password</span>
            <input
              className="my-3 shadow appearance-none border rounded w-full py-3 px-3 border-[#a7bcff] text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="newPSW"
              type="password"
              placeholder="New password"
              value={newPSW}
              onChange={(e) => {
                setnewPSW(e.target.value);
              }}
            />
            <input
              className="my-3 shadow appearance-none border rounded w-full py-3 px-3 border-[#a7bcff]   text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="conforPSW"
              type="password"
              placeholder="Conform password"
              value={conformPSW}
              onChange={(e) => {
                setConformPSW(e.target.value);
              }}
            />
            <p className="text-[#5d5d8d] text-[12px]"></p>
            {match ? (
              <button
                className="bg-[#7b96ec] hover:bg-[#9cb3fc] text-white font-bold py-2 px-4 w-[100%] rounded focus:outline-none focus:shadow-outline my-4"
                type="submit"
                onClick={(e) => {
                  handleReset(e);
                }}
              >
                Update password
              </button>
            ) : (
              <p>passwords not match </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPSW;
