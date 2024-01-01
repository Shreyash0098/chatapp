import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../RTK/features/userSlice";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [password, setPasssword] = useState();
  const [email, setEmail] = useState();
  const [err, setError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function clear() {
    setPasssword("");
    setEmail("");
  }

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
    clear();
    // navigat("/home");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="h-screen bg-[#a7bcff] py-20 p-4 md:p-20 lg:p-32">
      <div className="max-w-sm bg-white rounded-lg overflow-hidden shadow-lg mx-auto ga">
        <div className="p-6">
          <div className="title flex flex-col justify-center items-center">
            <span className="logo font-bold text-[25px] text-[#5d5d8d]">
              Chat App
            </span>
            <span className="title text-[#5d5d8d] p-1">Login</span>
          </div>
          <form
            className="form"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <input
              className="my-3 shadow appearance-none border rounded w-full py-3 px-3 border-[#a7bcff] text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="my-3 shadow appearance-none border rounded w-full py-3 px-3 border-[#a7bcff]   text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPasssword(e.target.value)}
            />
            <p className="text-[#5d5d8d] text-[12px]">
              <Link to="/forgotPSW">Forgotpassword ?</Link>
            </p>
            <button
              className="bg-[#7b96ec] hover:bg-[#9cb3fc] text-white font-bold py-2 px-4 w-[100%] rounded focus:outline-none focus:shadow-outline my-4"
              type="submit"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Login
            </button>
            {err && <span>Something went wrong</span>}
            <p className="text-[#5d5d8d] text-[12px] flex justify-center">
              Don't have an account ?&nbsp;<Link to="/"> Registor</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
