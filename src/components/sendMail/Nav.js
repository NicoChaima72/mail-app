import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { closeSendMessage } from "../../actions/ui";

const Nav = () => {
  const dispatch = useDispatch();

  const handleCloseSendMesage = () => {
    dispatch(closeSendMessage());
  };

  return (
    <div className="flex items-center justify-between bg-gray-500 p-2 rounded text-white">
      <h4>New message</h4>
      <div className="cursor-pointer" onClick={handleCloseSendMesage}>
        <CloseIcon></CloseIcon>
      </div>
    </div>
  );
};

export default Nav;
