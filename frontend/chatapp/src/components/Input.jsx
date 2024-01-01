import att from "../images/attach.png";
import React, { useContext, useEffect, useState } from "react";
import loadGif from "../images/load.gif";

import { AuthContext } from "../context/Authcontext";
import { ChatContext } from "../context/Chatcontext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuid } from "uuid";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import InputEmoji from "react-input-emoji";

const Input = () => {
  const [img, setImg] = useState(null);
  const [imgURl, setimgURL] = useState("");
  const [loding, setLoading] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const [selectedEmoji, setSelectedEmoji] = useState();
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const generateURL = async () => {
    const data = new FormData();
    data.append("file", img);
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
        // console.log(data.url, "innnnnnnnnnnnnnn");
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    generateURL();
    setLoading(true);
  }, [img]);

  const handleSend = async (e) => {
    if (img) {
      // const storageRef = ref(storage, uuid());

      // const uploadTask = uploadBytesResumable(storageRef, img);

      // getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text: selectedEmoji,
          senderId: currentUser.uid,
          date: Timestamp.now(),
          img: imgURl,
        }),
      });
    }
    if (selectedEmoji === "" || null) {
      return;
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text: selectedEmoji,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text: selectedEmoji,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text: selectedEmoji,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setSelectedEmoji("");
    setImg(null);
    setimgURL("");
  };

  return (
    <div className="h-[65px] bg-white w-full p-[8px] flex items-center">
      <div className="flex items-center w-full">
        <InputEmoji
          value={selectedEmoji}
          onChange={setSelectedEmoji}
          cleanOnEnter
          onKeyDown={handleKeyDown}
          className="w-[100%] px-2 py-1 font-medium outline-none text-[#031526] rounded-s-lg "
          placeholder="Enter your text here!"
        />

        <div className="flex items-center gap-[10px] ">
          {/* <img src="" alt="" /> */}
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            className="file cursor-pointer"
            onChange={(e) => setImg(e.target.files[0])}
          />
          <label htmlFor="file">
            <img
              src={att}
              alt="file"
              className="h-[24px] cursor-pointer m-2 hover:scale-125"
            />
          </label>
          {!loding ? (
            <button
              className="py-[10px] px-[15px] border-none rounded-[12px] text-white flex items-center bg-[#6889f5] hover:bg-[#8da4f1]"
              onClick={(e) => handleSend(e)}
            >
              Send
            </button>
          ) : (
            <div className="flex items-center justify-center m-2">
              <img src={loadGif} alt="" className=" w-[35px] h-[35px]" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Input;
