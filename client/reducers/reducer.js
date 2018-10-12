import { combineReducers } from 'redux';

const uid = require('uuid/v4');

const name = 0;

const memos = (state=[], action) => {
  switch (action.type) {
    case 'ADD_MEMO':
      return [{
        id: uid(),
        createTimestamp: formatDate(new Date()),
        recording: action.recording
      }, ...state];
    default:
      return state;
  }
};

const formatDate = (date) => (
  (date.getMonth() + 1) + '/'  + date.getDate() + '/' + date.getFullYear()
);

const reducer = combineReducers({ memos });

export default reducer;