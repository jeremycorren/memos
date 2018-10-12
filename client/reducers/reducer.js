import { combineReducers } from 'redux';

const uid = require('uuid/v4');

const memos = (state=[], action) => {
  switch (action.type) {
    case 'ADD_MEMO':
      return [{
        id: uid(),
        name: "New Recording",
        createTimestamp: formatDate(new Date()),
        recording: action.recording
      }, ...state];
    case 'EDIT_MEMO':
      const idxToEdit = state.findIndex(memo => memo.id == action.id);
      state[idxToEdit].name = action.name;
      return [...state];
    case 'REMOVE_MEMO':
      return state.filter(memo => memo.id != action.id);
    default:
      return state;
  }
};

const formatDate = (date) => (
  (date.getMonth() + 1) + '/'  + date.getDate() + '/' + date.getFullYear()
);

const reducer = combineReducers({ memos });

export default reducer;