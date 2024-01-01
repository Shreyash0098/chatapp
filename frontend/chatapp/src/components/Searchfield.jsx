// import pic from "../images/IMG_20230912_103746-4GCZ0MiEx-transformed (1).png";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useContext, useState } from "react";
import { AuthContext } from "../context/Authcontext";

const Searchfield = () => {
  const [displayName, setUsername] = useState("");
  const [user, setUser] = useState("");
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);

  // console.log(currentUser, "currentuser");
  // const data = useSelector((state) => state?.user.currentUser);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", displayName)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // console.log(doc, "docccccccccccccc");
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        console.log("brooo");
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        console.log(currentUser);
        console.log(user);
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("");
  };

  return (
    <div className="search border-b border-b-white border-solid">
      <div className="searchform p-2">
        <input
          placeholder="Search a user"
          type="text"
          className="searchinput bg-transparent p-2 text-white outline-none"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          onKeyDown={handleKey}
          value={displayName}
        />
      </div>
      {err && <span>user not found</span>}
      {user && (
        <div
          className="userchat flex gap-3 p-[10px] hover:bg-[#2f2d52]"
          onClick={handleSelect}
        >
          <img
            className="profile w-[50px] h-[50px] bg-white rounded-[50%]"
            src={user.photoURL}
            alt=""
          />
          <div>
            <span className="text-white font-bold text-[18px]">
              {user.displayName}
            </span>
            {/* <p className="text-[14px] text-gray-400">hello</p> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Searchfield;
