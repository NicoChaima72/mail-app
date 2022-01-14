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

    case types.mailLoad:
      return { ...state, mails: [...action.payload] };

    case types.mailDelete:
      return {
        ...state,
        mailActive: null,
        mails: state.mails.filter((mail) => mail.id !== action.payload),
      };

    case types.mailLogoutCleaning:
      return { ...state, active: null, mails: [] };

    // TODO: Agregar favourite

    default:
      return state;
  }
};
