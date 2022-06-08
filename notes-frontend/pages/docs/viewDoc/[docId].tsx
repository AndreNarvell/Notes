import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import type { NextPage, NextPageContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const viewDoc: NextPage = () => {
  const router = useRouter();
  router.query;
  const editorRef: any = useRef(null);

  // const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");

  const [edit, setEdit] = useState(false);
  const lsUser =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;

  const [newDoc, setNewDoc] = useState({
    userId: lsUser,
    title: "",
    context: "",
  });

  const handleEditor = (e: any) => {
    setNewDoc({ ...newDoc, context: e });
  };

  const handleEditView = () => {
    setEdit(!edit);
  };

  useEffect(() => {
    if (router.query.docId) {
      const data = axios
        .get(`http://localhost:3000/docs/view/${router.query.docId}`)
        .then((res) => {
          console.log(res.data);
          setText(res.data.context);
          setTitle(res.data.title);
        });
    }
  }, [router]);

  return (
    <>
      {!edit && (
        <div className="flex h-screen items-center justify-center">
          <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 ">
            <div className="flex justify-end px-4 pt-4"></div>
            <div className="flex flex-col items-center pb-10">
              <h5 className="mb-1 m-10 text-xl font-medium text-gray-900 dark:text-white">
                {title}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400 px-5">
                {text}
              </span>
              <div className="flex mt-4 space-x-3 lg:mt-6 px-10">
                <button
                  onClick={handleEditView}
                  className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Edit
                </button>
                <Link href={"/"}>
                  <button className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
                    Go back
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        // <div className="flex min-h-screen flex-col items-center text-center justify-center px-20">
        //   <h1>här e view</h1>
        //   <p> {text} </p>
        //   <button
        //     onClick={handleEditView}
        //     className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        //   >
        //     Edit
        //   </button>
        // <Link href={"/"}>
        //   <button className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
        //     Go back
        //   </button>
        // </Link>
        // </div>
      )}
      {edit && (
        <div className="flex min-h-screen flex-col items-center justify-center py-2">
          <h1>Här är edit</h1>
          <Editor
            apiKey="t33midtt5o5z427nscmgzaeomfn0p6wypcipk0wnhta1st0v"
            id="textEditor"
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue={text}
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
          <button className="h-6 px-5 m-2 text-white transition-colors duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700">
            Save changes
          </button>

          <button className="h-6 px-5 m-2 text-white transition-colors duration-150 bg-red-600 rounded-lg focus:shadow-outline hover:bg-red-700">
            Delete
          </button>

          <button
            onClick={handleEditView}
            className="h-6 px-5 m-2 text-white transition-colors duration-150 bg-green-500 rounded-lg focus:shadow-outline hover:bg-green-600"
          >
            Go back
          </button>
        </div>
      )}
    </>
  );
};

export default viewDoc;

// export async function getServerSideProps(context: NextPageContext) {
//   const { docId } = context.query;
//   // const { data } = await axios.get(`/api/docs/${docId}`);
//   return {
//     props: {
//       docId
//     },
//   };
// }
