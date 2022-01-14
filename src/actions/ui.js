import { types } from "../types/types";

export const toggleSidebar = () => ({
  type: types.uiToggleSidebar,
});

export const closeSidebar = () => ({
  type: types.uiCloseSidebar,
});

export const showSendMessage = () => ({
  type: types.uiShowSendMessage,
});

export const closeSendMessage = () => ({
  type: types.uiCloseSendMessage,
});

export const setError = (err) => ({
  type: types.uiSetError,
  payload: err,
});

export const removeError = () => ({
  type: types.uiRemoveError,
});
