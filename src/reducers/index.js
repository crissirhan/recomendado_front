import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import AnnouncementsReducer from './reducer_announcements';

const rootReducer = combineReducers({
  form: formReducer,
  announcements: AnnouncementsReducer 
});
export default rootReducer;
