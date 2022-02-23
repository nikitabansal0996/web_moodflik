import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import { Button, Grid, Form, Header, Segment, Input, Image } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import "../../../App.scss";
import Footer from "../Footer";
import './about-us.scss'
import LogoHeader from "./LogoHeader";
import { UserProfileServices } from "../../../Services/UserProfileServices";
import { toast } from "react-toastify";
import { uploadFile } from "react-s3";

const userProfileServices = new UserProfileServices();


export default function ProfileSetting(props) {
    const [profileDetail, setProfileDetail] = useState({
        username: "",
        phone_number: "",
        country: "",
        city: "",
        website: "",
        me: "",
        like: "",
        dislike: "",
    })
    const [isLoading, setIsLoading] = React.useState(false);
    const [profileImage, setProfileImage] = React.useState(false);
    const [cover_photo_url, setCover_photo_url] = React.useState(false);

    useEffect(() => {
        setIsLoading(true);
        getUserProfileDetail()
    }, []);

    const _handleUploadImage = (event, type) => {
        const config = {
            bucketName: "moodflik-portal",
            dirName: "img" /* optional */,
            region: "us-east-2",
            accessKeyId: "AKIAWFNJSIDVAQA2KNEU",
            secretAccessKey: "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",
        };
        const file = event.target.files[0];
        uploadFile(file, config)
            .then((data) => {
                if(type == "cover"){
                    setCover_photo_url(data.location.replace(/ /g, "%20"))
                }else{
                    setProfileImage(data.location.replace(/ /g, "%20"));
                }
            })
            .catch((err) => console.error(err));
    };

    const getUserProfileDetail = () => {
        setIsLoading(true);
        userProfileServices.getUserProfileDetail().then(
            (data) => {
                setProfileDetail({
                    username: data.username,
                    phone_number: data.phone_number,
                    country: data.country,
                    city: data.city,
                    website: data.website,
                    me: data.me,
                    like: data.like,
                    dislike: data.dislike
                })
                localStorage.setItem("userName", data.username)
                setProfileImage(data.photo_url)
                setCover_photo_url(data.cover_photo_url)
                setIsLoading(false);
            },
            (error) => {
                setIsLoading(false);
                console.log("error.response.status", error);
            }
        );
    };

    const handleChnageProfileDetail = (e) => {
        const { name, value } = e.target
        setProfileDetail({
            ...profileDetail,
            [name]: value,
        });
    }

    const handleClickSubmit = (e) => {
        e.preventDefault()
        var data = {
            photo_url: profileImage,
            cover_photo_url: cover_photo_url,
            ...profileDetail
        }
        setIsLoading(true);
        localStorage.setItem("userName", profileDetail.username)

        userProfileServices.userProfileUpdate(data).then(
            (data) => {
                setIsLoading(false);
                getUserProfileDetail()
                toast.success("Profile updated", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            },
            (error) => {
                if (error.response.data && error.response.data.username && error.response.data.username[0]) {
                    toast.error(error.response.data.username[0], {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                } else {
                    toast.error(error.message, {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }

                setIsLoading(false);
                console.log("error.response.status", error);
            }
        );
    }

    return (
        <div className="login-page">
            <LogoHeader />
            <div className="main-content">
                <Header as="h3">
                    <Icon name="user plus" style={{ marginRight: 40 }} />  ACCOUNT AND PROFILE SETTING:
                </Header>
                <div className="">
                    <div className="profile-form">
                        <Form>
                            <div style={{ position: "relative" }}>
                                <div>
                                    <Image
                                        src={cover_photo_url ? cover_photo_url : "https://i.pinimg.com/originals/30/5c/5a/305c5a457807ba421ed67495c93198d3.jpg"}
                                        className="image-cover-photo"
                                    />
                                    <div class="image-upload-profile">
                                        <React.Fragment>
                                            <label className="lable-for-file-input" for="file-input-cover">
                                                <Icon name="camera" />
                                            </label>
                                            <Form.Input
                                                id="file-input-cover"
                                                type="file"
                                                name="profile"
                                                accept="image/jpeg,image/jpg"
                                                onChange={(e) => _handleUploadImage(e, "cover")}
                                            />
                                        </React.Fragment>
                                    </div>
                                </div>
                                <div
                                    className="div-flex create-post-profile"
                                    style={{ marginBottom: 130 }}
                                >
                                    <div className="div-flex image-cover-head">
                                        <div className="parent-image-cover" style={{left: "38%"}}>
                                            <div class="image-upload-profile image-profile-custom" style={{ marginBottom: 25 }}>
                                                <Form enctype="multipart/form-data" id="user-form">
                                                    <Image src={profileImage ? profileImage : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"} />
                                                    <React.Fragment>
                                                        <label for="file-input">
                                                            <Icon name="camera" />
                                                        </label>
                                                        <Form.Input
                                                            id="file-input"
                                                            type="file"
                                                            name="profile"
                                                            accept="image/jpeg,image/jpg"
                                                            // style={{pointerEvents: this.props.isLoading==='isLoadingImageUpload' && 'none'}}
                                                            onChange={(e) => _handleUploadImage(e, "image")}
                                                        />
                                                    </React.Fragment>
                                                </Form>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <Form.Group widths='equal'>
                                <Form.Input fluid className="input-boder-bottom" placeholder='Choose Username' name="username" onChange={handleChnageProfileDetail} value={profileDetail.username} />
                                <Form.Input fluid type="number" className="input-boder-bottom" placeholder='Mobile Number' name="phone_number" onChange={handleChnageProfileDetail} value={profileDetail.phone_number} />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Input fluid className="input-boder-bottom" placeholder='Choose country' name="country" onChange={handleChnageProfileDetail} value={profileDetail.country} />
                                <Form.Input fluid className="input-boder-bottom" placeholder='City' name="city" onChange={handleChnageProfileDetail} value={profileDetail.city} />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Input fluid className="input-boder-bottom" placeholder='Website(Optional)' name="website" onChange={handleChnageProfileDetail} value={profileDetail.website} />
                            </Form.Group>
                            <p style={{ textAlign: "center" }}>
                                Edit Bio:
                            </p>
                            <div className="profile-setting-bio">
                                <Form.Field inline>
                                    <label>Me in 3 words: </label>
                                    <Input className="input-boder-bottom" name="me" onChange={handleChnageProfileDetail} maxLength={130} value={profileDetail.me} />
                                </Form.Field>
                            </div>
                            <div className="profile-setting-bio">
                                <Form.Field inline>
                                    <label>Things I Love: </label>
                                    <Input className="input-boder-bottom" name="like" onChange={handleChnageProfileDetail} maxLength={130} value={profileDetail.like} />
                                </Form.Field>
                            </div>
                            <div className="profile-setting-bio">
                                <Form.Field inline>
                                    <label>Things I Dislike: </label>
                                    <Input className="input-boder-bottom" name="dislike" onChange={handleChnageProfileDetail} maxLength={130} value={profileDetail.dislike} />
                                </Form.Field>
                            </div>
                            <div>
                                <label style={{ float: "right" }}>(130 max)</label>
                            </div>
                            <div>
                                <Button className="send-contact-us forgot-pwd-send" style={{ borderRadius: 4, margin: 0, float: "right", clear: "both", marginTop: 25, width: '90px', marginBottom: 20 }}
                                    onClick={handleClickSubmit}
                                >
                                    Update
                                </Button>
                            </div>

                            <Button className="send-contact-us forgot-pwd-send" style={{ borderRadius: 4, marginTop: 25, marginBottom: 20, clear: "both", width: "190px", backgroundColor: "#BF1414" }}>
                                Delete account
                            </Button>
                        </Form>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
}
