import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
// import "../../Login/Login.scss";
import { Button, Grid, Form, Header, Segment, Menu, Image } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import "../../../App.scss";
import Footer from "../Footer";
import './about-us.scss'
import LogoHeader from "./LogoHeader";



export default function CommunityGuideLine(props) {
// const [activeItem, setActiveItem] = useState("home")

  return (
    <div className="login-page">
		      <LogoHeader />

        <div className="main-content">
            <Header as="h3" textAlign="center">
            Community Guidelines
            </Header>
            <p>
            Welcome to the Moodflik community! This is a safe space to express, discuss and share your interests (in the form of People, Places and Things you love) and dislikes. However, please note that though we appreciate that we all have varying and opposite views on various matters, we specifically DO NOT welcome any posts that incite, encourage or explicitly portray <b> Hate </b>; hence the reason why we have specifically adopted the word <b> Dislike </b> rather than Hate. We will therefore kindly ask that all users adhere to our community guidelines as stipulated here.

            </p>
            <p>
            We want everyone to be part of our community and have their voice heard.
We encourage your feedback and aim to respond to your comments as soon as possible. While we do moderate this community, we welcome open discussion. 
 
            </p>
            <p>
            To help everyone enjoy our community, we ask that when you post, you keep in mind the following:
            </p>
           <ul>
               <li style={{marginTop: 20}}>
               We don’t allow defamatory, indecent, offensive, profane, discriminatory, misleading, unlawful or threatening comments.
               </li>
               <li style={{marginTop: 20}}>
               Personal attacks, name-calling, trolling and abuse will not be tolerated. 
               </li>
               <li style={{marginTop: 20}}>
               Spamming, posting promotional material or posting links to third party websites is not permitted.
               </li>
               <li style={{marginTop: 20}}>
               We reserve the right to delete comments at our discretion and block any repeat offenders. We will remove content that is fraudulent, deceptive or misleading.
               </li>
               <li style={{marginTop: 20}}>
               Coordinated group attacks will not be tolerated.
               </li>
               <li style={{marginTop: 20}}>
               Our community is a public place. Don’t post personal information that you would not be comfortable sharing with a stranger. We recommend that you don’t post any information that may identify you or anyone else, such as your address, email address or phone number.
               </li>
               <li style={{marginTop: 20}}>
               Moodflik Employees participating in the discussion in our community are reminded of the
staff social media guidelines.
               </li>
           </ul>
           <p>
           If you have questions about a product or service of ours, please get in touch via our mobile or web applicattion
at <a href="#">www.moodflik.com </a>
           </p>
           <p>
            If you’d like to chat with the Moodflik team, please get in touch with us
            at: <a href="#"><b>info@moodflik.com</b></a>
            </p>
        </div>
        <Footer />
	</div>
  );
}
