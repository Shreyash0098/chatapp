import { useState } from "react";

const ForgotPSW = () => {
  const [email, setEmail] = useState("");

  const handleReset = (e) => {
    e.preventDefault();
  };

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
            <span>Eamil</span>
            <input
              className="my-3 shadow appearance-none border rounded w-full py-3 px-3 border-[#a7bcff] text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <button
              className="bg-[#7b96ec] hover:bg-[#9cb3fc] text-white font-bold py-2 px-4 w-[100%] rounded focus:outline-none focus:shadow-outline my-4"
              type="submit"
              onClick={(e) => {
                handleReset(e);
              }}
            >
              Reset
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPSW;
