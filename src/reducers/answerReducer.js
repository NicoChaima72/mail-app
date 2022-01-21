import { types } from "../types/types";

const initialState = {
  answers: [],
};

export const answerReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.answerAddNew:
      return { ...state, answers: [action.payload, ...state.answers] };

    case types.answerLoad:
      return { ...state, answers: [...action.payload] };

    case types.answerClean:
      return { ...state, answers: [] };

    default:
      return state;
  }
};
