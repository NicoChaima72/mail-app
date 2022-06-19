import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase/firebaseConfig";
import generateId from "generate-unique-id";
import { loadAnswers } from "../../utils/loadAnswers";

const initialState = {
  loading: false,
  answers: [],
  error: "",
};

export const startFetchAnswers = createAsyncThunk(
  "answer/startFetchAnswers",
  async (mailId) => {
    const answers = await loadAnswers(mailId);
    return answers;
  }
);

export const startAddAnswer = createAsyncThunk(
  "answer/startAddAnswer",
  async ({ user, mail, answer }, thunkAPI) => {
    thunkAPI.dispatch(addAnswer({ ...answer, id: generateId() }));

    const wasSeen = `mail.options.wasSeen.${
      mail.user.email === answer.user.email ? "receiver" : "sender"
    }`;

    const update = {};
    update[wasSeen] = false;
    update["mail.options.lastUpdated"] = new Date();
    update["mail.options.lastAnswer.user.uid"] = user.uid;
    update["mail.options.lastAnswer.user.name"] = user.displayName;
    update["mail.options.lastAnswer.answer"] = answer.answer.message;
    update["mail.options.thereAreAnswers"] = true;

    await db.collection("/mails").doc(mail.id).update(update);

    await db.collection(`mails/${mail.id}/answers`).add(answer);
  }
);

const answerSlice = createSlice({
  name: "answer",
  initialState,
  reducers: {
    addAnswer: (state, action) => {
      state.answers = [action.payload, ...state.answers];
    },
    cleanAnswers: (state, action) => {
      state.answers = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(startFetchAnswers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(startFetchAnswers.fulfilled, (state, action) => {
      state.loading = false;
      state.answers = action.payload;
    });
    builder.addCase(startFetchAnswers.rejected, (state, action) => {
      console.error(action.payload.message);
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default answerSlice.reducer;
export const { cleanAnswers, addAnswer } = answerSlice.actions;
