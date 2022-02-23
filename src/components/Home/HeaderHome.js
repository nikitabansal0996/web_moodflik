import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
// import "../../Login/Login.scss";
import { Segment, Menu, Image, Input, Popup, Header } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import "../../App.scss";
import Footer from "../FooterLinks/Footer";
import "../FooterLinks/AboutUs/about-us.scss";
import "./home.scss";
import { Link } from "react-router-dom";
import MenuBar from "../FooterLinks/AboutUs/MenuBar";
import { UserProfileServices } from "../../Services/UserProfileServices";
import noRecordUser from "../../assets/img/no-result.png";
import defaultUserImage from "../../assets/img/user-image.png";
import { HomeServices } from "../../Services/HomeServices";
import { toast } from "react-toastify";

var QB = require("quickblox/quickblox.min");

// OR to create many QB instances
// var QuickBlox = require("quickblox/quickblox.min").QuickBlox;
// var QB = new QuickBlox();

var CREDENTIALS = {
  appId: "91867",
  authKey: "J5H-KYBZTGWarmg",
  authSecret: "wPXG4CXPrMKFOQd",
  accountKey: "G3AHXj94R9sNP5S--fqM",
  apiEndpoint: "",
  chatEndpoint: "",
};
// var CONFIG = { debug: true };

QB.init(
  CREDENTIALS.appId,
  CREDENTIALS.authKey,
  CREDENTIALS.authSecret,
  CREDENTIALS.accountKey
  //   CONFIG
);

const userProfileServices = new UserProfileServices();
const homeServices = new HomeServices();

export default function HeaderHome(props) {
  const [activeItem, setActiveItem] = useState("home");
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [searchUserAllList, setSearchUserAllList] = useState([]);
  const [isOpenUserList, setIsOpenUserList] = useState(false);

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };

  const handleSearchInput = (e) => {
    setSearchVal(e.target.value);
    getFilterAllUserListHeader(e.target.value);
  };

  const getFilterAllUserListHeader = (searchVal = "") => {
    userProfileServices.getFilterAllUserListHeader(searchVal).then(
      (data) => {
        debugger;
        setIsOpenUserList(true);
        setSearchUserAllList(data);
      },
      (error) => {
        console.log("error.response.status", error);
      }
    );
  };

  const handleClickFollowingUser = (id) => {
    homeServices.handleClickFollowingUser(id).then(
      (data) => {
        toast.success(data.message ? data.message : data.response, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setSearchVal("")
        setSearchUserAllList([])
      },
      (error) => {
        toast.error(error.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log("error.response.status", error);
      }
    );
  };
  return (
    <div className="login-page">
      <div className="about-us-header">
        <div className="div-inline image-header-home">
          <Image
            src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fs3.amazonaws.com%2Fappforest_uf%2Ff1601659221875x962391620398017200%2Flogo-02.png?w=256&h=108&auto=compress&fit=crop&dpr=1"
            width="210"
            height="80"
            className="img-header"
          />
        </div>
        <div className="div-inline header-nav">
          <Segment inverted>
            <Menu inverted secondary>
              <Menu.Item
                name="home"
                active={activeItem === "home"}
                onClick={handleItemClick}
                as={Link}
                to="/public-reactions"
              >
                <div>
                  <Icon name="home" />
                  <span>Home</span>
                </div>
              </Menu.Item>
              <Menu.Item
                name="notification"
                active={activeItem === "notification"}
                onClick={handleItemClick}
                as={Link}
                to="/notifications"
              >
                <div>
                  <Icon name="bell" />
                  <span>Notifications</span>
                </div>
              </Menu.Item>
              <Menu.Item
                name="DM"
                active={activeItem === "DM"}
                onClick={handleItemClick}
                as={Link}
                to="/chat"
              >
                <div>
                  <Icon name="mail" />
                  <span>DMs</span>
                </div>
              </Menu.Item>
            </Menu>
          </Segment>
        </div>
        <div className="div-inline search-header-home">
          <Popup
            trigger={
              <Input
                fluid
                type="text"
                onChange={handleSearchInput}
                placeholder="Search User"
                name="searchVal"
                value={searchVal}
              />
            }
            on="click"
            position="bottom center"
          >
            <div className="popup-search-user-content">
              {searchVal &&
               searchUserAllList.length > 0 ? (
                searchUserAllList.map((item) => {
                  return (
                    <>
                      <div className="pop-up-search-user-header">
                        <div className="search-header-all-user">
                          <Image
                            src={
                              item.photo_url ? item.photo_url : defaultUserImage
                            }
                            width="50"
                            height="50"
                            className="image-user-search"
                          />
                          <Header as="h5" style={{ margin: 0 }}>
                            {item.first_name}
                            {item.last_name}
                            <Header.Subheader>{item.username}</Header.Subheader>
                          </Header>
                          <div className="follow-icon-add"> 
                            <Icon
                              name="add user"
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                handleClickFollowingUser(item.uuid)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })
              ) : (
                <div>
                  <Image src={noRecordUser} width="250" height="200" />
                </div>
              )}
            </div>
          </Popup>
        </div>
        <div className="div-inline image-menu-bar-home">
          <Icon
            name="bars"
            size="big"
            style={{ color: "#fff" }}
            onClick={() => setIsOpenMenu(!isOpenMenu)}
          />
          {isOpenMenu && <MenuBar />}
        </div>
      </div>
    </div>
  );
}
