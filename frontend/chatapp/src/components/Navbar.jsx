import { signOut } from "firebase/auth";
// import pic from "../images/IMG_20230912_103746-4GCZ0MiEx-transformed (1).png";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/Authcontext";
import { useSelector } from "react-redux";

const Navbar = () => {
  const data = useSelector((state) => state?.user.currentUser);
  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  const logOut = () => {
    localStorage.clear();
    signOut(auth);
    navigate("/login");
  };
  console.log(data);

  return (
    <div className="navbar flex items-center h-[65px] p-[10px] justify-between bg-[#2f2d52] w-full">
      <span className="logo text-lg font-bold text-[#ddddf7]">Chat app</span>
      <div className="user flex items-center gap-2">
        <img
          className="pic w-[35px] h-[35px] bg-white rounded-[50%]"
          src={data.profilePic}
          alt="profilpic"
        />
        <span className="userName text-[#ddddf7]">{data.displayName}</span>
        <button
          className="logout bg-[#5d5b8d] hover:bg-[#6f6ea1] text-[#ddddf7] text-sm p-2 hover:scale-90 rounded-lg cursor-pointer"
          onClick={() => logOut(auth)}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
