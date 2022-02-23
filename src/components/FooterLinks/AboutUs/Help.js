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
import { Icon } from "semantic-ui-react";
import "../../../App.scss";
import Footer from "../Footer";
import "./about-us.scss";
import LogoHeader from "./LogoHeader";

export default function Help(props) {
  // const [activeItem, setActiveItem] = useState("home")

  return (
    <div className="login-page">
      <LogoHeader />
      <div className="main-content">
        <Header as="h3" textAlign="center">
          Help
        </Header>
        <Header as="h3">FAQs</Header>
        <Header as="h3">
          Q – How do I control my daily notifications for posts and follower
          requests?
        </Header>
        <p>
          A – Go to the menu and click on the notification settings to adjust
          the notifications you receive from the web and mobile app.
        </p>
        <Header as="h3">
          Q – I do not want my posts and Bio to be made public how do I control
          these?
        </Header>
        <p>
          A – Navigate to the menu and click on the privacy settings and then
          select the type of users that you are comfortable with viewing your
          posts and bio
        </p>
        <Header as="h3">
          Q – If I block public members from seeing my posts, does that mean I
          cannot also see their posts?
        </Header>
        <p>
          A – You will still be able to view other people’s public posts if they
          have not restricted a non-following user from viewing them.
        </p>
        <Header as="h3">
          Q – Why was my mobile number requested when I signed up?
        </Header>
        <p>
          A – We requested for your mobile to help you and help us too.
          Providing your mobile gives you a secondary option of logging in, in
          case you forgot your username or email address. It always helps you to
          easily connect with your contacts who may also be on moodflik. Having
          your mobile number also helps us to protect your account from
          potential hacking as can send you specifically generated codes via SMS
          message to verify your identity and we can also send you activation
          codes when logging in for the first time.
        </p>
        <Header as="h3">
          Q – What part of my profile information will not be visible to other
          users (including my followers and those I am following?)
        </Header>
        <p>
          A – Your mobile number will be kept private and only visible to you.
        </p>
        <Header as="h3">Q – How do I delete my account?</Header>
        <p>
          A – You can delete your account by going to your account and profile
          settings and right at the bottom there is a button titled “Delete
          Account”.
        </p>
        <Header as="h3">Q – How do I block a user?</Header>
        <p>
          A – Go to the menu and find the option to “Block user” towards the
          bottom of the list. Then you can simply search for the user in
          question, when found click on block and that user will no longer be
          able to view or make or send any posts to you going forward.
        </p>
        <p>
          Please note that the user will NOT be alerted to this and you may also
          be unblock them later should you wish by following the same process
          and this time finding the user on the list of blocked users and click
          unblock.
        </p>
        <Header as="h3">Flag and Report</Header>
        <p>The following are unwelcome activities on the moodflik platform:</p>
        <ul>
          <li>Bullying</li>
          <li>Grooming</li>
          <li>Spamming</li>
          <li>False advertisement</li>
          <li>Fake or under-aged accounts (under the age of 13)</li>
          <li>
            False and/ disparaging posts or comments about other members or
            moodflik
          </li>
          <li>Inciting of hate and violence or discrimination</li>          
        </ul>
        <p>
            Any of these activities are to be brought to our attention with
            immediate effect in order for us to investigate and take due action
            on such persons.
          </p>
        <Header as="h3">Experiencing technical issues?</Header>
        <p>
        If you come across or are experiencing any technical glitch or bug on the web application or mobile app, please send us a detailed report to <a href="#">info@moodflik.com</a>. Please provide as much information as you can and be clear on your description. You may also attach pictures or videos to support your findings.
        </p>
        <Header as="h3">Feedback</Header>
        <p>
        We here at Moodflik are constantly growing and seeking to further improve on our service so if you have found something currently on our platform which you think could be done better or maybe done away with, or you just have some great ideas for to consider then please do not hesitate to also contact us on <a href="#">info@moodflik.com</a>
        </p>
        <p>
If for whatever reason, we have not covered or answered your questions on our FAQs section then please do not hesitate to use our “Contact Us” page to reach out to us. We would love to hear from you.
        </p>
      </div>
      <Footer />
    </div>
  );
}
