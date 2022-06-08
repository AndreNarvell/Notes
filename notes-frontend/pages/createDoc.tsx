import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import type { NextPage } from "next";
import Link from "next/link";
import { ChangeEvent, useEffect, useRef, useState } from "react";

const createDoc: NextPage = () => {
  const editorRef: any = useRef(null);

  const [success, setSuccess] = useState(false);

  //Solving next issue with LS
  const lsUser =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;

  const [newDoc, setNewDoc] = useState({
    userId: lsUser,
    title: "",
    context: "",
  });

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewDoc({ ...newDoc, [e.target.name]: e.target.value });
  };

  const handleEditor = (e: any) => {
    setNewDoc({ ...newDoc, context: e });
  };

  const handlePost = () => {
    postDoc();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
    console.log(newDoc);
    console.log(lsUser);
  };

  const postDoc = async () => {
    await axios.post("http://localhost:3000/docs/new", newDoc);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <h1 className="mb-1 m-10 text-xl font-medium text-center text-gray-900 dark:text-white">
        Add your note!
      </h1>
      <div className="md:w-8/12 lg:w-5/12  ">
        {success && (
          <p className="flex text-white flex-col items-center justify-center py-2">
            New note added! Niiice
          </p>
        )}
        <input
          name="title"
          type="text"
          className="mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          placeholder="Title"
          onChange={handleInput}
        />
        <Editor
          apiKey="t33midtt5o5z427nscmgzaeomfn0p6wypcipk0wnhta1st0v"
          id="textEditor"
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue=""
          init={{
            height: 500,
            menubar: false,
            toolbar:
              "undo redo | formatselect | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px;}",
          }}
          onEditorChange={handleEditor}
        />

        <button
          onClick={handlePost}
          className=" my-2 mr-2 inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add document
        </button>
        <Link href={"/"}>
          <button className="inline-flex px-7 py-2 font-medium text-sm text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
            Go back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default createDoc;
