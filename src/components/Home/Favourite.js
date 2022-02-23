import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import { Button, Grid, Form, Header, Segment, Menu, Image, Input } from "semantic-ui-react";
import "../../App.scss";
import Footer from "../FooterLinks/Footer";
import '../FooterLinks/AboutUs/about-us.scss'
import './home.scss'
import { withRouter } from "react-router-dom";
import HeaderHome from "./HeaderHome";
import PostListingLikeDislike from "./PostListingLikeDislike";



function Favourite(props) {

    return (
        <div className="login-page">
            <HeaderHome />

            <div className="main-content margin-top-100" style={{ height: "100vh" }}>
            <Header as="h3">
                   My Favourite
                </Header>
                <div className="btn-create-reaction-followers-following">
                    <Grid>
                        <Grid.Column mobile={8} tablet={8} computer={4}>
                            <Button className="send-contact-us"
                                onClick={() => props.history.push("/create-post")}
                                style={{ borderRadius: 4, padding: 10, marginLeft: 0, marginTop: 40, width: "150px" }}>
                                Create Post
                            </Button>
                        </Grid.Column>
                        <Grid.Column mobile={8} tablet={8} computer={4}>
                            <Button className="send-contact-us" style={{ borderRadius: 4, padding: 10, marginLeft: 0, marginTop: 40, width: "150px" }}
                                onClick={() => props.history.push("/public-reactions")}

                            >
                                Public Reactions
                            </Button>
                        </Grid.Column>
                        <Grid.Column mobile={8} tablet={8} computer={4}>
                            <Button className="send-contact-us" style={{ borderRadius: 4, padding: 10, marginLeft: 0, marginTop: 40, width: "150px" }} onClick={() => props.history.push("/user-profile")}>
                                My Reactions
                            </Button>
                        </Grid.Column>
                        <Grid.Column mobile={8} tablet={8} computer={4}>
                        </Grid.Column>
                    </Grid>
                </div>
                <div>
                    <PostListingLikeDislike isFavourite={true} />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default withRouter(Favourite)
