import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "semantic-ui-css/semantic.min.css";
// import "../../Login/Login.scss";
import { Button, Grid, Form, Header, Segment, Menu, Image } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import "../../../App.scss";
import { UserProfileServices } from "../../../Services/UserProfileServices";
import Footer from "../Footer";
import './about-us.scss'
import LogoHeader from "./LogoHeader";


const userProfileServices = new UserProfileServices();

export default function PrivacySetting(props) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [myPost, setMyPost] = React.useState(false);
    const [myShareBio, setMyShareBio] = React.useState(false);
    const [myDislike, setMyDislike] = React.useState(false);


    useEffect(() => {
        window.scrollTo(0, 0)
        setIsLoading(true);
        getPrivacySettingProfile()

    }, []);

    const getPrivacySettingProfile = () => {
        setIsLoading(true);
        userProfileServices.getPrivacySettingProfile().then(
            (data) => {
                if(data.bio_settings){
                if(data.bio_settings == 'Show_Posts_to_anyone'){
                   setMyShareBio(0)
                }else if(data.bio_settings == 'Only_Followers'){
                   setMyShareBio(1)
                }else if(data.bio_settings == 'Only_Following'){
                   setMyShareBio(2)
                }
            }
            if (data.privacy_settings) {
                if(data.privacy_settings == 'Anyone'){
                   setMyPost(1)
                }else if(data.privacy_settings == 'OnlyFollowers'){
                   setMyPost(2)
                }else if(data.privacy_settings == 'OnlyFollowing'){
                   setMyPost(3)
                }
            }
            if (data.like_dislike_settings) {
                if(data.like_dislike_settings == 'Show_Posts_to_anyone'){
                   setMyDislike(0)
                }else if(data.like_dislike_settings == 'Only_Followers'){
                   setMyDislike(1)
                }
            }
                setIsLoading(false);
            },
            (error) => {
                setIsLoading(false);
                console.log("error.response.status", error);
            }
        );
    };
    const handleChange = (e, { value }) => {
        setMyPost(value)
    }
    const handleChangeDislike = (e, { value }) => {
        setMyDislike(value)
    }
    const handleChangeShareBIO = (e, { value }) => {
        setMyShareBio(value)
    }
    const handleClickSubmit =(e) =>{
        e.preventDefault()
        var data={
            privacy_settings: Number(myPost),
            bio_settings: Number(myShareBio),
            like_dislike_settings: Number(myDislike)
        }
        setIsLoading(true);
        userProfileServices.userPrivacySetting(data).then(
            (data) => {
                setIsLoading(false);
                getPrivacySettingProfile()
                toast.success("Profile setting updated", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            },
            (error) => {
                    toast.error(error.message, {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                setIsLoading(false);
                console.log("error.response.status", error);
            }
        );
    }

    return (
        <div className="login-page">
            <LogoHeader />
            <div className="main-content">
                <Header as="h3" >
                    <Icon name="eye slash outline" /> PRIVACY SETTINGS:
                </Header>
                <div>
                    <Form>
                        <label style={{ fontWeight: 600, paddingBottom: 10, display: "block" }}>Who can see my posts?</label>
                        <Form.Group inline>
                            <Form.Radio
                                label='Anyone'
                                value='1'
                                checked={myPost == '1'}
                                onChange={handleChange}
                            />
                            <Form.Radio
                                label='Only my followers'
                                value='2'
                                checked={myPost == '2'}
                                onChange={handleChange}
                            />
                            <Form.Radio
                                label='Only those I’m following'
                                value='3'
                                checked={myPost == '3'}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <label style={{ fontWeight: 600, paddingBottom: 10, display: "block" }}>Share my Bio with:</label>
                        <Form.Group inline>
                            <Form.Radio
                                label='Anyone'
                                value='0'
                                checked={myShareBio == '0'}
                                onChange={handleChangeShareBIO}
                            />
                            <Form.Radio
                                label='Only my followers'
                                value='1'
                                checked={myShareBio == '1'}
                                onChange={handleChangeShareBIO}
                            />
                            <Form.Radio
                                label='Only those I’m following'
                                value='2'
                                checked={myShareBio == '2'}
                                onChange={handleChangeShareBIO}
                            />
                        </Form.Group>
                        <label style={{ fontWeight: 600, paddingBottom: 10, display: "block" }}>Show my total Likes and Dislikes figures? </label>
                        <Form.Group inline>
                            <Form.Radio
                                label='Yes'
                                value='0'
                                checked={myDislike == '0'}
                                onChange={handleChangeDislike}
                            />
                            <Form.Radio
                                label='No'
                                value='1'
                                checked={myDislike == '1'}
                                onChange={handleChangeDislike}
                            />
                        </Form.Group>
                        <div>
                            <Button className="send-contact-us forgot-pwd-send" style={{ borderRadius: 4, margin: 0, marginTop: 25, width: '90px', marginBottom: 20 }}
                                onClick={handleClickSubmit}
                            >
                                Update
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
            <Footer />
        </div>
    );
}
