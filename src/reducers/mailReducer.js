import { types } from "../types/types";

const initialState = {
  mails: [],
  mailActive: null,
};

export const mailReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.mailActive:
      return { ...state, mailActive: action.payload };

    case types.mailAddNew:
      return { ...state, mails: [action.payload, ...state.mails] };

    case types.mailAddAnswer:
      return {
        ...state,
        mailActive: {
          ...state.mailActive,
          answers: [action.payload, ...state.mailActive.answers],
        },
      };

    case types.mailLoad:
      return { ...state, mails: [...action.payload] };

    case types.mailUpdate:
      return {
        ...state,
        mails: state.mails.map((mail) =>
          mail.id === action.payload.id ? action.payload.mail : mail
        ),
      };

    case types.mailDelete:
      return {
        ...state,
        mailActive: null,
        mails: state.mails.filter((mail) => mail.id !== action.payload),
      };

    case types.mailLogoutCleaning:
      return { ...state, mailActive: null, mails: [] };

    case types.mailFavourite:
      return {
        ...state,
        mailActive: {
          ...action.payload.mail,
        },
        mails: state.mails.map((mail) =>
          mail.id === action.payload.mail.id ? action.payload.mail : mail
        ),
      };
    case types.mailWasSeen:
      console.log(action.payload);
      return {
        ...state,
        mails: state.mails.map((mail) =>
          mail.id === action.payload.mail.id ? action.payload : mail
        ),
      };

    default:
      return state;
  }
};
