import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
// import "../../Login/Login.scss";
import { Button, Grid, Form, Header, Segment, Menu, Image } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import "../../../App.scss";
import Footer from "../Footer";
import './about-us.scss'
import LogoHeader from "./LogoHeader";



export default function BlockedUserList(props) {
// const [activeItem, setActiveItem] = useState("home")

  return (
    <div className="login-page">
		<LogoHeader />
        <div className="main-content">
            <Header as="h3" textAlign="center">
            Blocked Users
            </Header>
            <Header as="h4" >
            <Icon name="dont" />Block A User
            </Header>
            <p style={{fontWeight: 500, fontSize: 14}}>
             Blocked Users:
            </p>
            <div className="div-inline" style={{marginBottom: 15, display: "flex"}}>
                <div className="div-inline" style={{width: "70%", display: "flex"}}>
                    <div className="img-block-user">
                        <div className="div-inline img-div">
                        <Image src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" width="100" height= "100" />

                        </div>
                    </div>
                    <p className="div-inline text-block-user">
                       Parent group BlockUser's List of block user's
                    </p>
                </div>
                <div className="div-inline" style={{width: "30%"}}>
                    <Button className="send-contact-us" style={{borderRadius: 4, padding: 10}}>
                        Unblock
                    </Button>
                </div>
            </div>

            <div className="div-inline" style={{marginBottom: 15, display: "flex"}}>
                <div className="div-inline" style={{width: "70%", display: "flex"}}>
                    <div className="img-block-user">
                        <div className="div-inline img-div">
                        <Image src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" width="100" height= "100" />

                        </div>
                    </div>
                    <p className="div-inline text-block-user">
                       Parent group BlockUser's List of block user's
                    </p>
                </div>
                <div className="div-inline" style={{width: "30%"}}>
                    <Button className="send-contact-us" style={{borderRadius: 4, padding: 10}}>
                        Unblock
                    </Button>
                </div>
            </div>

            <div className="div-inline" style={{marginBottom: 15, display: "flex"}}>
                <div className="div-inline" style={{width: "70%", display: "flex"}}>
                    <div className="img-block-user">
                        <div className="div-inline img-div">
                        <Image src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" width="100" height= "100" />

                        </div>
                    </div>
                    <p className="div-inline text-block-user">
                       Parent group BlockUser's List of block user's
                    </p>
                </div>
                <div className="div-inline" style={{width: "30%"}}>
                    <Button className="send-contact-us" style={{borderRadius: 4, padding: 10}}>
                        Unblock
                    </Button>
                </div>
            </div>

            
        </div>
        <Footer />
	</div>
  );
}
