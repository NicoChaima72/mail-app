import React, { useState } from "react";
import Nav from "./Nav";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { saveMail } from "../../features/mail/mailSlice";
import { closeSendMessage } from "../../actions/ui";

const SendMail = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [loadingSendMail, setLoadingSendMail] = useState(-1); //-1 default | 0 enviando | 1 enviado

  const [formValues, handleInputChange, reset] = useForm({
    to: "",
    subject: "",
    message: "",
  });

  const { to, subject, message } = formValues;

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setLoadingSendMail(0);

    const sendMail = {
      user: {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL || "",
      },
      mail: {
        to,
        subject,
        message,
        date: new Date(),
        options: {
          wasSeen: { sender: true, receiver: false },
          lastUpdated: new Date(),
          thereAreAnswers: false,
        },
      },
    };

    await dispatch(
      saveMail({ mail: sendMail, path: window.location.pathname })
    );

    setLoadingSendMail(1);

    setTimeout(() => {
      reset();
      dispatch(closeSendMessage());
    }, 300);
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
              autoFocus={true}
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
              autoComplete="nope"
              maxLength={60}
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
          {loadingSendMail === -1 && (
            <button className="w-full bg-gradient-to-r from-sky-600 to-sky-400  hover:from-sky-700 hover:to-sky-500 text-white p-2 ">
              Send
            </button>
          )}
          {loadingSendMail === 0 && (
            <button className="w-full bg-gradient-to-r from-sky-500 to-sky-300 rounded text-white p-2 cursor-wait">
              Sending...
            </button>
          )}
          {loadingSendMail === 1 && (
            <button className="w-full bg-gradient-to-r from-green-600 to-green-400 rounded text-white p-2 cursor-wait">
              Sent
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default SendMail;
