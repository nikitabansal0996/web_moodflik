import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
// import "../../Login/Login.scss";
import { Button, Grid, Form, Header, Segment, Menu, Image } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import "../../../App.scss";
import Footer from "../Footer";
import './about-us.scss'
import LogoHeader from "./LogoHeader";



export default function InviteFriend(props) {
// const [activeItem, setActiveItem] = useState("home")

  return (
    <div className="login-page">
		<LogoHeader />
        <div className="main-content">
            <Header as="h3" textAlign="center">
                Invite a friend
            </Header>
            <p>
            Hey, check out Moodflik, a unique micro-blogging platform that allows you to see and share reactions to things and events you love and dislike in real-time, simultaneously.  
            </p>
            <p>
            Join and follow me and many others today by getting the free app at  

            </p>
            <p>
            <a href="#"><b>https://www.moodflik.com/download</b></a>
            </p>
            <Button className="send-contact-us" style={{width: 150, borderRadius: 4}}>
                Copy
            </Button>
        </div>
        <Footer />
	</div>
  );
}
