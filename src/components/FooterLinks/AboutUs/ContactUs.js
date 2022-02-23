import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
// import "../../Login/Login.scss";
import { Button, Grid, Form, Header, Segment, Menu, Image } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import "../../../App.scss";
import Footer from "../Footer";
import './about-us.scss'
import LogoHeader from "./LogoHeader";



export default function ContactUS(props) {
// const [activeItem, setActiveItem] = useState("home")

  return (
    <div className="login-page">
		      <LogoHeader />

        <div className="main-content">
            <Header as="h3" textAlign="center">
            Contact Us
            </Header>
            <p>
            We are always happy to hear from both our users and also non-users of Moodflik.com; should you have any questions relating to this platform, questions for staff members, requests from the press, any form of dissatisfaction in using our platform, feeling the need to report abuse or an abuser discovered here or perhaps just wishing to provide us with feedback on your experiences in using either our web or mobile application or friendly and technical suggestions of what we can do to continue to improve our platform.

            </p>
            <p>
            For whatever the reason, please do not hesitate to contact us with the form below, or you may send us an email on <a href="#">info@moodflik.com</a> and a member of our team will endeavour to get back to you as soon as possible.
 
            </p>
            <p>
            Thanks,

            </p>
            <p>
            The Team at Moodflik
            </p>
            <div style={{marginLeft: 30, marginRight: 30}}>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Name' placeholder='Type here...' />
                        <Form.Input fluid label='Email' placeholder='Type here...' />
                    </Form.Group>
                    <Form.TextArea fluid label='Message' placeholder='Type here...' />
                    <Button className="send-contact-us">
                        Send
                    </Button>
                </Form>
            </div>
        </div>

        <Footer />
	</div>
  );
}
