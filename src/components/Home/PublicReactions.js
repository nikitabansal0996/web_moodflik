import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
// import "../../Login/Login.scss";
import {
  Button,
  Grid,
  Form,
  Header,
  Segment,
  Menu,
  Image,
  Input,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import "../../App.scss";
import Footer from "../FooterLinks/Footer";
import "../FooterLinks/AboutUs/about-us.scss";
import "./home.scss";
import { Link, withRouter } from "react-router-dom";
import MenuBar from "../FooterLinks/AboutUs/MenuBar";
import HeaderHome from "./HeaderHome";
import userImage from "../../assets/img/user-image.png";
import PublicLike from "../FooterLinks/PublicLike";
import PublickDislike from "../FooterLinks/PublickDislike";
import { HomeServices } from "../../Services/HomeServices";
import { toast } from "react-toastify";
import PostListingLikeDislike from "./PostListingLikeDislike";
import { UserProfileServices } from "../../Services/UserProfileServices";

const homeServices = new HomeServices();
const userProfileServices = new UserProfileServices();

function PublicReactions(props) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [followingfDetail, setFollowingfDetail] = useState(false)

  useEffect(() => {
    setIsLoading(true);
    getUserFollowersOrFollowing()
  }, []);

  const getUserFollowersOrFollowing = () => {
    setIsLoading(true);
    userProfileServices.getUserFollowersOrFollowing().then(
      (data) => {
        setFollowingfDetail(data.data)
        setIsLoading(false);
      },
      (error) => {
        setIsLoading(false);
        console.log("error.response.status", error);
      }
    );
  };

  return (
    <div className="login-page">
      <HeaderHome />

      <div className="main-content" style={{ height: "100vh" }}>
      <Header as="h3">
          Public Reactions
        </Header>
        <Segment className="loader-custom">
          <Dimmer active={isLoading} inverted>
            <Loader inverted content="Loading" />
          </Dimmer>
        </Segment>
        
        <div className="btn-create-reaction-followers-following">
          <Grid>
            <Grid.Column mobile={8} tablet={8} computer={4}>
              <Button
                className="send-contact-us"
                onClick={() => props.history.push("/create-post")}
                style={{
                  borderRadius: 4,
                  padding: 10,
                  marginLeft: 0,
                  marginTop: 40,
                  width: "150px",
                }}
              >
                Create Post
              </Button>
            </Grid.Column>
            <Grid.Column mobile={8} tablet={8} computer={4}>
              <Button
                className="send-contact-us"
                style={{
                  borderRadius: 4,
                  padding: 10,
                  marginLeft: 0,
                  marginTop: 40,
                  width: "150px",
                }}
                onClick={() => props.history.push("/user-profile")}
              >
                My Reactions
              </Button>
            </Grid.Column>
            <Grid.Column mobile={8} tablet={8} computer={4}>
              <Button
                className="send-contact-us"
                style={{
                  borderRadius: 4,
                  padding: 10,
                  marginLeft: 0,
                  marginTop: 40,
                  width: "150px",
                }}
                onClick={() => props.history.push("/followers")}
              >
                Followers ({followingfDetail ? followingfDetail.followers.length : 0})
              </Button>
            </Grid.Column>
            <Grid.Column mobile={8} tablet={8} computer={4}>
              <Button
                className="send-contact-us"
                style={{
                  borderRadius: 4,
                  padding: 10,
                  marginLeft: 0,
                  marginTop: 40,
                  width: "150px",
                }}
                onClick={() => props.history.push("/following")}
              >
                Following ({followingfDetail ? followingfDetail.following.length : 0})
              </Button>
            </Grid.Column>
          </Grid>
        </div>
        <PostListingLikeDislike />
      </div>
      <Footer />
    </div>
  );
}
export default withRouter(PublicReactions);
