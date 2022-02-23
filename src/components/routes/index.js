import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AboutUS from "../FooterLinks/AboutUs/AboutUs";
import CommunityGuideLine from "../FooterLinks/AboutUs/CommunityGuideLine";
import ContactUS from "../FooterLinks/AboutUs/ContactUs";
import Cookies from "../FooterLinks/AboutUs/Cookies";
import Help from "../FooterLinks/AboutUs/Help";
import InviteFriend from "../FooterLinks/AboutUs/InviteFriend";
import PrivacyPolicy from "../FooterLinks/AboutUs/PrivacyPolicy";
import PrivacySetting from "../FooterLinks/AboutUs/PrivacySetting";
import ForgotPassword from "../Login/ForgotPassword";
import ResetPassword from "../Login/ResetPassword";
import Login from "../Login/Login";
import { Paths } from "./routePaths";
import BlockedUserList from "../FooterLinks/AboutUs/BlockedUserList";
import Profile from "../FooterLinks/AboutUs/Profile";
import Home from "../Home/Home";
import Favourite from "../Home/Favourite";
import ProfileSetting from "../FooterLinks/AboutUs/ProfileSetting";
import Following from "../FooterLinks/AboutUs/Following";
import CreatePost from "../Home/CreatePost";
import Follower from "../FooterLinks/AboutUs/Followers";
import Notification from "../FooterLinks/AboutUs/Notification";
// import PrivateRoute from "./PrivateRoute";
import { ToastContainer } from "react-toastify";
import PublicReactions from "../Home/PublicReactions";
import UserListChat from "../Chating.js/UserListChat";

function Routes() {
  let email = localStorage.getItem("email");
  let isLogin = localStorage.getItem("isLogin");
  return (
    <Router>
      <ToastContainer />
      <Switch>
        {!email && !isLogin ? (
          <Route exact path={Paths.LogIn} component={Login} />
        ) : (
          <>
            <Route exact path={Paths.Help} component={Help} />

            <Route exact path={Paths.InviteFriend} component={InviteFriend} />
            <Route
              exact
              path={Paths.PrivacySetting}
              component={PrivacySetting}
            />
            <Route exact path={Paths.BlockedUser} component={BlockedUserList} />
            <Route exact path={Paths.ProfileSetUp} component={Profile} />
            <Route exact path={Paths.Home} component={Home} />
            <Route exact path={Paths.UserProfileDetail} component={Home} />
            <Route
              exact
              path={Paths.PublicReactions}
              component={PublicReactions}
            />
            <Route exact path={Paths.Favourite} component={Favourite} />
            <Route
              exact
              path={Paths.ProfileSetting}
              component={ProfileSetting}
            />
            <Route exact path={Paths.Following} component={Following} />
            <Route exact path={Paths.CreatePost} component={CreatePost} />
            <Route exact path={Paths.Follower} component={Follower} />
            <Route exact path={Paths.Notifications} component={Notification} />
            <Route exact path={Paths.UpdatePost} component={CreatePost} />
            <Route
              exact
              path={Paths.FollowingOtherUserDetail}
              component={Following}
            />
            <Route
              exact
              path={Paths.FollowerOtherUserDetail}
              component={Follower}
            />
            <Route exact path={Paths.UserChat} component={UserListChat} />
            <Route
              exact
              path={Paths.CommunityGuideLine}
              component={CommunityGuideLine}
            />
            <Route exact path={Paths.AboutUS} component={AboutUS} />
            <Route exact path={Paths.Cookies} component={Cookies} />
            <Route exact path={Paths.ContactUS} component={ContactUS} />
            <Route exact path={Paths.PrivatePolicy} component={PrivacyPolicy} />
          </>
        )}
        <Route exact path={Paths.ResetPassword} component={ResetPassword} />
        <Route
          exact
          path={Paths.CommunityGuideLine}
          component={CommunityGuideLine}
        />
        <Route exact path={Paths.AboutUS} component={AboutUS} />
        <Route exact path={Paths.Cookies} component={Cookies} />
        <Route exact path={Paths.ContactUS} component={ContactUS} />
        <Route exact path={Paths.PrivatePolicy} component={PrivacyPolicy} />
        <Route exact path={Paths.ForgotPassword} component={ForgotPassword} />
      </Switch>
    </Router>
  );
}
export default Routes;
