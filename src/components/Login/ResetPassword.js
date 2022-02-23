import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import { Button, Grid, Form, Header, Segment, Menu, Image } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import "../../App.scss";
import Footer from "../FooterLinks/Footer";
import '../FooterLinks/AboutUs/about-us.scss'
import './Login.scss'



export default function ResetPassword(props) {
// const [activeItem, setActiveItem] = useState("home")

  return (
    <div className="login-page">
		<div className="header-login about-us-header">
            <div>
                <Image src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fs3.amazonaws.com%2Fappforest_uf%2Ff1601659221875x962391620398017200%2Flogo-02.png?w=256&h=108&auto=compress&fit=crop&dpr=1" width="210" height="80"/>
            </div>
		</div>
        <div className="main-content">
            <Header as="h3" textAlign="center">
            Reset Password:
            </Header>
                <div className="forgot-pwd-main">
                    <div className="forgot-pwd-form">
                        <Form>
                            <Form.Input placeholder='Old Password' className="input-email-forgot" />
                            <Form.Input placeholder='New Password' className="input-email-forgot" />
                            <Form.Input placeholder='Confirm Password' className="input-email-forgot" />

                            <Button className="send-contact-us forgot-pwd-send">
                            Reset Password
                            </Button>
                        </Form>
                    </div>
                    
                </div>
        </div>
        <Footer />
	</div>
  );
}
