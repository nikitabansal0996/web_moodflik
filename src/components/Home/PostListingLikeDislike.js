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
    Dropdown
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
import { UserProfileServices } from "../../Services/UserProfileServices";

const homeServices = new HomeServices();
const userProfileServices = new UserProfileServices();

function PostListingLikeDislike(props) {
    const [commentIndex, setCommentIndex] = useState("");
    const [postUserListLike, setPostUserListLike] = useState("");
    const [postUserListDislike, setPostUserListDislike] = useState("");
    const [commentList, setCommentList] = useState([]);
    const [commentInput, setCommentInput] = useState([]);
    const [isDisableInput, setIsDisableInput] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isShowCommentBox, setIsShowCommentBox] = React.useState(false);
    const [commentDislikeInput, setCommentDislikeInput] = useState([]);
    const [commentDislikeIndex, setCommentDislikeIndex] = useState("");
    const [commentDislikeList, setCommentDislikeList] = useState([]);

    const [thingsLovePost, setThingsLovePost] = useState(false)
    const [thingsDislikePost, setThingsDislikePost] = useState(false)

    useEffect(() => {
        setIsLoading(true);
        if (props.isMyProfile || props.isFavourite) {
            getMyLikePost()
            getMyDislike()
        } else {
            getAllCreatePost();
            getAllCreatePostDislike();
        }

    }, []);


    const getMyLikePost = () => {
        
        var url = "api/my_posts/?type=like"
        if (props.isFavourite) {
            url = "api/favourites/?type=like"
        }
        if(props.match.path == '/user-profile/:id'){
            url = `api/my_posts/?type=like&user_id=${props.match.params.id}`
        }
        setIsLoading(true);
        userProfileServices.getMyLikePost(url).then(
            (data) => {
                setThingsLovePost(data)
                setPostUserListLike(data.results)
                setIsLoading(false);
            },
            (error) => {
                setIsLoading(false);
                console.log("error.response.status", error);
            }
        );
    };
    const getMyDislike = () => {
        var url = "api/my_posts/?type=dislike"
        if (props.isFavourite) {
            url = "api/favourites/?type=dislike"
        }
        if(props.match.path == '/user-profile/:id'){
            url = `api/my_posts/?type=dislike&user_id=${props.match.params.id}`
        }
        setIsLoading(true);
        userProfileServices.getMyDislike(url).then(
            (data) => {
                setThingsDislikePost(data)
                setPostUserListDislike(data.results)
                setIsLoading(false);
            },
            (error) => {
                setIsLoading(false);
                console.log("error.response.status", error);
            }
        );
    };

    const getAllCreatePost = (id) => {
        setIsLoading(true);
        homeServices.getAllCreatePost().then(
            (data) => {
                setPostUserListLike(data.results);
                setIsLoading(false);
            },
            (error) => {
                setIsLoading(false);
                console.log("error.response.status", error);
            }
        );
    };

    // user click on follow
    const handleClickFollowingUser = (id) => {
        setIsLoading(true);
        // handleClickToSeePost(id)
        homeServices.handleClickFollowingUser(id).then(
            (data) => {
                setIsLoading(false);
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
    };

    const getAllCreatePostDislike = (id) => {
        setIsLoading(true);
        homeServices.getAllCreatePostDislike().then(
            (data) => {
                setPostUserListDislike(data.results);
                setIsLoading(false);
            },
            (error) => {
                setIsLoading(false);
                console.log("error.response.status", error);
            }
        );
    };

    // get comment listing api for particular post
    const handleOpenClickComment = (id, index) => {
        setCommentIndex(index);
        setCommentDislikeIndex("")
        handleClickToSeePost(id)
        setIsShowCommentBox(!isShowCommentBox);
        homeServices.getCommentParticularPost(id).then(
            (data) => {
                setCommentList(data);
                if (props.isMyProfile) {
                    getMyLikePost()
                } else {
                    getAllCreatePost();
                }
            },
            (error) => {
                console.log("error.response.status", error);
            }
        );
    };

     // post see listing api for particular post
     const handleClickToSeePost = (id,isSeen, isLike) => {
        setIsLoading(true);
        homeServices.handleClickPostSee(id).then(
            (data) => {
                setIsLoading(false);
                if (props.isMyProfile && isLike == "dislikePost") {
                    getMyDislike()
                } else if (props.isMyProfile) {
                    getMyLikePost()
                } else if (isLike == "dislikePost") {
                    getAllCreatePostDislike()
                } else {
                    getAllCreatePost();
                }
            },
            (error) => {
                toast.error(error.message, {
                    position: toast.POSITION.TOP_RIGHT,
                });
                setIsLoading(false);
                console.log("error.response.status", error);
            }
        );
    };
    // post see listing api for particular post
    const getToSeePost = (id) => {
        setIsLoading(true);
        homeServices.getPostSee(id).then(
            (data) => {
                setIsLoading(false);
            },
            (error) => {
                toast.error(error.message, {
                    position: toast.POSITION.TOP_RIGHT,
                });
                setIsLoading(false);
                console.log("error.response.status", error);
            }
        );
    };

    // get comment listing api for particular post for dislike
    const handleOpenClickCommentDisLike = (id, index) => {
        setCommentDislikeIndex(index);
        setCommentIndex("")
        handleClickToSeePost(id)
        setIsShowCommentBox(!isShowCommentBox);
        homeServices.getCommentParticularPost(id).then(
            (data) => {
                setCommentDislikeList(data);
                if (props.isMyProfile) {
                    getMyDislike()
                } else {
                    getAllCreatePostDislike();
                }
            },
            (error) => {
                console.log("error.response.status", error);
            }
        );
    };

    // Like and Dislike of any particular post
    const handleOpenClickLikeDisLikePost = (id, index, type, isLike) => {
        var payload = {
            post: id,
            reaction: type,
        };
        handleClickToSeePost(id)
        homeServices.getLikeOrDislikeParticularPost(payload).then(
            (data) => {
                if (props.isMyProfile && isLike == "dislikePost") {
                    getMyDislike()
                } else if (props.isMyProfile) {
                    getMyLikePost()
                } else if (isLike == "dislikePost") {
                    getAllCreatePostDislike()
                } else {
                    getAllCreatePost();
                }

            },
            (error) => {
                console.log("error.response.status", error);
            }
        );
    };

    // add favourate api
    const handleOpenClickFavouratePost = (id, isFavourate, isLike) => {
        var url = "api/favourites/";
        var payload = {
            post: id,
        };
        handleClickToSeePost(id)
        homeServices.addFavouratePost(url, payload).then(
            (data) => {
                if (props.isMyProfile && isLike == "dislikePost") {
                    getMyDislike()
                } else if (props.isMyProfile) {
                    getMyLikePost()
                } else if (isLike == "dislikePost") {
                    getAllCreatePostDislike()
                } else {
                    getAllCreatePost();
                }
            },
            (error) => {
                console.log("error.response.status", error);
            }
        );
    };

    // onChange add comment like
    const handleInputComment = (e, i) => {
        let values = [...commentInput];
        values[i] = e.target.value;
        setCommentInput(values);
    };

    // onChange add comment dislike
    const handleInputCommentDisLike = (e, i) => {
        let values = [...commentInput];
        values[i] = e.target.value;
        setCommentDislikeInput(values);
    };

    const handleKeypress = (e, id, index, type) => {
        //it triggers by pressing the enter key
        if (e.key === "Enter") {
            handleAddComment(id, index, type);
        }
    };

    const handleAddComment = (id, index, type) => {
        if (commentInput) {
            setIsDisableInput(true);
            handleClickToSeePost(id)
            var params = {
                post: id,
                comment:
                    type == "like" ? commentInput[index] : commentDislikeInput[index],
            };
            homeServices.addCommentLikePost(params).then(
                (data) => {
                    if (type == "like") {
                        handleOpenClickComment(id, index);
                    } else {
                        handleOpenClickCommentDisLike(id, index);
                    }
                    setCommentInput([]);
                    setCommentDislikeInput([]);
                    setIsDisableInput(false);
                    toast.success("Commented successfully", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                },
                (error) => {
                    toast.error(error.message, {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    setIsDisableInput(false);
                    console.log("error.response.status", error);
                }
            );
        }
    };

    const check5Minute = (date) => {
        var result = timeDifference(new Date(), new Date(date));
        if (result.includes('seconds ago')) {
            return false;
        } else if (result.includes('minutes ago')) {
            let firstWord = result.split(" ")[0]
            var check = parseInt(firstWord.trim());
            if (check > 4) {
                return true;
            } else {
                return false;
            }
        } else if (!result.includes('seconds ago')) {
            return true;
        } else {
            return false;
        }
    }

    const timeDifference = (current, previous) => {
        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;
        var elapsed = current - previous;
        if (elapsed < msPerMinute) {
            return Math.round(elapsed / 1000) + ' seconds ago';
        }
        else if (elapsed < msPerHour) {
            return Math.round(elapsed / msPerMinute) + ' minutes ago';
        }
        else if (elapsed < msPerDay) {
            return Math.round(elapsed / msPerHour) + ' hours ago';
        }
        else if (elapsed < msPerMonth) {
            if (Math.round(elapsed / msPerDay) > 1) {
                return Math.round(elapsed / msPerDay) + ' days ago';
            } else {
                return Math.round(elapsed / msPerDay) + ' day ago';
            }
        }
        else if (elapsed < msPerYear) {
            if (Math.round(elapsed / msPerMonth) > 1) {
                return Math.round(elapsed / msPerMonth) + ' months ago';
            } else {
                return Math.round(elapsed / msPerMonth) + ' month ago';
            }
        }
        else {
            if (Math.round(elapsed / msPerYear) > 1) {
                return Math.round(elapsed / msPerYear) + ' years ago';
            } else {
                return Math.round(elapsed / msPerYear) + ' year ago';
            }
        }
    }

    const dateFormat = (date) => {
        var result = timeDifference(new Date(), new Date(date));
        return result;
    }

    const handleClickDeleteMyPost =(id, isLike) => {
        var url= `api/post_update/${id}`
        homeServices.deleteMyPost(url).then(
            (data) => {
                if (props.isMyProfile && isLike == "dislikePost") {
                    getMyDislike()
                } else if (props.isMyProfile) {
                    getMyLikePost()
                } else if (isLike == "dislikePost") {
                    getAllCreatePostDislike()
                } else {
                    getAllCreatePost();
                }
                debugger
                toast.success(data.message ? data.message : data.response, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            },
            (error) => {
                toast.error(error.message, {
                    position: toast.POSITION.TOP_RIGHT,
                });
                console.log("error.response.status", error);
            }
        );
    }

    return (
        <div>

            <div>

                <div style={{ marginTop: 30, height: 300 }}>
                    <Grid>
                        <Grid.Column
                            mobile={16}
                            tablet={8}
                            computer={8}
                            className="border-right-colm"
                        >
                            <div className="home-think-like">
                                <div className="child-thigs-like">
                                    {
                                        props.isMyProfile ?
                                            <div>
                                                <p>Things I Love</p>
                                                <p>({thingsLovePost ? thingsLovePost.count : 0})</p>
                                            </div>
                                            :
                                            <div>
                                                <p>Likes {postUserListLike && postUserListLike.count}</p>
                                            </div>
                                    }



                                    <Image
                                        src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fs3.amazonaws.com%2Fappforest_uf%2Ff1601833595390x320408036269073540%2Fsmile.png?w=48&h=48&auto=compress&fit=crop&dpr=1"
                                        width="30"
                                        height="30"
                                        style={{ marginLeft: 12 }}
                                    />
                                </div>
                            </div>

                            <div className="public-reaction-content">
                                {postUserListLike && postUserListLike.length > 0 ? (
                                    postUserListLike.map((post, i) => {
                                        return (
                                            <div>
                                                <>
                                                    <Grid>
                                                        <Grid.Row>
                                                            <Grid.Column width={7}>
                                                                <div className="image-name-user">
                                                                    <Image src={userImage} width="50" />
                                                                    <Header as="h5" onClick={() => props.history.push(`/user-profile/${post.posted_by}`)} style={{cursor: "pointer"}}>
                                                                        {post.first_name || post.last_name
                                                                            ? `${post.first_name} ${post.last_name}`
                                                                            : `N/A`}
                                                                    </Header>
                                                                </div>
                                                            </Grid.Column>
                                                            <Grid.Column width={6}>
                                                                <div className="image-name-user">
                                                                    <Header as="h5" className="font-italic">

                                                                        {check5Minute(post.created_at) ? 'was' : 'is currently'} loving:
                                                                    </Header>
                                                                </div>
                                                            </Grid.Column>
                                                            <Grid.Column width={2}>
                                                                <div className="image-name-user">
                                                                    <Icon
                                                                        name="add user"
                                                                        style={{cursor: "pointer"}}
                                                                        className="follow-icon"
                                                                        onClick={() => handleClickFollowingUser(post.posted_by)}
                                                                    />
                                                                </div>
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                    </Grid>
                                                    <PublicLike
                                                        content={post.content}
                                                        why_content={post.why_content}
                                                        media_url={post.media_url}
                                                        content_type={post.content_type}
                                                    />
                                                    <p className="text-right">{dateFormat(post.created_at)}</p>
                                                    <div className="text-right public-reaction-icon-content">
                                                        <Icon
                                                            name={
                                                                post.is_favourite ? "heart" : "heart outline"
                                                            }
                                                            className="public-reaction-icon"
                                                            onClick={() =>
                                                                handleOpenClickFavouratePost(
                                                                    post.uuid,
                                                                    post.is_favourite
                                                                )
                                                            }
                                                        />
                                                        <span className="count-user-reaction">
                                                            ({post.favourite_count})
                                                        </span>
                                                        <Icon
                                                            name={
                                                                post.is_like ? "thumbs up" : "thumbs up outline"
                                                            }
                                                            className="public-reaction-icon"
                                                            onClick={() =>
                                                                handleOpenClickLikeDisLikePost(
                                                                    post.uuid,
                                                                    i,
                                                                    "like"
                                                                )
                                                            }
                                                        />
                                                        <span className="count-user-reaction">
                                                            ({post.like_count})
                                                        </span>
                                                        <Icon
                                                            name={
                                                                post.is_dislike
                                                                    ? "thumbs down"
                                                                    : "thumbs down outline"
                                                            }
                                                            className="public-reaction-icon"
                                                            onClick={() =>
                                                                handleOpenClickLikeDisLikePost(
                                                                    post.uuid,
                                                                    i,
                                                                    "dislike"
                                                                )
                                                            }
                                                        />
                                                        <span className="count-user-reaction">
                                                            ({post.dislike_count})
                                                        </span>
                                                        <Icon
                                                            name={
                                                                post.is_comment ? "comment" : "comment outline"
                                                            }
                                                            className="public-reaction-icon"
                                                            onClick={() =>
                                                                handleOpenClickComment(post.uuid, i)
                                                            }
                                                        />
                                                        <span className="count-user-reaction">
                                                            ({post.comments_count})
                                                        </span>
                                                        <Icon
                                                            name="share square"
                                                            className="public-reaction-icon"
                                                        />
                                                        <span className="count-user-reaction">
                                                            (0)
                                                        </span>
                                                        <Icon name={
                                                                post.is_seen ? "eye" : "eye slash outline"
                                                            } onClick={() => handleClickToSeePost(post.uuid, post.is_seen)} className="public-reaction-icon" />

                                                        <span className="count-user-reaction">
                                                            ({post.seen_count})
                                                        </span>
                                                        <Dropdown icon="ellipsis vertical" pointing='right' className='link item'>
                                                            <Dropdown.Menu>
                                                                {
                                                                    post.posted_by == localStorage.getItem("uid") ?
                                                                        <>
                                                                            <Dropdown.Item onClick={() => props.history.push(`/create-post/${post.uuid}`)}>Edit</Dropdown.Item>
                                                                            <Dropdown.Item onClick={() => handleClickDeleteMyPost(post.uuid) }>Delete</Dropdown.Item>
                                                                        </>
                                                                        :
                                                                        <>
                                                                            <Dropdown.Item>Report</Dropdown.Item>
                                                                        </>
                                                                }


                                                            </Dropdown.Menu>
                                                        </Dropdown>

                                                    </div>
                                                    {commentIndex === i &&
                                                        isShowCommentBox &&
                                                        commentList.length > 0 &&
                                                        commentList.map((commnetVal, index) => {
                                                            return (
                                                                <>
                                                                    <div className="comment-listed">
                                                                        <div className="user-comment">
                                                                            <Image
                                                                                src={
                                                                                    commnetVal.photo_url
                                                                                        ? commnetVal.photo_url
                                                                                        : userImage
                                                                                }
                                                                            />
                                                                            <div className="single-comment">
                                                                                <p>{`${commnetVal.first_name} ${commnetVal.last_name}`}</p>
                                                                                <p>{commnetVal.comment}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            );
                                                        })}

                                                    <div className="comment-input-send">
                                                        <Form.Input
                                                            fluid
                                                            type="text"
                                                            placeholder="Comment here...."
                                                            value={
                                                                commentInput && commentInput[i]
                                                                    ? commentInput[i]
                                                                    : ""
                                                            }
                                                            onChange={(e) => handleInputComment(e, i)}
                                                            disabled={isDisableInput ? true : false}
                                                            name="comment"
                                                            autoFocus={true}
                                                            onKeyPress={(e) =>
                                                                handleKeypress(e, post.uuid, i, "like")
                                                            }
                                                        // maxLength={50}ss
                                                        />
                                                        <Icon
                                                            name="send"
                                                            onClick={() =>
                                                                handleAddComment(post.uuid, i, "like")
                                                            }
                                                        />
                                                    </div>
                                                    <hr className="horigental-line" />
                                                </>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div>
                                        <Header as="h3" textAlign="center">
                                            No record found
                                        </Header>
                                    </div>
                                )}
                            </div>
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={8} computer={8}>
                            <div
                                className="home-think-like"
                                style={{ background: "#BF1414" }}
                            >
                                <div className="child-thigs-like">
                                    {
                                        props.isMyProfile ?
                                            <div>
                                                <p>Things I Dislike</p>
                                                <p>({thingsDislikePost ? thingsDislikePost.count : 0})</p>
                                            </div>
                                            :
                                            <div>
                                                <p>
                                                    {" "}
                                                    Dislikes {postUserListLike && postUserListLike.count}
                                                </p>
                                            </div>
                                    }


                                    <Image
                                        src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fs3.amazonaws.com%2Fappforest_uf%2Ff1601829567583x260148826231129120%2Fagr.png?w=48&h=48&auto=compress&fit=crop&dpr=1"
                                        width="30"
                                        height="30"
                                        style={{ marginLeft: 12 }}
                                    />
                                </div>
                            </div>
                            <div className="public-reaction-content">
                                {postUserListDislike && postUserListDislike.length > 0 ? (
                                    postUserListDislike.map((item, i) => {
                                        return (
                                            <div>
                                                <>
                                                    <Grid>
                                                        <Grid.Row>
                                                            <Grid.Column width={7}>
                                                                <div className="image-name-user">
                                                                    <Image src={userImage} width="50" />
                                                                    <Header as="h5" onClick={() => props.history.push(`/user-profile/${item.posted_by}`)} style={{cursor: "pointer"}}>
                                                                        {item.first_name || item.last_name
                                                                            ? `${item.first_name} ${item.last_name}`
                                                                            : `N/A`}
                                                                    </Header>
                                                                </div>
                                                            </Grid.Column>
                                                            <Grid.Column width={6}>
                                                                <div className="image-name-user">
                                                                    <Header as="h5" className="font-italic">
                                                                        {check5Minute(item.created_at) ? '' : 'currently'} dislikes:
                                                                    </Header>
                                                                </div>
                                                            </Grid.Column>
                                                            <Grid.Column width={2}>
                                                                <div className="image-name-user">
                                                                    <Icon
                                                                        name="add user"
                                                                        style={{cursor: "pointer"}}
                                                                        className="follow-icon"
                                                                        onClick={() => handleClickFollowingUser(item.posted_by)}
                                                                    />
                                                                </div>
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                    </Grid>
                                                    <PublickDislike
                                                        content={item.content}
                                                        why_content={item.why_content}
                                                        media_url={item.media_url}
                                                        content_type={item.content_type}
                                                    />
                                                    <p className="text-right">{dateFormat(item.created_at)}</p>
                                                    <div className="text-right public-reaction-icon-content">
                                                        <Icon
                                                            name={
                                                                item.is_favourite ? "heart" : "heart outline"
                                                            }
                                                            className="public-reaction-icon"
                                                            onClick={() =>
                                                                handleOpenClickFavouratePost(
                                                                    item.uuid,
                                                                    item.is_favourite,
                                                                    "dislikePost"
                                                                )
                                                            }
                                                        />
                                                        <span className="count-user-reaction">
                                                            ({item.favourite_count})
                                                        </span>
                                                        <Icon
                                                            name={
                                                                item.is_like ? "thumbs up" : "thumbs up outline"
                                                            }
                                                            className="public-reaction-icon"
                                                            onClick={() =>
                                                                handleOpenClickLikeDisLikePost(
                                                                    item.uuid,
                                                                    i,
                                                                    "like",
                                                                    "dislikePost"
                                                                )
                                                            }
                                                        />
                                                        <span className="count-user-reaction">
                                                            ({item.like_count})
                                                        </span>
                                                        <Icon
                                                            name={
                                                                item.is_dislike
                                                                    ? "thumbs down"
                                                                    : "thumbs down outline"
                                                            }
                                                            className="public-reaction-icon"
                                                            onClick={() =>
                                                                handleOpenClickLikeDisLikePost(
                                                                    item.uuid,
                                                                    i,
                                                                    "dislike",
                                                                    "dislikePost"
                                                                )
                                                            }
                                                        />
                                                        <span className="count-user-reaction">
                                                            ({item.dislike_count})
                                                        </span>
                                                        <Icon
                                                            name={
                                                                item.is_comment ? "comment" : "comment outline"
                                                            }
                                                            className="public-reaction-icon"
                                                            onClick={() =>
                                                                handleOpenClickCommentDisLike(item.uuid, i)
                                                            }
                                                        />
                                                        <span className="count-user-reaction">
                                                            ({item.comments_count})
                                                        </span>
                                                        <Icon
                                                            name="share square"
                                                            className="public-reaction-icon"
                                                        />
                                                        <span className="count-user-reaction">
                                                        </span>
                                                        <Icon  name={
                                                                item.is_seen ? "eye" : "eye slash outline"
                                                            } onClick={() => handleClickToSeePost(item.uuid, item.is_seen,
                                                                "dislikePost")} className="public-reaction-icon" />
                                                        <span className="count-user-reaction">
                                                        ({item.seen_count})
                                                        </span>
                                                        <Dropdown icon="ellipsis vertical" pointing='right' className='link item'>
                                                            <Dropdown.Menu>
                                                                {
                                                                    item.posted_by == localStorage.getItem("uid") ?
                                                                        <>
                                                                            <Dropdown.Item onClick={() => props.history.push(`/create-post/${item.uuid}`)}>Edit</Dropdown.Item>
                                                                            <Dropdown.Item onClick={() => handleClickDeleteMyPost(item.uuid, "dislikePost") }>Delete</Dropdown.Item>
                                                                        </>
                                                                        :
                                                                        <>
                                                                            <Dropdown.Item>Report</Dropdown.Item>
                                                                        </>
                                                                }


                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </div>
                                                    {commentDislikeIndex === i &&
                                                        isShowCommentBox &&
                                                        commentDislikeList.length > 0 &&
                                                        commentDislikeList.map((commnetVal, index) => {
                                                            return (
                                                                <>
                                                                    <div className="comment-listed">
                                                                        <div className="user-comment">
                                                                            <Image
                                                                                src={
                                                                                    commnetVal.photo_url
                                                                                        ? commnetVal.photo_url
                                                                                        : userImage
                                                                                }
                                                                            />
                                                                            <div className="single-comment">
                                                                                <p>{`${commnetVal.first_name} ${commnetVal.last_name}`}</p>
                                                                                <p>{commnetVal.comment}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            );
                                                        })}
                                                    <div className="comment-input-send">
                                                        <Form.Input
                                                            fluid
                                                            type="text"
                                                            placeholder="Comment here...."
                                                            value={
                                                                commentDislikeInput && commentDislikeInput[i]
                                                                    ? commentDislikeInput[i]
                                                                    : ""
                                                            }
                                                            onChange={(e) => handleInputCommentDisLike(e, i)}
                                                            disabled={isDisableInput ? true : false}
                                                            name="comment"
                                                            autoFocus={true}
                                                            onKeyPress={(e) =>
                                                                handleKeypress(e, item.uuid, i, "dislike")
                                                            }
                                                        // maxLength={50}ss
                                                        />
                                                        <Icon
                                                            name="send"
                                                            onClick={() =>
                                                                handleAddComment(item.uuid, i, "dislike")
                                                            }
                                                        />
                                                    </div>
                                                    <hr className="horigental-line" />
                                                </>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div>
                                        <Header as="h3" textAlign="center">
                                            No record found
                                        </Header>
                                    </div>
                                )}
                            </div>
                        </Grid.Column>
                    </Grid>
                </div>
            </div>
        </div>
    );
}
export default withRouter(PostListingLikeDislike);
