import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import "../Login/Login.scss";
import { Button, Grid, Form, Header, Segment, Menu, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Paths } from "../routes/routePaths";
import { Icon } from "semantic-ui-react";
import "../../App.scss";
import { authServices } from "../../Services/Auth";




export default function Footer(props) {
const [activeItem, setActiveItem] = useState("home")

	const handleItemClick = (e, { name }) =>{
		setActiveItem(name)
	}

  return (
    <div className="login-page">
		<div className="footer-login">
            <div>
				<Segment inverted>
					<Menu inverted secondary>
					<Menu.Item
						name='about us'
						active={activeItem === 'about us'}
						onClick={handleItemClick}
						as={Link}
						to="/about-us"
					/>
					<Menu.Item
						name='contact us'
						active={activeItem === 'contact us'}
						onClick={handleItemClick}
						as={Link}
						to="/contact-us"
					/>
					<Menu.Item
						name='terms and condiction'
						active={activeItem === 'terms and condiction'}
						onClick={handleItemClick}
						as={Link}
						to="/terms-and-condiction"
					/>
					<Menu.Item
						name='policy and data use'
						active={activeItem === 'policy and data use'}
						onClick={handleItemClick}
						as={Link}
						to="/policy"
					/>
					<Menu.Item
						name='community guidelines'
						active={activeItem === 'community guidelines'}
						onClick={handleItemClick}
						as={Link}
						to="/community-guidelines"
					/>
					<Menu.Item
						name='cookies'
						active={activeItem === 'cookies'}
						onClick={handleItemClick}
						as={Link}
						to="/cookies"
					/>
					</Menu>
				</Segment>
			</div>
		</div>
	</div>
  );
}
