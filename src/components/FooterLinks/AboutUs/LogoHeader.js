import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import "semantic-ui-css/semantic.min.css";
// import "../../Login/Login.scss";
import { Button, Grid, Form, Header, Segment, Menu, Image } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import "../../../App.scss";
import Footer from "../Footer";
import './about-us.scss'



 function LogoHeader(props) {
// const [activeItem, setActiveItem] = useState("home")

const handleClickClose = () => {
  let email = localStorage.getItem("email");
      let isLogin = localStorage.getItem("isLogin");
      console.log(email, isLogin);
      debugger
      if (email && isLogin) {
        props.history.push("/public-reactions")
      }else{
        window.history.back()
      }
}
  return (
    <div className="login-page">
		<div className="header-login about-us-header">
            <div>
                <Image src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fs3.amazonaws.com%2Fappforest_uf%2Ff1601659221875x962391620398017200%2Flogo-02.png?w=256&h=108&auto=compress&fit=crop&dpr=1" width="210" height="80"/>
                <Icon name= "close" 
                    style={{
                        color: "#ffff", 
                        position: 'absolute',
                        right: '10px',
                        fontSize: '20px',
                        top: '10px',
                        cursor: 'pointer'
                    }} 
                    onClick={handleClickClose}
                />

            </div>
		</div>
	</div>
  );
}
export default withRouter(LogoHeader);
