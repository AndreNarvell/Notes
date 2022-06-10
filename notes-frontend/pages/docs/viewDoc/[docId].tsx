import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import { IDoc } from "../../../models/IDoc";

const viewDoc: NextPage = () => {
  const router = useRouter();
  const { docId } = router.query;

  const [success, setSuccess] = useState(false);
  const [edit, setEdit] = useState(false);

  const [newDoc, setNewDoc] = useState<IDoc>({
    docId: 0,
    userId: 0,
    context: "",
    created: new Date(),
  });

  const handleEditor = (a: string) => {
    setNewDoc({ ...newDoc, context: a });
  };

  const handleEditView = () => {
    setEdit(!edit);
  };

  const handleChangeDoc = () => {
    axios.post("http://localhost:3000/docs/update", newDoc);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  };

  useEffect(() => {
    if (docId && typeof docId === "string") {
      const data = axios
        .get(`http://localhost:3000/docs/view/${docId}`)
        .then((res) => {
          console.log(res.data);
          const lsUser =
            typeof window !== "undefined"
              ? (JSON.parse(localStorage.getItem("user")!) as number)
              : null;
          setNewDoc({
            ...newDoc,
            userId: lsUser!,
            docId: parseInt(docId),
            context: res.data.context,
            title: res.data.title,
            created: new Date(res.data.created),
          });
        });
    }
  }, [router]);

  return (
    <>
      {!edit ? (
        <div className="flex h-screen items-center justify-center">
          <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 ">
            <div className="flex justify-end px-4 pt-4"></div>
            <div className="flex flex-col items-center pb-10">
              <h5 className="mb-1 m-10 text-xl font-medium text-gray-900 dark:text-white">
                {newDoc.title}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400 px-5">
                {parse(newDoc.context)}
              </span>
              <span className="text-gray-600 text-sm mt-4">
                Created: {newDoc.created.toLocaleString()}
              </span>
              <div className="flex mt-2 space-x-3 lg:mt-6 px-10">
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
      ) : (
        <div className="flex min-h-screen flex-col items-center justify-center py-2">
          <h1 className="mb-1 m-10 text-xl font-medium text-gray-900 dark:text-white">
            Edit your note
          </h1>
          <Editor
            apiKey="t33midtt5o5z427nscmgzaeomfn0p6wypcipk0wnhta1st0v"
            id="textEditor"
            value={newDoc.context}
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
          {success && (
            <p className="flex text-white flex-col items-center justify-center py-2">
              Note updated!
            </p>
          )}

          <button
            onClick={handleChangeDoc}
            className=" my-2 inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save changes
          </button>

          <button
            onClick={handleEditView}
            className="inline-block px-7 py-2 font-medium text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
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
