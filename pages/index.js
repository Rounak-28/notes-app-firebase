import Head from "next/head";
import Image from "next/image";
import Note from "../components/Note";
import { useRef, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function Home() {

  const [data, setData] = useState([])

  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: "notes-app-practice.firebaseapp.com",
    projectId: "notes-app-practice",
    storageBucket: "notes-app-practice.appspot.com",
    messagingSenderId: "816643581785",
    appId: "1:816643581785:web:55b60451d27099a40e8e48",
    measurementId: "G-63MNJGMHFC",
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  const inputRef = useRef(null);

  const addNote = () => {
    try {
      addDoc(collection(db, "notes"), {
        note: inputRef.current.value,
        uuid: uuidv4(),
      });
    } catch (error) {
      console.error("error connecting to db...", error);
    }
    inputRef.current.value = "";
  };
  
  useEffect(() => {
    const fetch =async ()=>{
      const querySnapshot =await getDocs(collection(db, "notes"));
      querySnapshot.docs.map(item => setData(res => [...res, item.data()]))
    }
    fetch()
  }, [])
 
  return (
    <div className="w-[100vw] overflow-scroll flex justify-center bg-[#0f172a] px-4 overflow-x-hidden">
      <div className="w-96 h-[100vh] flex flex-col items-center">
        <div className="input my-6  w-full flex justify-between items-center">
          <input
            type="text"
            className="w-2/3 h-16 bg-[#1e293b] indent-3 text-sm rounded-md outline-none text-white"
            placeholder="Enter Your notes"
            ref={inputRef}
          />
          <button
            className="bg-blue-600 px-2 py-1 h-12 rounded-md text-sm"
            onClick={addNote}
          >
            Add Notes
          </button>
        </div> 
        {data.map(note => {
          return (
            <Note {...note} key={uuidv4()}/>
          )
        })}
      </div>
    </div>
  );
}
