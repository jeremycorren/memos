import { combineReducers } from 'redux';

const uid = require('uuid/v4');

const memos = (state=[], action) => {
  switch (action.type) {
    case 'ADD_MEMO':
      return [ ...state, {
        id: uid(),
        name: action.name,
        sound: action.sound
      }];
    default:
      return state;
  }
};

const reducer = combineReducers({ memos });

export default reducer;