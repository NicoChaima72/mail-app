import React, { useState } from "react";
import Nav from "./Nav";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { startSaveMail } from "../../actions/mails";
import firebase from "firebase";
import { closeSendMessage } from "../../actions/ui";

const SendMail = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [loadingSendMail, setLoadingSendMail] = useState(false);

  const [formValues, handleInputChange, reset] = useForm({
    to: "",
    subject: "",
    message: "",
  });

  const { to, subject, message } = formValues;

  const handleSendMessage = (e) => {
    e.preventDefault();

    dispatch(
      startSaveMail({
        user: {
          id: auth.uid,
          name: auth.displayName,
          email: auth.email,
          photoURL: auth.photoURL || "",
        },
        mail: {
          to,
          subject,
          message,
          date: firebase.firestore.FieldValue.serverTimestamp(),
        },
        lastDates: {
          sender: firebase.firestore.FieldValue.serverTimestamp(),
          receiver: null,
        },
        aswers: {},
      })
    );

    setLoadingSendMail(true);

    setTimeout(() => {
      reset();
      dispatch(closeSendMessage());
    }, 1000);
  };

  return (
    <div className="w-11/12 h-auto mx-auto sm:w-9/12 md:w-96 fixed bottom-6 shadow-xl rounded border z-30">
      <Nav></Nav>
      <div className="py-4 px-3 bg-white overflow-y-auto">
        <form action="" className="text-sm" onSubmit={handleSendMessage}>
          <div className="mb-3">
            <label htmlFor="" className="block text-sm">
              To
            </label>
            <input
              type="email"
              className="w-full border p-2 border-gray-300 rounded"
              name="to"
              value={to}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="" className="block text-sm">
              Subject
            </label>
            <input
              type="text"
              className="w-full border p-2 border-gray-300 rounded-lg"
              name="subject"
              value={subject}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="" className="block text-sm">
              Message
            </label>
            <textarea
              className="w-full border p-2 border-gray-300 rounded"
              rows="5"
              name="message"
              value={message}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          {!loadingSendMail ? (
            <button className="w-full bg-sky-500 hover:bg-sky-400 rounded text-white p-2 ">
              Send
            </button>
          ) : (
            <button className="w-full bg-green-500 rounded text-white p-2 ">
              Sent
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default SendMail;
