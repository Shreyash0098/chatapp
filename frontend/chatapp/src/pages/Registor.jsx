import { useEffect, useState } from "react";
import add from "../images/addAvatar.png";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signup } from "../RTK/features/userSlice";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import loadGif from "../images/load.gif";

const Registor = () => {
  const [displayName, setUserName] = useState();
  const [password, setPasssword] = useState();
  const [email, setEmail] = useState();
  const [photo, setPhoto] = useState();
  const [imgURL, setimgURL] = useState("");
  const [loading, setLoading] = useState(false);

  const [err, setError] = useState(false);

  const dispatch = useDispatch();

  const navigat = useNavigate();

  const generateURL = async () => {
    const data = new FormData();
    data.append("file", photo);
    data.append("upload_preset", "chatapp");
    data.append("cloud_name", "shreyashchatapp");
    fetch("https://api.cloudinary.com/v1_1/shreyashchatapp/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setimgURL(data.url);
        setLoading(false);
      })
      .catch((err) => console.log(err));
    // console.log(res, "urlllllllllll");
  };

  useEffect(() => {
    setLoading(true);
    generateURL();
  }, [photo]);

  function clear() {
    setUserName("");
    setPasssword("");
    setEmail("");
    setPhoto("");
  }

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(imgURL);
    // navigat("/login");
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(res.user, {
        displayName,
        photoURL: imgURL,
      });
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName,
        email,
        photoURL: imgURL,
      });
      await setDoc(doc(db, "userChats", res.user.uid), {});
      dispatch(
        signup({
          displayName,
          email,
          password,
          uid: res.user.uid,
          profilePic: imgURL,
        })
      );

      navigat("/home");
    } catch (error) {
      setError(true);
    }
    clear();
  };

  return (
    <div className="h-screen bg-[#a7bcff] py-20 p-4 md:p-20 lg:p-32">
      <div className="max-w-sm bg-white rounded-lg overflow-hidden shadow-lg mx-auto">
        <div className="p-6">
          <div className="title flex flex-col justify-center items-center">
            <span className="logo font-bold text-[25px] text-[#5d5d8d]">
              Chat App
            </span>
            <span className="title text-[#5d5d8d] p-1">Registor</span>
          </div>
          <form className="form" onSubmit={(e) => handleSubmit(e)}>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-3  border-[#a7bcff] text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-3 "
              id="userName"
              type="text"
              placeholder="User name"
              value={displayName}
              onChange={(e) => setUserName(e.target.value)}
            />
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
            <input
              type="file"
              id="file"
              // value={file}
              // name="profilePic"
              className="my-2 hidden"
              onChange={(e) => {
                setPhoto(e.target.files[0]);
              }}
            />
            <label htmlFor="file" className="lab flex items-center">
              <img
                src={add}
                alt="add-avtar"
                className="add-mage w-[32px] cursor-pointer"
              />
              <span className="add text-[#8da4f1] text-[12px] pl-2 cursor-pointer">
                Add an avata
              </span>
            </label>
            {!loading ? (
              <button
                className="bg-[#7b96ec] hover:bg-[#9cb3fc] text-white font-bold py-2 px-4 w-[100%] rounded focus:outline-none focus:shadow-outline my-4"
                type="submit"
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Sign In
              </button>
            ) : (
              <div className="flex items-center justify-center m-2">
                <img src={loadGif} alt="" className=" w-[35px] h-[35px]" />
              </div>
            )}
            {err && <span> Something went wrong </span>}
            <p className="text-[#5d5d8d] text-[12px] flex justify-center  ">
              Allready have an account ? &nbsp; <Link to="/login"> Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registor;
