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
      <h1>Tjena</h1>
      <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
        {success && (
          <p className="flex  flex-col items-center justify-center py-2">
            New note added! Niiiiice
          </p>
        )}
        <input
          name="title"
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            // plugins: [
            //   "advlist autolink lists link image charmap print preview anchor",
            //   "searchreplace visualblocks code fullscreen",
            //   "insertdatetime media table paste code help wordcount",
            // ],
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
          className="inline-block px-7 py-3 mb-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
        >
          Add document
        </button>
        <Link href={"/"}>
          <button className="inline-block px-7 py-3 bg-red-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full">
            go back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default createDoc;
