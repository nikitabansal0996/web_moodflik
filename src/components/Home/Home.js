import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
// import "../../Login/Login.scss";
import { Button, Grid, Form, Header, Segment, Menu, Image, Input } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import "../../App.scss";
import Footer from "../FooterLinks/Footer";
import '../FooterLinks/AboutUs/about-us.scss'
import './home.scss'
import { Link, withRouter, useHistory } from "react-router-dom";
import MenuBar from "../FooterLinks/AboutUs/MenuBar";
import HeaderHome from "./HeaderHome";
import { UserProfileServices } from "../../Services/UserProfileServices";
import { toast } from "react-toastify";
import PostListingLikeDislike from "./PostListingLikeDislike";

const userProfileServices = new UserProfileServices();



function Home(props) {
    const [profileDetail, setProfileDetail] = useState(false)
    const [isLoading, setIsLoading] = React.useState(false);
    const [favPostLikeDislike, setFavPostLikeDislike] = useState("")
    const [thingsLovePost, setThingsLovePost] = useState(false)
    const [thingsDislikePost, setThingsDislikePost] = useState(false)
    const [favPostLike, setFavPostLike] = useState("")
    const [followingfDetail, setFollowingfDetail] = useState(false)
    const [isProfileId, setIsProfileId] = useState("")
    const history = useHistory()


    useEffect(() => {
        window.scrollTo(0, 0)
        setIsLoading(true);
        if(props.match.params && props.match.params.id){
        getUserProfileDetail(props.match.params.id)
        getMyLikePost(props.match.params.id)
        getMyDislike(props.match.params.id)
        getMyFavLikePost(props.match.params.id)
        getMyFavDisLikePost(props.match.params.id)
        getUserFollowersOrFollowing(props.match.params.id)
        setIsProfileId(props.match.params.id)
        }else{
            getUserProfileDetail()
        getMyLikePost()
        getMyDislike()
        getMyFavLikePost()
        getMyFavDisLikePost()
        getUserFollowersOrFollowing()
        }
        
        

    }, []);

    const getUserProfileDetail = (id) => {
        setIsLoading(true);
        userProfileServices.getUserProfileDetail(id ? id : "").then(
            (data) => {
                setProfileDetail(data)
                setIsLoading(false);
            },
            (error) => {
                setIsLoading(false);
                console.log("error.response.status", error);
            }
        );
    };

    const getUserFollowersOrFollowing = (id) => {
        setIsLoading(true);
        userProfileServices.getUserFollowersOrFollowing(id ? id : "").then(
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

    const getMyFavLikePost = (id) => {
        setIsLoading(true);
        userProfileServices.getMyFavLikePost(id ? id : "").then(
            (data) => {
                setFavPostLike(data)
                setIsLoading(false);
            },
            (error) => {
                setIsLoading(false);
                console.log("error.response.status", error);
            }
        );
    };
    const getMyFavDisLikePost = (id) => {
        setIsLoading(true);
        userProfileServices.getMyFavDisLikePost(id ? id : "").then(
            (data) => {
                setFavPostLikeDislike(data)
                setIsLoading(false);
            },
            (error) => {
                setIsLoading(false);
                console.log("error.response.status", error);
            }
        );
    };
    const getMyLikePost = (id) => {
        var url = `api/my_posts/?type=like/${id ? id : ""}`

        setIsLoading(true);
        userProfileServices.getMyLikePost(url).then(
            (data) => {

                setThingsLovePost(data)
                setIsLoading(false);
            },
            (error) => {
                setIsLoading(false);
                console.log("error.response.status", error);
            }
        );
    };
    const getMyDislike = (id) => {
        var url = `api/my_posts/?type=dislike/${id ? id : ""}`
        setIsLoading(true);
        userProfileServices.getMyDislike(url).then(
            (data) => {

                setThingsDislikePost(data)
                setIsLoading(false);
            },
            (error) => {
                setIsLoading(false);
                console.log("error.response.status", error);
            }
        );
    };

    const handleClickFollowers =(e) =>{
        if(isProfileId){
           return history.push(`/followers/${isProfileId}`)
        }else{
          return  history.push("/followers")
        }
    }
    const handleClickFollowing =(e) =>{
        if(isProfileId){
           return history.push(`/following/${isProfileId}`)
        }else{
           return history.push("/following")
        }
    }

    return (
        <div className="login-page">
            <HeaderHome />

            <div className="main-content" style={{ height: "100vh" }}>
            <div style={{ position: "relative" }}>
          <div>
            <Image
              src={profileDetail.cover_photo_url ? profileDetail.cover_photo_url : "https://i.pinimg.com/originals/30/5c/5a/305c5a457807ba421ed67495c93198d3.jpg"}
              className="image-cover-photo"
            />
          </div>
          <div
            className="div-flex create-post-profile"
            style={{ marginBottom: 15 }}
          >
            <div className="div-flex image-cover-head">
              <div className="parent-image-cover">
                <div class="image-upload-profile">
                  <Form enctype="multipart/form-data" id="user-form">
                    <Image src={profileDetail.photo_url ? profileDetail.photo_url : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"} />
                  </Form>
                </div>
              </div>

              <div className="form-detail-user-create-post">
                <p>From</p>
                <p style={{ fontWeight: 600, color: "#6C0AC7" }}>
                  Me, in 3 words:
                </p>
                <p style={{ fontWeight: 600, color: "#108A07" }}>
                  Things I Love:
                </p>
                <p style={{ fontWeight: 600, color: "#BF1414" }}>
                  Things I Dislike:
                </p>
              </div>
            </div>

            <div className="div-inline like-dislike-button">
              <p style={{ textAlign: "center" }}>Favourites:</p>
              <div className="btn-like-dislike">
                <Button
                  className="send-contact-us background-like-color"
                  style={{
                    borderRadius: 4,
                    padding: 10,
                    marginBottom: 10,
                    width: 100,
                  }}
                >
                   Likes ({favPostLike ? favPostLike.count : 0})
                </Button>
                <Button
                  className="send-contact-us background-dislike-color"
                  style={{
                    borderRadius: 4,
                    padding: 10,
                    marginBottom: 10,
                    width: 100,
                  }}
                >
                  Dislikes ({favPostLikeDislike ? favPostLikeDislike.count : 0})
                </Button>
              </div>
            </div>
          </div>
        </div>
                {/* <div className="div-flex" style={{ marginBottom: 15 }}>
                    <div className="div-flex div-head-profile">
                        <div className="img-user-profile">
                            <div className="div-inline img-div">

                                <Image src={profileDetail.photo_url ? profileDetail.photo_url : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"} width="98" height="98" style={{ borderRadius: 50 }} />

                            </div>
                        </div>

                        <div className="div-flex">
                            <div>
                                <p>From</p>
                                <p style={{ fontWeight: 600, color: "#6C0AC7" }}>Me, in 3 words:</p>
                                <p style={{ fontWeight: 600, color: "#108A07" }}>Things I Love:</p>
                                <p style={{ fontWeight: 600, color: "#BF1414" }}>Things I Dislike:</p>
                            </div>
                        </div>

                    </div>

                    <div className="div-inline like-dislike-button">
                        <p style={{ textAlign: "center" }}>
                            Favourites:
                        </p>
                        <div className="btn-like-dislike">
                            <Button className="send-contact-us background-like-color" style={{ borderRadius: 4, padding: 10, marginBottom: 10, width: 100 }}>
                                Likes ({favPostLike ? favPostLike.count : 0})
                            </Button>
                            <Button className="send-contact-us background-dislike-color" style={{ borderRadius: 4, padding: 10, marginBottom: 10, width: 100 }}>
                                Dislikes ({favPostLikeDislike ? favPostLikeDislike.count : 0})
                            </Button>
                        </div>

                    </div>

                </div> */}
                <div className="user-name-detail">
                    <Header as="h3">
                        {profileDetail.first_name} {profileDetail.last_name}

                    </Header>
                    <Header as="h5" style={{ color: "#838392" }}>

                        {profileDetail.username ? profileDetail.username : "N/A"}
                    </Header>
                </div>
                <div className="btn-create-reaction-followers-following">
                    <Grid >
                        <Grid.Column mobile={8} tablet={8} computer={4}>
                            <Button className="send-contact-us"
                                onClick={() => props.history.push("/create-post")}
                                style={{ borderRadius: 4, padding: 10, marginLeft: 0, marginTop: 40, width: "150px" }}>
                                Create Post
                            </Button>
                        </Grid.Column>
                        <Grid.Column mobile={8} tablet={8} computer={4}>
                            <Button className="send-contact-us"
                                onClick={() => props.history.push("/public-reactions")}
                                style={{ borderRadius: 4, padding: 10, marginLeft: 0, marginTop: 40, width: "150px" }}>
                                Public Reactions
                            </Button>
                        </Grid.Column>
                        <Grid.Column mobile={8} tablet={8} computer={4}>
                            <Button className="send-contact-us" style={{ borderRadius: 4, padding: 10, marginLeft: 0, marginTop: 40, width: "150px" }}
                                // onClick={() => props.history.push("/followers")}
                                onClick={() =>handleClickFollowers()}
                            >
                                Followers ({followingfDetail ? followingfDetail.followers.length : 0})
                            </Button>
                        </Grid.Column>
                        <Grid.Column mobile={8} tablet={8} computer={4}>
                            <Button className="send-contact-us" style={{ borderRadius: 4, padding: 10, marginLeft: 0, marginTop: 40, width: "150px" }}
                                // onClick={() => props.history.push("/following")}
                                onClick={() => handleClickFollowing()}
                            >
                                Following ({followingfDetail ? followingfDetail.following.length : 0})
                            </Button>
                        </Grid.Column>
                    </Grid>
                </div>
                <div>
                <PostListingLikeDislike isMyProfile={true} />

                </div>

            </div>
            <Footer />
        </div>
    );
}
export default withRouter(Home)
