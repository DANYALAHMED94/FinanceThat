import React, { Component } from "react";
import { Switch, Router, Route } from "react-router-dom";
import Home from "./pages/home";
import fairstone from "./pages/fairstone";
import AdPostSearch from "./pages/adPostSearch/AdPostSearch";
import DealerList from "./pages/adPostSearch/DealerList";
import BuyerList from "./pages/adPostSearch/BuyerList";
import DealerHowItsWork from "./pages/DealerHowItsWork";
import SellerRigister from "./pages/Registration/sellers/index";
import SignIn from "./pages/Registration/signIn";
import AdminSignIn from "./pages/Registration/AdminSignIn";
import UserSignConfirm from "./pages/Registration/UserSignConfirm";
import ForgotPassword from "./pages/Registration/forgotPassword/ForgotPassword";
import AdminForgotPassword from "./pages/Registration/forgotPassword/AdminForgotPassword";
import Password from "./pages/Registration/forgotPassword/Password";
import AdminPassword from "./pages/Registration/forgotPassword/AdminPassword";
import CoverPage from "./pages/Registration/CoverPage";
import UserRoute from "./pages/users/UserRoute";
import AddDetails from "./pages/AddDetails";
import Messages from "./pages/Messages/Messages";
import PostAdd from "./pages/post/PostAdd";
import AboutUs from "./pages/about/AboutUs";
import ContactUs from "./pages/contactUs/ContactUs";
import PrivacyPolicy from "./pages/privacy/PrivacyPolicy";
import TermsCondition from "./pages/terms&condidtion/TermsCondition";
import { history } from "./_helpers/history";
import Authenticate from "./_helpers/requireAuth";
import AdminAuthenticate from "./_helpers/requireAdminAuth";
import DealerAuthenticate from "./_helpers/requireDealerAuth";
import ClientDashboardRoutes from "./clientRoutes";
import PublicRoutes from "./PublicRoutes";
import PublicAuthRoute from "./PublicAuthRoute"
import PublicAdminAuthRoute from './PublicAdminAuthRoute'
import PdfLayout from "./PdfLayout";
import AddPostApplications from "./pages/postApplication/AddPostApplications";
import AddPostApplicationByStock from "./pages/postApplication/AddPostApplicationByStock";
import EditApplication from "./pages/editApplication/EditApplication";
import DealerEditPostApp from "./pages/editApplication/DealerEditPostApp";
import HowItsWorks from "./pages/HowItsWorks";
import BuyerSellerHowItsWorks from "./pages/BuyerSellerHowItsWorks";
import SellerHowItsWorks from "./pages/SellerHowItsWorks";
import DealerLogin from './pages/Registration/dealers/Login'
/**DMS Routes */

import DealerDashboardPostAppRoutes from './DealerDashboardPostAppRoutes'
/////////////
/**Admin Routes */
import AdminDashboard from "./admin/pages/dashboard/AdminDashboard";
import AdminDashboardRoutes from "./adminRoute";
import DealerDashboardRoutes from "./DealerRoute";
import AdminDashboardPostAppRoutes from "./adminRoutePostApp";
import PendingAccounts from "./admin/pages/accounts/pending/PendingAccount";
import PendingAccountDetail from "./admin/pages/accounts/pending/PendingAccountDetail";
import DealerAccountDetail from './admin/pages/accounts/DealerAccountDetail'
import ActiveAccount from "./admin/pages/accounts/active/ActiveAccount";
import DMS from "./admin/pages/dms";
import DMSAccount from "./admin/pages/dms/Account";
import DMSDelaerList from "./admin/pages/dms/DealerList";
import DmsDealerFeed from "./admin/pages/dms/DealerFeed";
import DmsListing from "./admin/pages/dms/Listing/DmsListing";
import DmsListingDetail from "./admin/pages/dms/Listing/DmsListingDetail";
import ActiveAccountDetail from "./admin/pages/accounts/active/ActiveAccountDetail";
import PendingListing from "./admin/pages/listings/pendingListing/PendingListing";
import PendingListingDetail from "./admin/pages/listings/pendingListing/PendingListingDetail";
import AgentListing from "./admin/pages/agent/AgentLisiting";
import AgentPreview from "./admin/pages/agent/AgentPreview";
import AddNewAgent from "./admin/pages/agent/AddNewAgent";
import Setting from "./admin/pages/settings/Setting";
import ActiveListingDetail from "./admin/pages/listings/activeListing/ActiveListingDetail";
import ActiveListing from "./admin/pages/listings/activeListing/ActiveListing";
import SoldListingDetail from "./admin/pages/listings/soldListing/SoldListingDetail";
import SoldListing from "./admin/pages/listings/soldListing/SoldListing";
import DeleteListing from "./admin/pages/listings/deleteListing/DeleteListing";
import DeleteListingDetail from "./admin/pages/listings/deleteListing/DeleteListingDetail";
import ArchiveListing from "./admin/pages/listings/archiveListing/ArchiveListing";
import ExpireListing from "./admin/pages/listings/expireListing/ExpireListing";
import EditPostAdd from "./pages/editPost/EditPostAdd";
import MoreViewPostAdd from "./pages/editPostMoreView/MoreViewPostAdd";
import EditAdminApplication from "./admin/pages/application/EditAdminApplication";
import ActiveApplication from "./admin/pages/application/activeApplication/ActiveApplication";
import PendingApplication from "./admin/pages/application/pendingApplication/PendingApplication";
import ExpireListingDetail from "./admin/pages/listings/expireListing/ExpireListingDetail";
import ArchiveListingDetail from "./admin/pages/listings/archiveListing/ArchiveListingDetail";
import PdfPrint from "./admin/component/Application/PdfPrint";
import CreditReportDetail from "./admin/pages/reports/credit/CreditReportDetail";
import CoApplicantCreditReport from "./admin/pages/reports/credit/CoApplicantCreditReport";
import VerifiyIdentity from "./pages/postApplication/VerifiyIdentity";
// import DeletedApplication from "./admin/pages/application/deletedApplication/DeletedApplication";
import DeletedApplications from "./admin/pages/NewApplication/Deleted"
import CalendlyConfirmation from "./pages/CalendlyConfirmation";
import CalendlyRoutes from "./CalendlyRoutes";
import applyNowHome from "./pages/applyNowHome";
import applyNowHomeNew from "./pages/applyNowHomeNew";
import pageNotFound404 from "./pages/404page/pageNotFound404";
import Firestone from "./pages/Firestone";
import PostApplicationVerificationV2 from "./pages/postApplicationV2/postApplicationVerficationsV2";
import SubmitSuccess from "./pages/submitSuccess/SubmitSuccess";
import PersonalLoanHome from "./pages/PersonalLoan/PersonalLoanHome"
import pageNotFound404Admin from "./admin/pages/404page";
import PostApplicationV2 from "./pages/postApplicationV2/postApplicationV2";
import PersonalLoan from './pages/PersonalLoan'
import AddNewAdminApplication from "./admin/pages/application/AddNewAdminApplication";
/**Dealer Admin */
import EditDealerAdminApplication from "./dealerAdmin/pages/application/EditDealerAdminApplication"
import AddFormDealerAdminApplication from "./dealerAdmin/pages/application/AddFormDealerAdminApplication"
import GeneralApplication from "./dealerAdmin/pages/application/generalApplication/GeneralApplication"
import DealerDeletedApplication from './dealerAdmin/pages/application/deletedApplication/DealerDeletedApplication'
import DealerActiveListing from "./dealerAdmin/pages/listings/activeListing/DealerActiveListing"
import DealerActiveListingDetail from "./dealerAdmin/pages/listings/activeListing/ActiveListingDetail"
import DealerPendingListing from "./dealerAdmin/pages/listings/pendingListing/DealerPendingListing";
import DealerPendingListingDetail from "./dealerAdmin/pages/listings/pendingListing/PendingListingDetail"
import DealerSoldListing from "./dealerAdmin/pages/listings/soldListing/DealerSoldListing";
import DealerSoldListingDetail from "./dealerAdmin/pages/listings/soldListing/SoldListingDetail"
import DealerArchiveListing from "./dealerAdmin/pages/listings/archiveListing/DealerArchiveListing";
import DealerArchiveListingDetail from "./dealerAdmin/pages/listings/archiveListing/ArchiveListingDetail"
import DealerDeleteListing from "./dealerAdmin/pages/listings/deleteListing/DealerDeleteListing";
import DealerDeleteListingDetail from "./dealerAdmin/pages/listings/deleteListing/DeleteListingDetail"
import DealerExpireListing from "./dealerAdmin/pages/listings/expireListing/DealerExpireListing";
import DealerExpireListingDetail from "./dealerAdmin/pages/listings/expireListing/ExpireListingDetail";
import DealerAdminDashboard from "./dealerAdmin/pages/dashboard/DealerAdminDashboard"
import DealerBilling from "./dealerAdmin/pages/billing"
import DealerShip from "./dealerAdmin/pages/dealerShip"
import AddNewUser from "./dealerAdmin/pages/user/AddNewUser";
import UserLisiting from "./dealerAdmin/pages/user/UserLisiting";
import UserPreview from "./dealerAdmin/pages/user/UserPreview";
import DealerAdminSetting from './dealerAdmin/pages/settings/DealerAdminSetting'
import Applications from "./admin/pages/NewApplication/Application";
import ApplyNowInventory from "./pages/ApplyNowInventory"

export class Routes extends Component {
  render() {
    let adminPath = window.location.pathname ? window.location.pathname : "";
    adminPath = adminPath
      ? adminPath.split("/")[1]
        ? adminPath.split("/")[1]
        : ""
      : "";
      console.log(window.location.pathname, "admin Path")
    return (
      <Router history={history}>
        {adminPath === "admin" || adminPath === "secure" ? (
          <Switch>
            {/** Admin Routes */}
            {/* /secure/admin-login */}


            <PublicAdminAuthRoute
              path="/secure/admin-login"
              exact
              component={AdminSignIn}
            />
            <PublicAdminAuthRoute
              path="/admin/forgot-password"
              exact
              component={AdminForgotPassword}
            />
            <PublicAdminAuthRoute
              path="/admin/forgot-password/:token"
              exact
              component={AdminPassword}
            />
            <PublicAuthRoute
              path="/seller/sign-up-confirm/:name"
              exact
              component={UserSignConfirm}
            />
            <AdminDashboardRoutes
              path="/admin"
              exact
              component={AdminAuthenticate(AdminDashboard)}
            />
            <AdminDashboardRoutes
              path="/admin/pending-account"
              exact
              component={AdminAuthenticate(PendingAccounts)}
            />
            {/* <AdminDashboardRoutes
              exact
              path="/admin/pending-account/:id/dealer"
              component={AdminAuthenticate(DealerAccountDetail)}
            /> */}
            <AdminDashboardRoutes
              exact
              // path="/admin/pending-account/:id/Private"
              path="/admin/pending-account/:id/:type"
              component={AdminAuthenticate(PendingAccountDetail)}
            />
            <AdminDashboardRoutes
              path="/admin/active-account"
              exact
              component={AdminAuthenticate(ActiveAccount)}
            />
            {/* <AdminDashboardRoutes
              path="/admin/active-account/:id/:type"
              component={AdminAuthenticate(ActiveAccountDetail)}
            /> *
            <AdminDashboardRoutes
              exact
              path="/admin/active-account/:id/Private"
              component={AdminAuthenticate(ActiveAccountDetail)}
            /> */}
            <AdminDashboardRoutes
              exact
              path="/admin/active-account/:id/Private"
              component={AdminAuthenticate(ActiveAccountDetail)}
            />
            <AdminDashboardRoutes
              exact
              path="/admin/active-account/:id/dealer"
              component={AdminAuthenticate(DealerAccountDetail)}
            />
            <AdminDashboardRoutes
              exact
              path="/admin/active-account/:id/dealer"
              component={AdminAuthenticate(DealerAccountDetail)}
            />
            <AdminDashboardRoutes
              path="/admin/pending-listing"
              exact
              component={AdminAuthenticate(PendingListing)}
            />
            <AdminDashboardRoutes
              path="/admin/pending-listing/:id"
              exact
              component={AdminAuthenticate(PendingListingDetail)}
            />
            <AdminDashboardRoutes
              path="/admin/active-listing"
              exact
              component={AdminAuthenticate(ActiveListing)}
            />
            <AdminDashboardRoutes
              path="/admin/active-listing/:id"
              component={AdminAuthenticate(ActiveListingDetail)}
            />
            <AdminDashboardRoutes
              path="/admin/sold-listing"
              exact
              component={AdminAuthenticate(SoldListing)}
            />
            <AdminDashboardRoutes
              path="/admin/sold-listing/:id"
              component={AdminAuthenticate(SoldListingDetail)}
            />
            <AdminDashboardRoutes
              path="/admin/delete-listing"
              exact
              component={AdminAuthenticate(DeleteListing)}
            />
            <AdminDashboardRoutes
              path="/admin/delete-listing/:id"
              component={AdminAuthenticate(DeleteListingDetail)}
            />
            <AdminDashboardRoutes
              path="/admin/archive-listing"
              exact
              component={AdminAuthenticate(ArchiveListing)}
            />
            <AdminDashboardRoutes
              path="/admin/expire-listing"
              exact
              component={AdminAuthenticate(ExpireListing)}
            />
            <AdminDashboardRoutes
              path="/admin/archive-listing/:id"
              component={AdminAuthenticate(ArchiveListingDetail)}
            />
            <AdminDashboardRoutes
              path="/admin/expire-listing/:id"
              component={AdminAuthenticate(ExpireListingDetail)}
            />
            <AdminDashboardRoutes
              path="/admin/agent-listing"
              exact
              component={AdminAuthenticate(AgentListing)}
            />
            <AdminDashboardRoutes
              path="/admin/new-agent"
              exact
              component={AdminAuthenticate(AddNewAgent)}
            />
            <AdminDashboardRoutes
              path="/admin/agent-listing/:id"
              component={AdminAuthenticate(AgentPreview)}
            />
            <AdminDashboardRoutes
              path="/admin/settings"
              exact
              component={AdminAuthenticate(Setting)}
            />
            <AdminDashboardRoutes
              path="/admin/application/approved"
              exact
              component={AdminAuthenticate(ActiveApplication)}
            />
            {/* <AdminDashboardRoutes
              path="/admin/application/pending"
              exact
              component={AdminAuthenticate(PendingApplication)}
            /> */}
            <AdminDashboardRoutes
              path="/admin/application/pending"
              exact
              component={AdminAuthenticate(Applications)}
            />
            <AdminDashboardRoutes
              path="/admin/application/deleted"
              exact
              component={AdminAuthenticate(DeletedApplications)}
            />
            <AdminDashboardPostAppRoutes
            path="/admin/application/addNew"
            component={AdminAuthenticate(AddNewAdminApplication)}/>

            <AdminDashboardPostAppRoutes
              path="/admin/application/pending/:id"
              component={AdminAuthenticate(EditAdminApplication)}
            />
            <AdminDashboardPostAppRoutes
              path="/admin/application/approved/:id"
              component={AdminAuthenticate(EditAdminApplication)}
            />
            <AdminDashboardPostAppRoutes
              path="/admin/application/deleted/:id"
              component={AdminAuthenticate(EditAdminApplication)}
            />
            <AdminDashboardRoutes
              path="/admin/application/credit-report/:id"
              component={AdminAuthenticate(CreditReportDetail)}
            />
            <AdminDashboardRoutes
              path="/admin/application/co-applicant-credit-report/:id"
              component={AdminAuthenticate(CoApplicantCreditReport)}
            />
            <AdminDashboardRoutes
              exact
              path="/admin/dms"
              component={AdminAuthenticate(DMS)}
            />
            <AdminDashboardRoutes
              exact
              path="/admin/dms/:id/account"
              component={AdminAuthenticate(DMSAccount)}
            />
            <AdminDashboardRoutes
              exact
              path="/admin/dms/:dms_provider/dealer/:id"
              component={AdminAuthenticate(DMSDelaerList)}
            />
            <AdminDashboardRoutes
              exact
              path="/admin/dms/:dms_provider/dealer/:id/:dealer_name/feeds/:id"
              component={AdminAuthenticate(DmsDealerFeed)}
            />
            <AdminDashboardRoutes
              exact
              path="/admin/dms/:dms_provider/dealer/:id/:dealer_name/listing/:dealer_id"
              component={AdminAuthenticate(DmsListing)}
            />
            <AdminDashboardRoutes
              exact
              path="/admin/dms/:dms_provider/dealer/:id/:dealer_name/listing/:dealer_id/:listing_id"
              component={AdminAuthenticate(DmsListingDetail)}
            />
            <PdfLayout
              path="/admin/application/pdf/:id"
              exact
              component={PdfPrint}
            />
            <Route path="*" component={pageNotFound404Admin} />
            <AdminDashboardRoutes path="*" component={pageNotFound404Admin} />
            {/** Admin Routes End */}
            {/* <Layout> */}
          </Switch>
        ) : (
          <Switch>
            <CalendlyRoutes
              path="/calendly-confirmation"
              exact
              component={CalendlyConfirmation}
            />
            <PublicRoutes path="/" exact component={Home} />
            <PublicRoutes path="/fairstone" exact component={fairstone} />
            <PublicRoutes
              exact
              path="/dealer-how-it-work"
              component={DealerHowItsWork}
            />

            <PublicRoutes
              path="/seller/sign-up-confirm/:name"
              exact
              component={UserSignConfirm}
            />
            <PublicRoutes
              path="/seller/register"
              exact
              component={SellerRigister}
            />
            {/* /////// DMS */}
            <DealerDashboardRoutes
              path="/dealer-admin"
              exact
              component={DealerAuthenticate(DealerAdminDashboard)}
            />
            <DealerDashboardRoutes
              path="/dealer-admin/pending-account"
              exact
              component={DealerAuthenticate(PendingAccounts)}
            />
            <DealerDashboardRoutes
              path="/dealer-admin/pending-account/:id/:type"
              component={DealerAuthenticate(PendingAccountDetail)}
            />
            <DealerDashboardRoutes
              path="/dealer-admin/active-account"
              exact
              component={DealerAuthenticate(ActiveAccount)}
            />
            <DealerDashboardRoutes
              path="/dealer-admin/active-account/:id/:type"
              component={DealerAuthenticate(ActiveAccountDetail)}
            />
            <DealerDashboardRoutes
              path="/dealer-admin/pending-listing"
              exact
              component={DealerAuthenticate(DealerPendingListing)}
            />
            <DealerDashboardRoutes
              path="/dealer-admin/pending-listing/:id"
              exact
              component={DealerAuthenticate(DealerPendingListingDetail)}
            />
            <DealerDashboardRoutes
              path="/dealer-admin/active-listing"
              exact
              component={DealerAuthenticate(DealerActiveListing)}
            />
            <DealerDashboardRoutes
              path="/dealer-admin/active-listing/:id"
              component={DealerAuthenticate(DealerActiveListingDetail)}
            />
            <DealerDashboardRoutes
              path="/dealer-admin/sold-listing"
              exact
              component={DealerAuthenticate(DealerSoldListing)}
            />
            <DealerDashboardRoutes
              path="/dealer-admin/sold-listing/:id"
              component={DealerAuthenticate(DealerSoldListingDetail)}
            />
            <DealerDashboardRoutes
              path="/dealer-admin/delete-listing"
              exact
              component={DealerAuthenticate(DealerDeleteListing)}
            />
            <DealerDashboardRoutes
              path="/dealer-admin/delete-listing/:id"
              component={DealerAuthenticate(DealerDeleteListingDetail)}
            />
            <DealerDashboardRoutes
              path="/dealer-admin/archive-listing"
              exact
              component={DealerAuthenticate(DealerArchiveListing)}
            />
            <DealerDashboardRoutes
              path="/dealer-admin/expire-listing"
              exact
              component={DealerAuthenticate(DealerExpireListing)}
            />
            <DealerDashboardRoutes
              path="/dealer-admin/archive-listing/:id"
              component={DealerAuthenticate(DealerArchiveListingDetail)}
            />
            <DealerDashboardRoutes
              path="/dealer-admin/expire-listing/:id"
              component={DealerAuthenticate(DealerExpireListingDetail)}
            />
            <DealerDashboardRoutes
              path="/dealer-admin/users"
              exact
              component={DealerAuthenticate(UserLisiting)}
            />
            <DealerDashboardRoutes
              path="/dealer-admin/new-user"
              exact
              component={DealerAuthenticate(AddNewUser)}
            />
            <DealerDashboardRoutes
              path="/dealer-admin/users/:id"
              component={DealerAuthenticate(UserPreview)}
            />
            <DealerDashboardRoutes
              path="/dealer-admin/settings"
              exact
              component={DealerAuthenticate(DealerAdminSetting)}
            />
            {/* <DealerDashboardRoutes
              path="/dealer/application/approved"
              exact
              component={DealerAuthenticate(ActiveApplication)}
            /> */}
            <DealerDashboardRoutes
              path="/dealer-admin/application/general"
              exact
              component={DealerAuthenticate(GeneralApplication)}
            />
            <DealerDashboardRoutes
              path="/dealer-admin/application/deleted"
              exact
              component={DealerAuthenticate(DealerDeletedApplication)}
            />

            <DealerDashboardPostAppRoutes
              path="/dealer-admin/application/addForm"
              component={DealerAuthenticate(AddFormDealerAdminApplication)}
            />
            <DealerDashboardPostAppRoutes
              path="/dealer-admin/application/:id/:id"
              component={DealerAuthenticate(EditDealerAdminApplication)}
            />
            <DealerDashboardPostAppRoutes

              path="/dealer-admin/application/deleted/:id"
              component={DealerAuthenticate(EditAdminApplication)}
            />
            <DealerDashboardRoutes
              exact
              path="/dealer-admin/application-credit-report/:id"
              component={DealerAuthenticate(CreditReportDetail)}
            />
            <DealerDashboardRoutes
              exact
              path="/dealer-admin/co-applicant-credit-report/:id"
              component={DealerAuthenticate(CoApplicantCreditReport)}
            />

            <DealerDashboardRoutes
              exact
              path="/dealer-admin/billing"
              component={DealerAuthenticate(DealerBilling)}
            />
            <DealerDashboardRoutes
              exact
              path="/dealer-admin/dealership"
              component={DealerAuthenticate(DealerShip)}
            />
            <DealerDashboardRoutes
              exact
              path="/dealer-admin/dms/:id/account"
              component={DealerAuthenticate(DMSAccount)}
            />
            <DealerDashboardRoutes
              exact
              path="/dealer-admin/dms/:dms_provider/dealer/:id"
              component={DealerAuthenticate(DMSDelaerList)}
            />
            <DealerDashboardRoutes
              exact
              path="/dealer-admin/dms/:dms_provider/dealer/:id/:dealer_name/feeds/:id"
              component={DealerAuthenticate(DmsDealerFeed)}
            />
            <DealerDashboardRoutes
              exact
              path="/dealer-admin/dms/:dms_provider/dealer/:id/:dealer_name/listing/:dealer_id"
              component={DealerAuthenticate(DmsListing)}
            />
            <DealerDashboardRoutes
              exact
              path="/dealer-admin/dms/:dms_provider/dealer/:id/:dealer_name/listing/:dealer_id/:listing_id"
              component={DealerAuthenticate(DmsListingDetail)}
            />
            {/** Dealer Routes End */}
            {/* <PublicRoutes
              path="/DMS/Dashboard/:id"
              exact
              component={DMSDashboard}
            />
            <PublicRoutes
              path="/DMS/Dashboard"
              exact
              component={DMSDashboard}
            /> */}
            <PublicRoutes
              path="/DMS/application/Account/:id"
              component={EditAdminApplication}
            />
            <PublicAuthRoute path="/login" exact component={DealerLogin} />
            <PublicAuthRoute path="/dealer-login" exact component={SignIn} />
            <PublicAuthRoute
              path="/forgot-password"
              exact
              component={ForgotPassword}
            />
            <PublicAuthRoute
              path="/forgot-password/:token"
              exact
              component={Password}
            />
            <PublicAuthRoute path="/register" component={CoverPage} />
            <PublicRoutes path="/how-it-works" exact component={HowItsWorks} />
            <PublicRoutes path="/seller-how-it-work" exact component={SellerHowItsWorks} />
            <PublicRoutes path="/buyer-how-it-work" exact component={BuyerSellerHowItsWorks} />
            <PublicRoutes
              path="/post-application"
              exact
              component={AddPostApplications}
            />
            <PublicRoutes
              path="/del-application"
              component={PostApplicationV2}
            />
            <PublicRoutes
              path="/in-application/:id"
              component={PostApplicationV2}
            />
             <PublicRoutes
              path="/personal-loans/:id"
              component={PersonalLoanHome}
            />
            <PublicRoutes
              exact
              path="/personal-loans"
              component={PersonalLoanHome}
            />
  <PublicRoutes
              path="/inventory-apply"
              exact component={ApplyNowInventory}
            />
            <PublicRoutes path='/inventory-apply/:id' exact component={ApplyNowInventory} />

            <PublicRoutes
              path="/post-application-verification/:id"
              component={PostApplicationVerificationV2}
            />
            <PublicRoutes path="/apply" exact component={applyNowHome} />

             <PublicRoutes
              path="/personal-loans/:id"
              component={PersonalLoanHome}
            />
            <PublicRoutes
              exact
              path="/personal-loans"
              component={PersonalLoanHome}
            />
            {/* </Suspense> */}
            <PublicRoutes path="/apply" exact component={applyNowHome} />
            <PublicRoutes path='/applynow/' exact component={applyNowHomeNew} />
            <PublicRoutes path='/applynow/:id' exact component={applyNowHomeNew} />
            <PublicRoutes
              path="/post-application-verification/:id"
              component={PostApplicationVerificationV2}
            />
             <PublicRoutes
              path="/SubmitSuccess"
              component={SubmitSuccess}
            />
            <CalendlyRoutes
              path="/calendly-confirmation"
              exact
              component={CalendlyConfirmation}
            />
            <PublicRoutes
              path="/post-application/:id"
              exact
              component={AddPostApplicationByStock}
            />
            <PublicRoutes
              path="/verify-application/:id"
              exact
              component={VerifiyIdentity}
            />
            <PublicRoutes path="/Ad-post/list" exact component={AdPostSearch} />
            <PublicRoutes
              path="/Dealer-list/:id"
              exact
              component={DealerList}
            />
            <PublicRoutes
              path="/private-seller/:id"
              exact
              component={BuyerList}
            />
            {/* <PublicRoutes path="/Dealer-detail/:id" exact component={(DealerList)} /> */}
            <PublicRoutes
              path="/ad-post/detail/:id"
              exact
              component={AddDetails}
            />
            <PublicRoutes path="/about-us" exact component={AboutUs} />
            <PublicRoutes path="/contact-us" exact component={ContactUs} />
            <PublicRoutes path="/privacy" exact component={PrivacyPolicy} />
            <PublicRoutes path="/terms" exact component={TermsCondition} />
            {/* <ClientDashboardRoutes path="/seller/add-post" exact component={Authenticate(AddPost)} /> */}
            <ClientDashboardRoutes
              path="/buyer/my-application/:id"
              component={Authenticate(EditApplication)}
            />
            <ClientDashboardRoutes
              path="/dealer/my-application/:id"
              component={Authenticate(DealerEditPostApp)}
            />
            <ClientDashboardRoutes
              path="/seller/add-post"
              exact
              component={Authenticate(PostAdd)}
            />
            <ClientDashboardRoutes
              path="/seller/add-post/:id"
              exact
              component={Authenticate(EditPostAdd)}
            />
            <ClientDashboardRoutes
              path="/seller/add-post-more-view/:id"
              exact
              component={Authenticate(MoreViewPostAdd)}
            />
            <ClientDashboardRoutes
              path="/buyer"
              component={Authenticate(UserRoute)}
            />
            <ClientDashboardRoutes
              path="/messages"
              exact
              component={Authenticate(Messages)}
            />
            <PublicRoutes path="*" component={pageNotFound404} />
            <DealerDashboardRoutes path="*" component={pageNotFound404} />
            <AdminDashboardPostAppRoutes path="*" component={pageNotFound404Admin} />
            <PublicRoutes path="/:error" exact component={pageNotFound404} />
            {/* </Layout> */}
          </Switch>
        )}
      </Router>
    );
  }
}

export default Routes;
