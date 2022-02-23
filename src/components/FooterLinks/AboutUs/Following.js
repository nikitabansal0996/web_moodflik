import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
// import "../../Login/Login.scss";
import { Button, Grid, Form, Header, Segment, Menu, Image } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import "../../../App.scss";
import Footer from "../Footer";
import './about-us.scss'
import LogoHeader from "./LogoHeader";
import { UserProfileServices } from '../../../Services/UserProfileServices';
import { toast } from "react-toastify";

const userProfileServices = new UserProfileServices();


export default function Following(props) {
    // const [activeItem, setActiveItem] = useState("home")
    const [followingfDetail, setFollowingfDetail] = useState(false)
    const [isLoading, setIsLoading] = React.useState(false);

    useEffect(() => {
        setIsLoading(true);
        if(props.match.params && props.match.params.id){
            getUserFollowersOrFollowing(props.match.params.id)
        }
        else{
            getUserFollowersOrFollowing()
        }
    }, []);

    const getUserFollowersOrFollowing = (id="") => {
        setIsLoading(true);
        userProfileServices.getUserFollowersOrFollowing(id).then(
            (data) => {
                setFollowingfDetail(data.data.following)
                setIsLoading(false);
            },
            (error) => {
                setIsLoading(false);
                console.log("error.response.status", error);
            }
        );
    };

    const handleClickUnFollow = (id) => {
        setIsLoading(true);
        userProfileServices.handleClickUnFollow(id).then(
            (data) => {
                setIsLoading(false);
                getUserFollowersOrFollowing()
                toast.success(data.message ? data.message : data.response, {
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
                <Header as="h3">
                    Following
                </Header>
                {
                    followingfDetail.length > 0 &&
                    followingfDetail.map((item) => {
                        return <div className="div-inline" style={{ marginBottom: 15, display: "flex" }}>
                            <div className="div-inline" style={{ width: "70%", display: "flex" }}>
                                <div className="img-block-user">
                                    <div className="div-inline img-div-follow">
                                        <Image src={item.photo_url ? item.photo_url : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"} width="100" height="100" />

                                    </div>
                                </div>
                                <p className="div-inline text-block-user">
                                    <Header as="h3">
                                        {item.first_name} {item.last_name}

                                    </Header>
                                    <Header as="h5" style={{ color: "#838392", margin: 0 }}>

                                        {item.email}
                                    </Header>
                                </p>
                            </div>
                            <div className="div-inline" style={{ width: "30%" }}>
                                <Button className="send-contact-us" style={{ borderRadius: 4, padding: 10 }} onClick={() => handleClickUnFollow(item.uuid)}>
                                    UnFollow
                                </Button>
                            </div>
                        </div>
                    })
                }


            </div>
            <Footer />
        </div>
    );
}
