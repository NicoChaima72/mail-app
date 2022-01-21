import { Avatar } from "@mui/material";
import React from "react";
import Button from "../Button";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { startAddAnswer } from "../../actions/answers";

const Footer = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { mailActive } = useSelector((state) => state.mail);

  const [formValues, handleInputChange, reset] = useForm({
    answer: "",
  });

  const { answer } = formValues;

  const handleSaveAnswer = async (e) => {
    e.preventDefault();
    let currentDate = await fetch("http://worldclockapi.com/api/json/utc/now");
    currentDate = await currentDate.json();

    const newAnswer = {
      user: {
        id: auth.uid,
        photoURL: auth.photoURL,
        name: auth.displayName,
        email: auth.email,
      },
      answer: {
        message: answer,
        date: new Date(currentDate.currentDateTime),
      },
    };

    dispatch(startAddAnswer(auth, mailActive, newAnswer));

    reset();
  };

  return (
    <form onSubmit={handleSaveAnswer} className="flex space-x-3 w-full">
      <Avatar src={auth.photoURL}></Avatar>
      <textarea
        rows="1"
        className="border w-full rounded p-2 focus:outline-none"
        placeholder="Message here"
        name="answer"
        value={answer}
        onChange={handleInputChange}
        required
      ></textarea>
      <Button
        title="Send"
        Icon={SendIcon}
        styles="bg-gradient-to-r from-sky-600 to-sky-400  hover:from-sky-700 hover:to-sky-500 text-white w-24 text-sm"
        isCustomColor={true}
      ></Button>
    </form>
  );
};

export default Footer;
