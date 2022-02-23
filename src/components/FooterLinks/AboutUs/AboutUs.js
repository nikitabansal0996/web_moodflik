import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
// import "../../Login/Login.scss";
import { Button, Grid, Form, Header, Segment, Menu, Image } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import "../../../App.scss";
import Footer from "../Footer";
import './about-us.scss'
import LogoHeader from "./LogoHeader";



export default function AboutUS(props) {
// const [activeItem, setActiveItem] = useState("home")

  return (
    <div className="login-page">
      <LogoHeader />
        <div className="main-content">
            <Header as="h3" textAlign="center">
                About Us
            </Header>
            <p>
            Moodflik was developed based on the fact that regardless of who we are, where we are from or what we believe, we all share one commonality – we all see, experience and react to things and events that we either love or dislike at any given moment in our lives; though we may sometimes go through these life experiences sub-consciously. We have also come to understand that most of the communications exchanged on many social media platforms can really be summarised into these two areas, thus filtering out irrelevant content.
            </p>
            <p>
            It is our mission here at Moodflik to provide a fun, unique, engaging, diverse and safe platform for people from various walks of life with different values, opinions and perspectives to share their daily moments of joy and happiness as well as times of frustrations and dissatisfactions in the forms of likes and dislikes respectively and respectfully. We believe that sharing a balance of these two dichotomies of life provides a more comprehensive and candid overview of how we truly are both inwardly and outwardly, by expressing these constantly changing dual aspects of our daily reactions to life’s events we can better understand how our Moods flik (sorry, couldn’t resist :). 
            </p>
            <p>
            We have come a very long way to make this platform a reality despite the numerous obstacles and challenges that have come our way, we maintained a can-do and never-give-up attitude because we are confident that Moodflik will play a key role in shaping a new approach to dialogue and purposeful content sharing on social media. Currently (to our knowledge), there are no other social media platforms offering this form of micro-blogging, so we hope you enjoy this new and unique experience with us as we continue in our plans to grow bigger, better and bolder.
            </p>
            <p>
            P.s Yes, we are aware that flik is not a word, but we are currently loving it ;)
            </p>
        </div>
        <Footer />
	</div>
  );
}
