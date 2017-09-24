import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import AnnouncementsReducer from './reducer_announcements';
import JobCategoriesReducer from './reducer_jobcategories';
import UserReducer from './reducer_user';

const rootReducer = combineReducers({
  form: formReducer,
  announcements: AnnouncementsReducer,
  token: UserReducer,
  announcement_categories: JobCategoriesReducer
});
export default rootReducer;
