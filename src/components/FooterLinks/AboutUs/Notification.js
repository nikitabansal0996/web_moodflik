import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
// import "../../Login/Login.scss";
import {
  Button,
  Grid,
  Form,
  Header,
  Segment,
  Menu,
  Image,
} from "semantic-ui-react";
import { Icon, Radio } from "semantic-ui-react";
import "../../../App.scss";
import Footer from "../Footer";
import "./about-us.scss";
import "./notification.scss";
import LogoHeader from "./LogoHeader";
import { UserProfileServices } from "../../../Services/UserProfileServices";
import { toast } from "react-toastify";
var QuickBlox = require('quickblox/quickblox.min');

const userProfileServices = new UserProfileServices();

export default function Notification(props) {
  const [isLoading, setIsLoading] = React.useState(false);

  const [notificationSetting, setNotificationSetting] = React.useState({
    comments: false,
    like_dislike: false,
    every_hour: false,
    every_three_hours: false,
    every_five_hours: false,
    direct_message: false,
    chat_alert: false,
    allow_mentions: false
  })
  useEffect(() => {
    window.scrollTo(0, 0)
    setIsLoading(true);
    getNotificationSetting()

  }, []);


  const getNotificationSetting = () => {
    setIsLoading(true);
    userProfileServices.getNotificationSetting().then(
      (data) => {
        debugger
        if (data.data) {
          setNotificationSetting({
            comments: data.data.comments,
            like_dislike: data.data.like_dislike,
            every_hour: data.data.every_hour,
            every_three_hours: data.data.every_three_hours,
            every_five_hours: data.data.every_five_hours,
            direct_message: data.data.direct_message,
            chat_alert: data.data.chat_alert,
            allow_mentions: data.data.allow_mentions
          })
        }
        setIsLoading(false);
      },
      (error) => {
        setIsLoading(false);
        console.log("error.response.status", error);
      }
    );
  };

  const handleClickCheckbox = (e, type) => {
    setNotificationSetting({
      ...notificationSetting,
      [e.target.name]: e.target.checked
    })
    var tempArr = {
      comments: e.target.name == "comments" ? e.target.checked : notificationSetting.comments,
      like_dislike: e.target.name == "like_dislike" ? e.target.checked : notificationSetting.like_dislike,
      every_hour: e.target.name == "every_hour" ? e.target.checked : notificationSetting.every_hour,
      every_three_hours: e.target.name == "every_three_hours" ? e.target.checked : notificationSetting.every_three_hours,
      every_five_hours: e.target.name == "every_five_hours" ? e.target.checked : notificationSetting.every_five_hours,
      direct_message: e.target.name == "direct_message" ? e.target.checked : notificationSetting.direct_message,
      chat_alert: e.target.name == "chat_alert" ? e.target.checked : notificationSetting.chat_alert,
      allow_mentions: e.target.name == "allow_mentions" ? e.target.checked : notificationSetting.allow_mentions
    }
    handleUpdateNotificationSetting(tempArr)
  }  

  console.log("notificationSettingnotificationSetting", notificationSetting)

  const handleUpdateNotificationSetting = (notificationSetting) => {
    userProfileServices.updateNotificationSetting(notificationSetting).then(
      (data) => {
        setIsLoading(false);
        toast.success("Notification updated", {
          position: toast.POSITION.TOP_RIGHT,
        });
      },
      (error) => {
        toast.error(error.message, {
          position: toast.POSITION.TOP_RIGHT,
        });

        setIsLoading(false);
        console.log("error.response.status", error);
      }
    );
  }

  console.log("dasfdsfsdfasd", notificationSetting)

  return (
    <div className="login-page">
      <LogoHeader />
      <div className="main-content">
        <Header as="h3">
          <Icon name="bell" /> Notifications:
        </Header>
        <p style={{ fontWeight: 600, color: "#000" }}>Posts:</p>
        <div className="notification-contant">
          <div>
            <p className="notifiction-para" style={{ display: "inline-block", width: "35%", marginBottom: 20 }}>Comments on your posts</p>
            <div style={{ display: "inline-block" }} className="notification-checkbox">
              <input id="CommentsOnPost" type="checkbox" checked={notificationSetting.comments} value={notificationSetting.comments} name="comments" onChange={(e) => handleClickCheckbox(e, "CommentsOnPost")} />
              <label for="CommentsOnPost" class="check-trail">
                <span class="check-handler"></span>
              </label>
            </div>
          </div>
          <div>
            <p className="notifiction-para" style={{ display: "inline-block", width: "35%", marginBottom: 20 }}>Likes and dislikes on your posts</p>
            <div style={{ display: "inline-block" }} className="notification-checkbox">
              <input id="LikeDislikeOnPost" type="checkbox" checked={notificationSetting.like_dislike} value={notificationSetting.like_dislike} name="like_dislike" onChange={(e) => handleClickCheckbox(e, "LikeDislikeOnPost")} />
              <label for="LikeDislikeOnPost" class="check-trail">
                <span class="check-handler"></span>
              </label>
            </div>
          </div>
          <p style={{ fontWeight: 600 }}>Alert on posts made by people you are following every:</p>
          <div className="notification-checkbox notification-multiple-hour">
            <p style={{ display: "inline-block", width: "15%", marginBottom: 20 }}>1 hour</p>
            <div style={{ display: "inline-block", marginRight: 20 }}>
              <input id="followingEveryOneHr" type="checkbox" checked={notificationSetting.every_hour} value={notificationSetting.every_hour} name="every_hour" onChange={(e) => handleClickCheckbox(e, "followingEveryOneHr")} />
              <label for="followingEveryOneHr" class="check-trail">
                <span class="check-handler"></span>
              </label>
            </div>
            <p style={{ display: "inline-block", width: "10%" }}>3 hours</p>
            <div style={{ display: "inline-block", marginRight: 20 }}>
              <input id="followingEveryThreeHr" type="checkbox" checked={notificationSetting.every_three_hours} value={notificationSetting.every_three_hours} name="every_three_hours" onChange={(e) => handleClickCheckbox(e, "followingEveryThreeHr")} />
              <label for="followingEveryThreeHr" class="check-trail">
                <span class="check-handler"></span>
              </label>
            </div>
            <p style={{ display: "inline-block", width: "10%" }}>5 hours</p>
            <div style={{ display: "inline-block" }} className="notification-checkbox">
              <input id="followingEveryFiveHr" type="checkbox" checked={notificationSetting.every_five_hours} value={notificationSetting.every_five_hours} name="every_five_hours" onChange={(e) => handleClickCheckbox(e, "followingEveryFiveHr")} />
              <label for="followingEveryFiveHr" class="check-trail">
                <span class="check-handler"></span>
              </label>
            </div>
          </div>
          <p style={{ fontWeight: 600, color: "#000" }}>People and Messages:</p>
          <div>
            <p className="notifiction-para" style={{ display: "inline-block", width: "35%", marginBottom: 20 }}>New Direct messages</p>
            <div style={{ display: "inline-block" }} className="notification-checkbox">
              <input id="DirectMeg" type="checkbox" checked={notificationSetting.direct_message} value={notificationSetting.direct_message} name="direct_message" onChange={(e) => handleClickCheckbox(e, "DirectMeg")} />
              <label for="DirectMeg" class="check-trail">
                <span class="check-handler"></span>
              </label>
            </div>
          </div>
          <div>
            <p className="notifiction-para" style={{ display: "inline-block", width: "35%", marginBottom: 20 }}>Chat alert </p>
            <div style={{ display: "inline-block" }} className="notification-checkbox">
              <input id="ChatAlert" type="checkbox" checked={notificationSetting.chat_alert} value={notificationSetting.chat_alert} name="chat_alert" onChange={(e) => handleClickCheckbox(e, "ChatAlert")} />
              <label for="ChatAlert" class="check-trail">
                <span class="check-handler"></span>
              </label>
            </div>
          </div>
          <div>
            <p className="notifiction-para" style={{ display: "inline-block", width: "35%", marginBottom: 20 }}>Mentions by others</p>
            <div style={{ display: "inline-block" }} className="notification-checkbox">
              <input id="MentionOther" type="checkbox" checked={notificationSetting.allow_mentions} value={notificationSetting.allow_mentions} name="allow_mentions" onChange={(e) => handleClickCheckbox(e, "MentionOther")} />
              <label for="MentionOther" class="check-trail">
                <span class="check-handler"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
