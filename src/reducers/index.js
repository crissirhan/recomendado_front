import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import AnnouncementsReducer from './reducer_announcements';
import AnnouncementsByJobReducer from './reducer_announcements_by_job';
import JobCategoriesReducer from './reducer_job_categories';
import UserReviewsReducer from './reducer_user_reviews';
import UserAnnouncementsReducer from './reducer_user_announcements';
import ProfessionalReducer from './reducer_professional';
import ProfessionalsReducer from './reducer_professionals';
import ClientReducer from './reducer_client';
import SignUpReducer from './reducer_sign_up';
import LoginReducer from './reducer_login';
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
import ClientServicesReducer from './reducer_client_services';
import ClientReviewsReducer from './reducer_client_reviews';
import PostReviewReducer from './reducer_post_review';
import PostAnnouncementnReducer from './reducer_post_announcement';
import JobSubCategoriesReducer from './reducer_job_sub_categories';
import JobByNameReducer from './reducer_job_by_name';
import AnnouncementReviewsReducer from './reducer_announcement_reviews'
import SearchReducer from './reducer_search'

const rootReducer = combineReducers({
  form: formReducer,
  announcements: AnnouncementsReducer,
  job_categories: JobCategoriesReducer,
  user_reviews: UserReviewsReducer,
  professional: ProfessionalReducer,
  client: ClientReducer,
  sign_up: SignUpReducer,
  login: LoginReducer,
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
  get_reviews:GetReviewsReducer,
  client_services:ClientServicesReducer,
  client_reviews:ClientReviewsReducer,
  post_review:PostReviewReducer,
  post_announcement:PostAnnouncementnReducer,
  job_sub_categories: JobSubCategoriesReducer,
  job_by_name:JobByNameReducer,
  announcement_reviews:AnnouncementReviewsReducer,
  search: SearchReducer,
});
export default rootReducer;
