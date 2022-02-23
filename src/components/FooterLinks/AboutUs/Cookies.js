import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
// import "../../Login/Login.scss";
import { Button, Grid, Form, Header, Segment, Menu, Image } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import "../../../App.scss";
import Footer from "../Footer";
import './about-us.scss'
import LogoHeader from "./LogoHeader";



export default function Cookies(props) {
// const [activeItem, setActiveItem] = useState("home")

  return (
    <div className="login-page">
		      <LogoHeader />

        <div className="main-content">
            <Header as="h3" textAlign="center">
                Cookie Policy
            </Header>
            <p>
            This cookie policy ("Policy") describes what cookies are and how and they're being used by the moodflik.com website ("Website" or "Service") and any of its related products and services (collectively, "Services"). This Policy is a legally binding agreement between you ("User", "you" or "your") and this Website operator ("Operator", "we", "us" or "our"). You should read this Policy so you can understand the types of cookies we use, the information we collect using cookies and how that information is used. It also describes the choices available to you regarding accepting or declining the use of cookies. For further information on how we use, store and keep your personal data secure, see our <a href="#">Privacy Policy</a>.
            </p>
            <Header as="h3" textAlign="center">
                What are Cookies ?
            </Header>
            <p>
            Cookies are small pieces of data stored in text files that are saved on your computer or other devices when websites are loaded in a browser. They are widely used to remember you and your preferences, either for a single visit (through a "session cookie") or for multiple repeat visits (using a "persistent cookie").
            </p>
            <p>
            Session cookies are temporary cookies that are used during the course of your visit to the Website, and they expire when you close the web browser.
            </p>
            <p>
            Persistent cookies are used to remember your preferences within our Website and remain on your desktop or mobile device even after you close your browser or restart your computer. They ensure a consistent and efficient experience for you while visiting the Website and Services.
            </p>
            <p>
            Cookies may be set by the Website ("first-party cookies"), or by third parties, such as those who serve content or provide advertising or analytics services on the Website ("third party cookies"). These third parties can recognize you when you visit our website and also when you visit certain other websites.
            </p>

            <Header as="h3" textAlign="center">
             What type of cookies do we use?
            </Header>
            <p><b>Necessary cookies[</b></p>
            <p>
            Necessary cookies allow us to offer you the best possible experience when accessing and navigating through our Website and using its features. For example, these cookies let us recognize that you have created an account and have logged into that account to access the content.
            </p>
            <p><b>Functionality cookies</b></p>
            <p>
            Functionality cookies let us operate the Website and Services in accordance with the choices you make. For example, we will recognize your username and remember how you customized the Website and Services during future visits.
            </p>
            <Header as="h3" textAlign="center">
            What are your cookie options?
            </Header>
            <p>
            If you don't like the idea of cookies or certain types of cookies, you can change your browser's settings to delete cookies that have already been set and to not accept new cookies. To learn more about how to do this or to learn more about cookies, visit <a href="#"><b>internetcookies.org</b></a>
            </p>
            <Header as="h3" textAlign="center">
            Changes and amendments
            </Header>
            <p>
            We reserve the right to modify this Policy or its terms relating to the Website and Services at any time, effective upon posting of an updated version of this Policy on the Website. When we do, we will send you an email to notify you. Continued use of the Website and Services after any such changes shall constitute your consent to such changes.
            </p>
            <Header as="h3" textAlign="center">
            Acceptance of this policy
            </Header>
            <p>
            You acknowledge that you have read this Policy and agree to all its terms and conditions. By accessing and using the Website and Services you agree to be bound by this Policy. If you do not agree to abide by the terms of this Policy, you are not authorized to access or use the Website and Services.
            </p>
            <Header as="h3" textAlign="center">
            Contacting us
            </Header>
            <p>
            If you would like to contact us to understand more about this Policy or wish to contact us concerning any matter relating to our use of cookies, you may send an email to <b>info@moodflik.com </b>
            </p>
        </div>
        <Footer />
	</div>
  );
}
