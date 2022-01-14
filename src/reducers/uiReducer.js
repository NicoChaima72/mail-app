import { types } from "../types/types";

const initialState = {
  sidebarOpen: false,
  sendMessageOpen: false,
  errors: null,
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.uiToggleSidebar:
      return { ...state, sidebarOpen: !state.sidebarOpen };

    case types.uiCloseSidebar:
      return { ...state, sidebarOpen: false };

    case types.uiShowSendMessage:
      return { ...state, sendMessageOpen: true };

    case types.uiCloseSendMessage:
      return { ...state, sendMessageOpen: false };

    case types.uiSetError:
      return {
        ...state,
        msgError: action.payload,
      };

    case types.uiRemoveError:
      return {
        ...state,
        msgError: null,
      };

    default:
      return state;
  }
};
