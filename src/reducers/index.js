import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import AnnouncementsReducer from './reducer_announcements';
import AnnouncementsByJobReducer from './reducer_announcements_by_job';
import JobCategoriesReducer from './reducer_job_categories';
import UserReducer from './reducer_user';
import UserReviewsReducer from './reducer_user_reviews';
import UserAnnouncementsReducer from './reducer_user_announcements';
import ProfessionalReducer from './reducer_professional';
import ProfessionalsReducer from './reducer_professionals';
import ClientReducer from './reducer_client';
import SignUpReducer from './reducer_sign_up';
//import LoginReducer from './reducer_login';
import UpdateProfessionalReducer from './reducer_update_professional';
import UpdateClientReducer from './reducer_update_client';
import UpdateAnnouncementReducer from './reducer_update_announcement';
import SignUpProfessionalReducer from './reducer_sign_up_professional';
import SignUpClientReducer from './reducer_sign_up_client';
import ProfessionalByUsernameReducer from './reducer_professional_by_username';
import ClientByUsernameReducer from './reducer_client_by_username';
import PutServiceReducer from './reducer_put_service';
import PutReviewReducer from './reducer_put_review';
import GetReviewsReducer from './reducer_get_reviews';

const rootReducer = combineReducers({
  form: formReducer,
  announcements: AnnouncementsReducer,
  token: UserReducer,
  job_categories: JobCategoriesReducer,
  user_reviews: UserReviewsReducer,
  professional: ProfessionalReducer,
  client: ClientReducer,
  sign_up: SignUpReducer,
  //login: LoginReducer,
  user_announcements: UserAnnouncementsReducer,
  professionals: ProfessionalsReducer,
  announcements_by_job: AnnouncementsByJobReducer,
  update_professional: UpdateProfessionalReducer,
  update_announcement: UpdateAnnouncementReducer,
  update_client: UpdateClientReducer,
  sign_up_client:SignUpClientReducer,
  sign_up_professional:SignUpProfessionalReducer,
  logged_in_professional:ProfessionalByUsernameReducer,
  logged_in_client:ClientByUsernameReducer,
  put_service:PutServiceReducer,
  put_review:PutReviewReducer,
  get_reviews:GetReviewsReducer

});
export default rootReducer;
