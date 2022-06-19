import React, { useEffect, useState } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import { useDispatch, useSelector } from "react-redux";
import {
  activeMail,
  addNewMail,
  deleteMail,
  favouriteMail,
} from "../../features/mail/mailSlice";
import { cleanAnswers } from "../../features/answer/answerSlice";

const Nav = ({ isDeleted }) => {
  const dispatch = useDispatch();
  const { mailActive } = useSelector((state) => state.mail);
  const { uid } = useSelector((state) => state.auth.user);

  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    setIsFavourite(mailActive.options?.favourite?.[uid] || false);
  }, [mailActive, uid]);

  const handleRemoveActiveMail = () => {
    dispatch(activeMail(null));
    dispatch(cleanAnswers());
  };

  const handleDelete = () => {
    if (window.confirm("Delete mail?")) {
      dispatch(deleteMail({ userId: uid, mailId: mailActive.id }));
    }
  };

  const handleRestore = () => {
    if (window.confirm("Restore mail?")) {
      dispatch(
        deleteMail({
          userId: uid,
          mailId: mailActive.id,
          isDeleted: false,
        })
      );
      dispatch(activeMail(null));
    }
  };

  const handleFavourite = () => {
    dispatch(
      favouriteMail({
        mail: mailActive,
        userId: uid,
        path: window.location.pathname,
        isFavourite: !isFavourite,
      })
    );

    if (window.location.pathname === "/favourites" && !isFavourite === true) {
      dispatch(addNewMail(mailActive.id, mailActive));
    }
  };

  return (
    <div className="flex items-center justify-between p-4 pb-2 shadow-sm">
      <div className="cursor-pointer" onClick={handleRemoveActiveMail}>
        <div className="hidden md:block">
          <CloseIcon className=""></CloseIcon>
        </div>
        <div className="block md:hidden">
          <ArrowBackIcon className=""></ArrowBackIcon>
        </div>
      </div>
      <div className="flex items-center border divide-x">
        {!isDeleted && isFavourite && (
          <div
            className="p-1 cursor-pointer text-blue-500"
            onClick={handleFavourite}
          >
            <StarIcon></StarIcon>
          </div>
        )}
        {!isDeleted && !isFavourite && (
          <div
            className="p-1 cursor-pointer hover:text-blue-500"
            onClick={handleFavourite}
          >
            <StarBorderIcon></StarBorderIcon>
          </div>
        )}
        {isDeleted ? (
          <div
            className="p-1 cursor-pointer hover:text-blue-500"
            onClick={handleRestore}
          >
            <RestoreFromTrashIcon></RestoreFromTrashIcon>
          </div>
        ) : (
          <div
            className="p-1 cursor-pointer hover:text-red-500"
            onClick={handleDelete}
          >
            <DeleteOutlineIcon></DeleteOutlineIcon>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
