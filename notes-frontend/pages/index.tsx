import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import type { NextPage } from "next";
import Link from "next/link";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { IDoc } from "../models/IDoc";

const Home: NextPage = () => {
  const [user, setUser] = useState({
    userName: "",
    userPass: "",
  });

  const [docs, setDocs] = useState<IDoc[]>([]);

  const [failure, setFailure] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);

  const login = async () => {
    const response = await axios.post("http://localhost:3000/users", user);
    console.log(response);
    if (response.data == "") {
      console.log("User not found");
      setLoggedIn(false);
      setFailure(true);
    } else {
      console.log("Found user");
      setLoggedIn(true);
      localStorage.setItem("user", JSON.stringify(response.data[0].userId));
    }
  };

  const getDocs = async () => {
    const lsUser =
      typeof window !== "undefined" ? localStorage.getItem("user") : null;
    const response = await axios.get(`http://localhost:3000/docs/${lsUser}`);
    console.log(response.data);

    setDocs(response.data);
  };

  const handleLogin = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault;
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleClick = (e: any) => {
    e.preventDefault();
    login();
    console.log(user);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setLoggedIn(false);
  };

  useEffect(() => {
    const existingUser = localStorage.getItem("user");
    if (existingUser) {
      setLoggedIn(true);
      getDocs();
    }
  }, [loggedIn]);

  let userNotes = docs.map((doc, i) => {
    return (
      <div
        key={i}
        id="card"
        className="w-50 rounded overflow-hidden shadow-lg m-4 dark:bg-gray-800"
      >
        <div className="px-6 py-4">
          <div className="font-medium text-xl mb-2 text-white ">
            {doc.title}
          </div>

          {/* <p className="text-gray-700 text-base">{doc.context}</p> */}
        </div>
        <Link href={`/docs/viewDoc/${doc.docId}`}>
          <button className="h-6 px-5 m-2 text-sm font-small text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            View
          </button>
        </Link>

        {/* <Link href={"/editDoc"}>
          <button className="h-6 px-5 m-2 text-blue-100 transition-colors duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700">
            Edit
          </button>
        </Link> */}
        <button className="h-6 px-5 m-2 text-sm font-small text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
          Delete
        </button>
      </div>
    );
  });

  return (
    <>
      {!loggedIn && (
        <div className="flex min-h-screen flex-col items-center justify-center py-2">
          <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
            <form onSubmit={handleClick}>
              <div className="mb-6">
                <input
                  type="text"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Username"
                  name="userName"
                  onChange={handleLogin}
                />
              </div>

              <div className="mb-6">
                <input
                  type="password"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Password"
                  name="userPass"
                  onChange={handleLogin}
                />
              </div>

              <button
                type="submit"
                className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
              >
                Sign in
              </button>
            </form>
            {failure && (
              <p className="flex  flex-col items-center justify-center py-2">
                Fel användarnamn eller lösenord
              </p>
            )}
          </div>
        </div>
      )}
      {loggedIn && (
        <div className="flex min-h-screen flex-col items-center justify-center py-2">
          <div className="md:w-8/12 lg:w-5/12  flex items-center justify-center flex-col ">
            <h1 className="flex  flex-col items-center justify-center px-2 py-2 text-center mt-20 font-medium text-white text-xl">
              Yes hello, here you can add a new note or edit your previous ones!
            </h1>

            <Link href={"/createDoc"}>
              <button className="inline-block px-7 py-3 mb-3 font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Create document
              </button>
            </Link>

            <button
              onClick={handleLogout}
              className="inline-block px-7 py-3 font-medium text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
            >
              Logout
            </button>
          </div>
          <div className=" w-1/2 flex flex-wrap -mb-4 items-center justify-center ">
            {userNotes}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
