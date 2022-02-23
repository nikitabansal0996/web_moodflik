import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import { Button, Grid, Form, Header, Segment, Menu, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import './about-us.scss'



export default function MenuBar(props) {
const [activeItem, setActiveItem] = useState("home")

	const handleItemClick = (e, { name }) =>{
		setActiveItem(name)
	}

    const handleLogout = () => {
        localStorage.clear()
        window.location.href="/"
    }

  return (
    <div className="side-top-menu">
		<div>
            <div>
            <Menu secondary vertical>
                <Menu.Item
                    name='My Profile'
                    active={activeItem === 'My Profile'}
                    onClick={handleItemClick}
                    as={Link}
                    to="/user-profile"
                >
                    <div>
                        <Icon style={{marginRight: 10}} name="user outline" /><span>My Profile</span>
                    </div>
                </Menu.Item>
                <Menu.Item
                    name='My Favorites'
                    active={activeItem === 'My Favorites'}
                    onClick={handleItemClick}
                    as={Link}
                    to="/favourite"
                >
                    <div>
                        <Icon style={{marginRight: 10}} name="heart outline" /><span>My Favorites</span>
                    </div>
                </Menu.Item>
                <Menu.Item
                    name='Account and Profile Setting'
                    active={activeItem === 'Account and Profile Setting'}
                    onClick={handleItemClick}
                    as={Link}
                    to="/profile-setting"
                >
                    <div>
                        <Icon style={{marginRight: 10}} name="user circle" /><span>Account and Profile Setting</span>
                    </div>
                </Menu.Item>
                <Menu.Item
                    name='Privacy Settings'
                    active={activeItem === 'Privacy Settings'}
                    onClick={handleItemClick}
                    as={Link}
                    to="/privacy-setting"
                >
                    <div>
                        <Icon style={{marginRight: 10}} name="eye slash" /><span>Privacy Settings</span>
                    </div>
                </Menu.Item>
                <Menu.Item
                    name='Notification Settings'
                    active={activeItem === 'Notification Settings'}
                    onClick={handleItemClick}
                    as={Link}
                    to="/notifications"
                >
                    <div>
                        <Icon style={{marginRight: 10}} name="bell outline" /><span>Notification Settings</span>
                    </div>
                </Menu.Item>
                <Menu.Item
                    name='Block User'
                    active={activeItem === 'Block User'}
                    onClick={handleItemClick}
                    as={Link}
                    to="/block-userlist"
                >
                    <div>
                        <Icon style={{marginRight: 10}} name="dont" /><span>Block User</span>
                    </div>
                </Menu.Item>
                <Menu.Item
                    name='Invite'
                    active={activeItem === 'Invite'}
                    onClick={handleItemClick}
                    as={Link}
                    to="/invite-friend"
                >
                    <div>
                        <Icon style={{marginRight: 10}} name="user plus" /><span>Invite</span>
                    </div>
                </Menu.Item>
                <Menu.Item
                    name='Help'
                    active={activeItem === 'Help'}
                    onClick={handleItemClick}
                    as={Link}
                    to="/help"
                >
                    <div>
                        <Icon style={{marginRight: 10}} name="question circle outline" /><span>Help</span>
                    </div>
                </Menu.Item>
                <Menu.Item
                    name='Logout'
                    active={activeItem === 'Logout'}
                    onClick={() => handleLogout()}
                >
                    <div>
                        <Icon style={{marginRight: 10}} name="unlock alternate " /><span>Logout</span>
                    </div>
                </Menu.Item>
            </Menu>
			</div>
		</div>
	</div>
  );
}
