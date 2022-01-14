import React from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import StarBorderIcon from "@mui/icons-material/StarBorder";
// import StarIcon from "@mui/icons-material/Star";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch } from "react-redux";
import { activeMail } from "../../actions/mails";

const Nav = () => {
  const dispatch = useDispatch();

  const handleRemoveActiveMail = () => {
    dispatch(activeMail(null));
  };

  return (
    <div className="flex items-center justify-between">
      <div className="cursor-pointer" onClick={handleRemoveActiveMail}>
        <div className="hidden md:block">
          <CloseIcon className=""></CloseIcon>
        </div>
        <div className="block md:hidden">
          <ArrowBackIcon className=""></ArrowBackIcon>
        </div>
      </div>

      <div className="flex items-center border divide-x">
        <div className="p-1 cursor-pointer hover:text-blue-500">
          <StarBorderIcon></StarBorderIcon>
        </div>
        <div className="p-1 cursor-pointer hover:text-red-500">
          <DeleteOutlineIcon></DeleteOutlineIcon>
        </div>
      </div>
    </div>
  );
};

export default Nav;
