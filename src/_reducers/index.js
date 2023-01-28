import { combineReducers } from 'redux';
import authentication from './authenticationReducer';
import registration from './registrationReducer';
import chatReducer from './chatReducer'
import addPostReducer from './addPostReducer'
import listPostReducer from './listPostReducer'
import postDetailReducer from './postDetailReducer'
import homeReducer from './homeReducer'
import userProfileReducer from './userProfileReducer'
import myAdsReducer from './myAdsReducer'
import postApplicationReducer from './postApplicationReducer'
import editPostAppReducer from './editPostAppReducer'
import savedAdsReducer from './savedAdsReducer'
import { reducer as toastrReducer } from "react-redux-toastr";
import componentFilterReducer from './componentRedireactionReducer'
import pendingAccountReducer from './adminReducers/pendingAccountReducer'
import listingReducer from './adminReducers/listingReducer'
import settingReducer from './adminReducers/settingReducer'
import agentReducer from './adminReducers/agentReducer'
import dmsReducer from './adminReducers/dmsReducer'
import dmsListingReducer from './adminReducers/dmsListingReducer'
import adminCommonReducer from './adminReducers/adminCommonReducer'
import applicationReducer from './adminReducers/applicationReducer'
import dashboardReducer from './adminReducers/dashboardReducer'
import billingReducer from './adminReducers/billingReducer';
import contactUsReducer from './contactUsReducer'
import dealerApplicationReducer from './dealerReducer/applicationReducer'
import dealerListingReducer from "./dealerReducer/listingReducer"
import dealerBillingReducer from "./dealerReducer/dealerBillingReducer"
import dealerDashboardReducer from './dealerReducer/dashboardReducer'
import dealerCommonReducer from './dealerReducer/adminCommonReducer'
import dealerShipReducer from './dealerReducer/dealerShipReducer'
import dealerUserReducer from './dealerReducer/dealerUserReducer'
import dealerSettingReducer from './dealerReducer/dealerSettingReducer'
const authReducer = combineReducers({
  authentication,
  registration,
});

const postApplication = combineReducers({
  postApplicationReducer
})
const componentFilter = combineReducers({
  componentFilterReducer,
})

const adPostReducers = combineReducers({
  addPostReducer,
  listPostReducer,
  postDetailReducer,
  editPostAppReducer
})
const adsReducer = combineReducers({
  myAdsReducer,
  savedAdsReducer
})

const adminAccounts = combineReducers({
  dashboardReducer,
  pendingAccountReducer,
  listingReducer,
  settingReducer,
  agentReducer,
  applicationReducer,
  adminCommonReducer,
  dmsReducer,
  dmsListingReducer,
  billingReducer
})
const adminReducer = combineReducers({
  adminAccounts,
})
const dealerAdminReducer = combineReducers({
  dealerApplicationReducer,
  dealerListingReducer,
  dealerBillingReducer,
  dealerDashboardReducer,
  dealerCommonReducer,
  dealerShipReducer,
  dealerUserReducer,
  dealerSettingReducer
})
const rootReducer = combineReducers({
  toastr: toastrReducer, // <- Mounted at toastr.
  authReducer,
  dealerAdminReducer,
  postApplication,
  adsReducer,
  userProfileReducer,
  homeReducer,
  adPostReducers,
  chatReducer,
  componentFilter,
  contactUs: contactUsReducer,
  adminReducer
})
export default rootReducer;