"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Modal from "../Reuseable/Model";
import {
  Editor,
  EditorState,
  RichUtils,
  CompositeDecorator,
  ContentState,
  DraftEditorCommand,
  DraftHandleValue,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import "@draft-js-plugins/inline-toolbar/lib/plugin.css";
import { auth, db } from "../Firebase/Firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase/compat/app";
import NotesData from "./NotesData";
import { getAuth, signOut } from "firebase/auth";
import RichTextEditor from "./RichTextEditor";

const Link: React.FC<any> = (props) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a
      href={url}
      className="text-blue-600 underline underline-offset-4"
      onClick={(e) => {
        e.preventDefault();
        window.open(url, "_blank");
      }}
    >
      {props.children}
    </a>
  );
};

const decorators = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: Link,
  },
]);

function findLinkEntities(contentBlock: any, callback: any, contentState: any) {
  contentBlock.findEntityRanges((character: any) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "LINK"
    );
  }, callback);
}

export default function Notes() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [Error, setError] = useState("");
  const [isLinkModalOpen, setIsLinkModalOpen] = useState<boolean>(false);
  const [notesTitle, setNotesTitle] = useState<string>("");
  const [content, setContent] = useState<any>();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(decorators)
  );
  const [loading, setLoading] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openLinkModal = () => {
    setIsLinkModalOpen(true);
  };
  const closeLinkModal = () => {
    setIsLinkModalOpen(false);
  };

  const Logout = () => {
    signOut(auth).catch((error) => {
      setError(error);
    });
  };

  //   DraftJs start

  const onAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const uinqID = uuidv4();
    const ref = `UserData/${auth.currentUser?.uid}/notes/${uinqID}`;
    const UserNotesInfo = doc(db, ref);
    const mySnapshot = await getDoc(UserNotesInfo);
    if (!mySnapshot.exists()) {
      await setDoc(UserNotesInfo, {
        id: uinqID,
        note: content,
        title: notesTitle,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
        .then(() => {
          setLoading(false);
          setEditorState(EditorState.createEmpty(decorators));
          closeModal();
        })
        .then((error) => {
          console.log(error);
        });
    }
  };

  const onChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
    const contentState = newEditorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    setContent(rawContentState);
  };

  const handleKeyCommand = (command: DraftEditorCommand): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      onChange(newState);
      return "handled";
    }

    return "not-handled";
  };

  const handleBoldClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  const handleItalicClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  };
  const handleUnderLineClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  };
  const handleListClick = () => {
    onChange(RichUtils.toggleBlockType(editorState, "unordered-list-item"));
  };
  const getContentLength = () => {
    const plainText = editorState.getCurrentContent().getPlainText("");
    return plainText.length;
  };
  const getWordCount = () => {
    const plainText = editorState.getCurrentContent().getPlainText("");
    const wordArray = plainText.match(/\b\S+\b/g);
    return wordArray ? wordArray.length : 0;
  };

  const handleLinkClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const link = window.prompt("Enter a URL:");
    const link = e.target.value;
    if (!link || link.trim().length === 0) {
      onChange(
        RichUtils.toggleLink(editorState, editorState.getSelection(), null)
      );
    } else {
      const contentState = editorState.getCurrentContent();
      const contentStateWithEntity = contentState.createEntity(
        "LINK",
        "MUTABLE",
        { url: link }
      ) as ContentState;
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const newEditorState = EditorState.set(editorState, {
        currentContent: contentStateWithEntity,
      });
      onChange(
        RichUtils.toggleLink(
          newEditorState,
          newEditorState.getSelection(),
          entityKey
        )
      );
    }
  };

  // DraftJs End

  return (
    <div className="min-h-screen min-w-full my-16">
      <div className="flex justify-center min-w-full flex-row gap-4">
        <motion.input
          initial={{
            width: "0px",
          }}
          animate={{
            width: "20%",
          }}
          whileFocus={{
            width: "25%",
          }}
          transition={{
            delay: 0.2,
            type: "spring",
          }}
          className="h-12 pl-6 pr-8 rounded-full bg-purple-200 focus:outline-purple-700 outline-none pe-4 ps-4 text-sm shadow-sm"
          id="note"
          type="note"
          placeholder="note"
          autoComplete="off"
          readOnly
          onClick={openModal}
          autoFocus
        />
        <motion.div
          whileTap={{
            scale: 0.8,
          }}
          onClick={Logout}
          className="inline-block cursor-pointer my-auto rounded-full border border-indigo-600 p-3 hover:border-2 text-indigo-600 focus:outline-none focus:ring active:bg-indigo-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" x2="9" y1="12" y2="12" />
          </svg>
        </motion.div>
        <motion.div
          whileTap={{
            scale: 0.8,
          }}
          className="inline-block text-sm my-auto p-3 text-red-600 focus:outline-none focus:ring"
        >
          {Error}
        </motion.div>
      </div>
      <div className="my-4">
        <NotesData />
      </div>
      {/* <div className="mt-8 container max-w-7xl mx-auto">
        <RichTextEditor/>
      </div> */}
      <Modal
        variants="custome"
        isOpen={isModalOpen}
        onClose={closeModal}
        className="bg-white p-5 bg-whiter"
      >
        {loading ? (
          <div className="min-h-[20vh] min-w-full flex justify-center items-center">
            <span className="loader"></span>
          </div>
        ) : (
          <div className="min-w-full">
            <div className="mt-4 min-w-full flex flex-row gap-2">
              <motion.input
                className="py-2 ps-2 w-full border-b-2 md:text-lg font-outfit tracking-wide font-bold outline-none border-gray-200 pe-10 shadow-sm text-sm focus:border-black"
                id="title"
                type="title"
                placeholder="Enter your Title"
                onChange={(e) => {
                  setNotesTitle(e.target.value);
                }}
                autoComplete="off"
                onClick={openModal}
              />
            </div>
            <div className="min-w-full max-h-[75vh] bg-white rounded-xl p-3 mt-4 overflow-hidden overflow-y-scroll">
              <Editor
                editorState={editorState}
                onChange={onChange}
                handleKeyCommand={handleKeyCommand}
                placeholder="Write your note below"
              />
            </div>
            <div className="">
              <hr />
              <div className="mt-2 flex justify-between">
                <div className="flex flex-row gap-4">
                  <button
                    onClick={handleBoldClick}
                    className="bg-transparent border border-black/75 p-2 px-4 rounded-lg text-black font-outfit font-bold"
                  >
                    B
                  </button>
                  <button
                    onClick={handleItalicClick}
                    className="bg-transparent border italic border-black/75 p-2 px-4 rounded-lg text-black font-outfit font-bold"
                  >
                    I
                  </button>
                  <button
                    onClick={handleUnderLineClick}
                    className="bg-transparent border border-black/75 p-2 px-4 rounded-lg text-black font-outfit font-bold"
                  >
                    U
                  </button>
                  <button
                    onClick={openLinkModal}
                    className="bg-transparent border border-black/75 p-2 px-4 rounded-lg text-black font-outfit font-bold"
                  >
                    Link
                  </button>
                  <div className="mt-2 text-xs text-gray-600 flex flex-col gap-1 mx-auto">
                    <p>{getContentLength()} characters</p>
                    <p>{getWordCount()} Words</p>
                  </div>
                </div>
                <button
                  onClick={onAddNote}
                  disabled={getContentLength() === 0 || notesTitle === ""}
                  className="bg-blue-800 p-2 px-8 rounded-lg text-white disabled:bg-slate-400"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
      <Modal
        variants="custome"
        isOpen={isLinkModalOpen}
        onClose={closeLinkModal}
        className="bg-white p-12 bg-whiter"
      >
        <motion.input
          className="h-12 w-full pl-6 pr-8 rounded-full bg-purple-200 outline-none pe-4 ps-4 text-sm shadow-sm"
          id="Link"
          type="Link"
          placeholder="Link"
          autoComplete="off"
          onChange={handleLinkClick}
          autoFocus
        />
        <button
          onClick={closeLinkModal}
          className="bg-blue-600 w-full p-2 rounded-full mt-4 text-white font-bold tracking-wide"
        >
          Done
        </button>
      </Modal>
    </div>
  );
}
