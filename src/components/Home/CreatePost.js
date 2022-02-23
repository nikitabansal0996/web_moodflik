import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import { Button, Grid, Form, Image } from "semantic-ui-react";
import { Icon, Modal } from "semantic-ui-react";
import "../../App.scss";
import Footer from "../FooterLinks/Footer";
import "../FooterLinks/AboutUs/about-us.scss";
import "./home.scss";
import HeaderHome from "./HeaderHome";
import { uploadFile } from "react-s3";
import { HomeServices } from "../../Services/HomeServices";
import { toast } from "react-toastify";
import Giphy from "./Giphy";
import VideoThumbnail from "react-video-thumbnail";
import { UserProfileServices } from "../../Services/UserProfileServices";
import Picker from "emoji-picker-react";

const homeServices = new HomeServices();
const userProfileServices = new UserProfileServices();

export default function CreatePost(props) {
  const [fileType, setFileType] = useState(false);
  const [currentDislikeWhy, setCurrentDislikeWhy] = useState("");
  const [currentDislike, setCurrentDislike] = useState("");
  const [currentLove, setCurrentLove] = useState("");
  const [currentLoveWhy, setCurrentLoveWhy] = useState("");
  const [uploadImagePath, setUploadImagePath] = useState("");
  const [uploadImagePathDislike, setUploadImagePathDislike] = useState("");
  const hiddenFileInput = React.useRef(null);
  const hiddenFileInputDislike = React.useRef(null);
  const [isShowGifClick, setIsShowGifClick] = useState(false);
  const [isDisableBtn, setIsDisableBtn] = React.useState(false);
  const [isShowGIFDefaultutValue, setIsShowGIFDefaultutValue] =
    React.useState("");
  const [isTypeLikeDislike, setIsTypeLikeDislike] = useState(false);
  const [profileDetail, setProfileDetail] = useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [favPostLikeDislike, setFavPostLikeDislike] = useState("");
  const [favPostLike, setFavPostLike] = useState("");
  const [postId, setPostId] = useState("");
  const [postType, setPostType] = useState("");
  const [isOpenCurrentDislikeEmoji, setIsOpenCurrentDislikeEmoji] =
    React.useState(false);
  const [isOpenCurrentLoveEmoji, setIsOpenCurrentLoveEmoji] =
    React.useState(false);
  const [isOpenCurrentDislikeWhyEmoji, setIsOpenCurrentDislikeWhyEmoji] =
    React.useState(false);
  const [isOpenCurrentLoveWhyEmoji, setIsOpenCurrentLoveWhyEmoji] =
    React.useState(false);

  const _handleUploadImage = (event, type) => {
    const config = {
      bucketName: "moodflik-portal",
      dirName: "img" /* optional */,
      region: "us-east-2",
      accessKeyId: "AKIAWFNJSIDVAQA2KNEU",
      secretAccessKey: "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",
    };
    const file = event.target.files[0];
    if (file.type.includes("video")) {
      setFileType("video");
    } else if (file.type.includes("image")) {
      setFileType("photo");
    } else {
      setFileType("file");
    }
    uploadFile(file, config)
      .then((data) => {
        if (type == "dislike") {
          setUploadImagePathDislike(data.location.replace(/ /g, "%20"));
        } else {
          setUploadImagePath(data.location.replace(/ /g, "%20"));
        }
      })
      .catch((err) => console.error(err));
  };

  const handleSubmitPost = (type) => {
    setIsDisableBtn(true);
    var data = {
      why_content: currentLoveWhy || currentDislikeWhy,
      post_type: type || postType,
      content_type: fileType ? fileType : "test",
      content: currentLove || currentDislike,
      media_url: uploadImagePath || uploadImagePathDislike,
    };
    homeServices.createMyPostLike(data, postId).then(
      (data) => {
        toast.success(postId ? "Post Updated" : "Post Added", {
          position: toast.POSITION.TOP_RIGHT,
        });
        if (postId) {
          props.history.push("/create-post");
        }
        setIsDisableBtn(false);
        setCurrentLove("");
        setCurrentLoveWhy("");
        setUploadImagePath("");
        setUploadImagePathDislike("");
        setFileType("");
        setCurrentDislike("");
        setCurrentDislikeWhy("");
        setPostId("");
        setPostType("");
      },
      (error) => {
        toast.error(error.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsDisableBtn(false);
        console.log("error.response.status", error);
      }
    );
  };

  const handleClickCloseUpload = (e) => {
    setUploadImagePath("");
    setFileType("");
    setUploadImagePathDislike("");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (props.match && props.match.params && props.match.params.id) {
      setPostId(props.match.params.id);
      getPostDetailUpdate(props.match.params.id);
    }
    setIsLoading(true);
    getUserProfileDetail();
    getMyFavLikePost();
    getMyFavDisLikePost();
  }, []);

  const getUserProfileDetail = () => {
    setIsLoading(true);
    userProfileServices.getUserProfileDetail().then(
      (data) => {
        setProfileDetail(data);
        setIsLoading(false);
      },
      (error) => {
        setIsLoading(false);
        console.log("error.response.status", error);
      }
    );
  };

  const getPostDetailUpdate = (id) => {
    setIsLoading(true);
    userProfileServices.getPostDetailUpdate(id).then(
      (data) => {
        if (data.post_type == "like") {
          setCurrentLove(data.content);
          setCurrentLoveWhy(data.why_content);
          setFileType(data.content_type);
          setUploadImagePath(data.media_url);
        } else {
          setCurrentDislike(data.content);
          setCurrentDislikeWhy(data.why_content);
          setFileType(data.content_type);
          setUploadImagePathDislike(data.media_url);
        }
        setPostType(data.post_type);
        setIsLoading(false);
      },
      (error) => {
        setIsLoading(false);
        console.log("error.response.status", error);
      }
    );
  };

  const getMyFavLikePost = () => {
    setIsLoading(true);
    userProfileServices.getMyFavLikePost().then(
      (data) => {
        setFavPostLike(data);
        setIsLoading(false);
      },
      (error) => {
        setIsLoading(false);
        console.log("error.response.status", error);
      }
    );
  };
  const getMyFavDisLikePost = () => {
    setIsLoading(true);
    userProfileServices.getMyFavDisLikePost().then(
      (data) => {
        setFavPostLikeDislike(data);
        setIsLoading(false);
      },
      (error) => {
        setIsLoading(false);
        console.log("error.response.status", error);
      }
    );
  };

  const handleGifUrl = (gif, url, type) => {
    if (type == "dislike") {
      setUploadImagePathDislike(url);
    } else {
      setUploadImagePath(url);
    }
    setFileType("gif");
    setIsShowGifClick(false);
  };
  const handleChangeGIFInput = (e) => {
    setIsShowGIFDefaultutValue(e.target.value);
    return <Giphy searchText={e.target.value} />;
  };

  const youtube_parser = (url) => {
    var regExp =
      /^https?\:\/\/(?:www\.youtube(?:\-nocookie)?\.com\/|m\.youtube\.com\/|youtube\.com\/)?(?:ytscreeningroom\?vi?=|youtu\.be\/|vi?\/|user\/.+\/u\/\w{1,2}\/|embed\/|watch\?(?:.\&)?vi?=|\&vi?=|\?(?:.\&)?vi?=)([^#\&\?\n\/<>"']*)/i;
    var match = url.match(regExp);
    return match && match[1].length == 11 ? true : false;
  };

  const handleLovingText = (e) => {
    setCurrentLove(e.target.value);
    if (youtube_parser(e.target.value)) {
      setUploadImagePath(e.target.value);
      setFileType("thumbnail");
    }
  };

  const handleOpenGIFShowModal = (type) => {
    setIsTypeLikeDislike(type);
    setIsShowGifClick(true);
  };
  
  return (
    <div className="login-page">
      <HeaderHome />

      <div className="main-content" style={{ marginTop: 10 }}>
        <div style={{ position: "relative" }}>
          <div>
            <Image
              src={
                profileDetail.cover_photo_url
                  ? profileDetail.cover_photo_url
                  : "https://i.pinimg.com/originals/30/5c/5a/305c5a457807ba421ed67495c93198d3.jpg"
              }
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
                    <Image
                      src={
                        profileDetail.photo_url
                          ? profileDetail.photo_url
                          : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                      }
                    />
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
                onClick={() => props.history.push("/public-reactions")}
              >
                Public Reactions
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
                Followers (0)
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
                Following (0)
              </Button>
            </Grid.Column>
          </Grid>
        </div>
        <div style={{ marginTop: 30 }}>
          <Grid>
            <Grid.Column
              mobile={16}
              tablet={8}
              computer={8}
              className="border-right-colm"
            >
              <div
                style={{
                  background: "#108a07",
                  width: "100%",
                  borderRadius: 4,
                  padding: 10,
                }}
              >
                <div
                  style={{
                    width: "auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p style={{ color: "#fff", margin: 0, marginLeft: 20 }}>
                    What’s got you smiling today?{" "}
                  </p>

                  <Image
                    src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fs3.amazonaws.com%2Fappforest_uf%2Ff1601833595390x320408036269073540%2Fsmile.png?w=48&h=48&auto=compress&fit=crop&dpr=1"
                    width="30"
                    height="30"
                    style={{ marginLeft: 12 }}
                  />
                </div>
              </div>
              <div
                className="create-post parent-post-create"
                style={{ background: "#6C0AC7", marginBottom: 0 }}
              >
                <p style={{ color: "#fff", textAlign: "center", fontSize: 14 }}>
                  I'm Currently Loving:
                </p>
                <Form.TextArea
                  name="user name"
                  className="textarea-create-post"
                  placeholder="Write your post..."
                  value={currentLove}
                  onChange={handleLovingText}
                  maxLength={130}
                />
                {isOpenCurrentLoveEmoji && (
                  <Picker onEmojiClick={(event, emojiObject) => setCurrentLove(currentLove + emojiObject.emoji)} />
                )}
                <div className="limit-create-post">
                  <p className="limit-text-create-post">
                    <Icon
                      name="smile outline"
                      fontSize={"large"}
                      onClick={() => setIsOpenCurrentLoveEmoji(!isOpenCurrentLoveEmoji)}
                    />{" "}
                    ({130 - currentLove.length})
                  </p>
                </div>
                {uploadImagePath &&
                (fileType === "photo" || fileType === "gif") ? (
                  <>
                    <Icon
                      name="window close outline"
                      size="large"
                      className="close-icon-createpost"
                      onClick={() => handleClickCloseUpload()}
                    />
                    <Image src={uploadImagePath} />
                  </>
                ) : (
                  uploadImagePath &&
                  fileType === "video" && (
                    <>
                      <Icon
                        name="window close outline"
                        size="large"
                        className="close-icon-createpost"
                        onClick={() => handleClickCloseUpload()}
                      />
                      <video
                        style={{ width: "100%", maxHeight: "300px" }}
                        controls
                      >
                        <source src={uploadImagePath} type="video/mp4" />
                      </video>
                    </>
                  )
                )}
                {uploadImagePath && fileType === "file" && (
                  <div style={{ color: "#fff" }}>
                    <span style={{ fontWeight: 600 }}>Document</span>
                    <Icon
                      name="window close outline"
                      size="large"
                      onClick={() => handleClickCloseUpload()}
                      style={{ marginLeft: 30 }}
                    />
                  </div>
                )}
                {uploadImagePath && fileType === "thumbnail" && (
                  <VideoThumbnail
                    videoUrl={uploadImagePath}
                    thumbnailHandler={(thumbnail) => console.log(thumbnail)}
                    width={120}
                    height={80}
                  />
                )}
              </div>
              <div className="icon-upload">
                <Image
                  src="https://cdn.iconscout.com/icon/free/png-256/gif-1779609-1512521.png"
                  width="30"
                  height="30"
                  style={{ display: "inline-block", marginTop: 7 }}
                  // onClick={() => setIsShowGifClick(true)}
                  onClick={() => handleOpenGIFShowModal("like")}
                />
                <div class="image-upload-post">
                  <Form enctype="multipart/form-data" id="user-form">
                    <React.Fragment>
                      <label
                        onClick={() => {
                          hiddenFileInput.current.click();
                        }}
                      >
                        <Image
                          src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-camera-512.png"
                          width="30"
                          height="30"
                          style={{ display: "inline-block" }}
                        />
                        <Image
                          src="https://cdn2.iconfinder.com/data/icons/math-numbers-1/24/forward-slash-512.png"
                          width="22"
                          height="22"
                          style={{ display: "inline-block", margin: 0 }}
                        />
                        <Image
                          src="https://static.thenounproject.com/png/2507-200.png"
                          width="30"
                          height="30"
                          style={{ display: "inline-block", margin: 0 }}
                        />
                        <Image
                          src="https://cdn3.iconfinder.com/data/icons/business-basic-1/24/Attach-512.png"
                          width="30"
                          height="30"
                          style={{
                            display: "inline-block",
                            transform: "rotate(45deg)",
                            margin: 0,
                            marginLeft: 10,
                          }}
                        />
                      </label>
                      <input
                        type="file"
                        ref={hiddenFileInput}
                        onChange={(e) => _handleUploadImage(e, "like")}
                        id="file-input-like"
                        style={{ visibility: "hidden" }}
                      />
                    </React.Fragment>
                  </Form>
                </div>
              </div>

              <p
                style={{
                  textAlign: "center",
                  fontSize: 14,
                  clear: "both",
                  fontStyle: "italic",
                  fontWeight: 600,
                }}
              >
                Why? (Optional)
              </p>

              <div
                className="create-post"
                style={{ background: "#6C0AC7", paddingTop: 15, overflowX: "auto" }}
              >
                <Form.TextArea
                  name="user name"
                  className="textarea-create-post"
                  placeholder="Write your post..."
                  value={currentLoveWhy}
                  onChange={(e) => setCurrentLoveWhy(e.target.value)}
                  maxLength={150}
                />

                {isOpenCurrentLoveWhyEmoji && (
                  <Picker  onEmojiClick={(event, emojiObject) => setCurrentLoveWhy(currentLoveWhy + emojiObject.emoji)} />
                )}
                <div className="limit-create-post">
                  <p className="limit-text-create-post">
                    <Icon
                      name="smile outline"
                      fontSize={"large"}
                      onClick={() => setIsOpenCurrentLoveWhyEmoji(!isOpenCurrentLoveWhyEmoji)}
                    />{" "}
                    ({150 - currentLoveWhy.length})
                  </p>
                </div>
              </div>
              <div className="create-post-btn">
                <Button
                  className="post-create-btn"
                  onClick={() => handleSubmitPost("like")}
                  disabled={isDisableBtn}
                >
                  Post
                </Button>
              </div>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <div
                style={{
                  background: "#BF1414",
                  width: "100%",
                  borderRadius: 4,
                  padding: 10,
                }}
              >
                <div
                  style={{
                    width: "auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p style={{ color: "#fff", margin: 0, marginLeft: 20 }}>
                    What’s been getting on your nerves today?{" "}
                  </p>

                  <Image
                    src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fs3.amazonaws.com%2Fappforest_uf%2Ff1601829567583x260148826231129120%2Fagr.png?w=48&h=48&auto=compress&fit=crop&dpr=1"
                    width="30"
                    height="30"
                    style={{ marginLeft: 12 }}
                  />
                </div>
              </div>
              <div
                className="create-post parent-post-create"
                style={{ background: "#6C0AC7", marginBottom: 0 }}
              >
                <p style={{ color: "#fff", textAlign: "center", fontSize: 14 }}>
                  I Currently Dislike:
                </p>
                <Form.TextArea
                  name="user name"
                  className="textarea-create-post"
                  placeholder="Write your post..."
                  value={currentDislike}
                  onChange={(e) => setCurrentDislike(e.target.value)}
                  maxLength={130}
                />
                {isOpenCurrentDislikeEmoji && (
                  <Picker  onEmojiClick={(event, emojiObject) => setCurrentDislike(currentDislike + emojiObject.emoji)} />
                )}
                <div className="limit-create-post">
                  <p className="limit-text-create-post">
                    <Icon
                      name="smile outline"
                      fontSize={"large"}
                      onClick={() => setIsOpenCurrentDislikeEmoji(!isOpenCurrentDislikeEmoji)}
                    />{" "}
                    ({130 - currentDislike.length})
                  </p>
                </div>
                {uploadImagePathDislike &&
                (fileType === "photo" || fileType === "gif") ? (
                  <>
                    <Icon
                      name="window close outline"
                      size="large"
                      className="close-icon-createpost"
                      onClick={() => handleClickCloseUpload()}
                    />
                    <Image src={uploadImagePathDislike} />
                  </>
                ) : (
                  uploadImagePathDislike &&
                  fileType === "video" && (
                    <>
                      <Icon
                        name="window close outline"
                        size="large"
                        className="close-icon-createpost"
                        onClick={() => handleClickCloseUpload()}
                      />
                      <video
                        style={{ width: "100%", maxHeight: "300px" }}
                        controls
                      >
                        <source src={uploadImagePathDislike} type="video/mp4" />
                      </video>
                    </>
                  )
                )}
                {uploadImagePathDislike && fileType === "file" && (
                  <div style={{ color: "#fff" }}>
                    <span style={{ fontWeight: 600 }}>Document</span>
                    <Icon
                      name="window close outline"
                      size="large"
                      onClick={() => handleClickCloseUpload()}
                      style={{ marginLeft: 30 }}
                    />
                  </div>
                )}
                {uploadImagePathDislike && fileType === "thumbnail" && (
                  <VideoThumbnail
                    videoUrl={uploadImagePathDislike}
                    thumbnailHandler={(thumbnail) => console.log(thumbnail)}
                    width={120}
                    height={80}
                    cors={false}
                    renderThumbnail={true}
                  />
                )}
              </div>
              <div className="icon-upload">
                <Image
                  src="https://cdn.iconscout.com/icon/free/png-256/gif-1779609-1512521.png"
                  width="30"
                  height="30"
                  style={{ display: "inline-block", marginTop: 7 }}
                  // onClick={() => setIsShowGifClick(true)}
                  onClick={() => handleOpenGIFShowModal("dislike")}
                />
                <div class="image-upload-post">
                  <Form enctype="multipart/form-data" id="user-form">
                    <React.Fragment>
                      <label
                        onClick={() => {
                          hiddenFileInputDislike.current.click();
                        }}
                      >
                        <Image
                          src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-camera-512.png"
                          width="30"
                          height="30"
                          style={{ display: "inline-block" }}
                        />
                        <Image
                          src="https://cdn2.iconfinder.com/data/icons/math-numbers-1/24/forward-slash-512.png"
                          width="22"
                          height="22"
                          style={{ display: "inline-block", margin: 0 }}
                        />
                        <Image
                          src="https://static.thenounproject.com/png/2507-200.png"
                          width="30"
                          height="30"
                          style={{ display: "inline-block", margin: 0 }}
                        />
                        <Image
                          src="https://cdn3.iconfinder.com/data/icons/business-basic-1/24/Attach-512.png"
                          width="30"
                          height="30"
                          style={{
                            display: "inline-block",
                            transform: "rotate(45deg)",
                            margin: 0,
                            marginLeft: 10,
                          }}
                        />
                      </label>
                      <input
                        type="file"
                        ref={hiddenFileInputDislike}
                        onChange={(e) => _handleUploadImage(e, "dislike")}
                        id="file-input-dislike"
                        style={{ visibility: "hidden" }}
                      />
                    </React.Fragment>
                  </Form>
                </div>
              </div>

              <p
                style={{
                  textAlign: "center",
                  fontSize: 14,
                  clear: "both",
                  fontStyle: "italic",
                  fontWeight: 600,
                }}
              >
                Why? (Optional)
              </p>

              <div
                className="create-post"
                style={{ background: "#6C0AC7", paddingTop: 15, overflowX: "auto" }}
              >
                <Form.TextArea
                  name="user name"
                  className="textarea-create-post"
                  placeholder="Write your post..."
                  value={currentDislikeWhy}
                  onChange={(e) => setCurrentDislikeWhy(e.target.value)}
                  maxLength={150}
                />
                {isOpenCurrentDislikeWhyEmoji && (
                  <Picker  onEmojiClick={(event, emojiObject) => setCurrentDislikeWhy(currentDislikeWhy + emojiObject.emoji)} />
                )}
                <div className="limit-create-post">
                  <p className="limit-text-create-post">
                    <Icon
                      name="smile outline"
                      fontSize={"large"}
                      onClick={() => setIsOpenCurrentDislikeWhyEmoji(!isOpenCurrentDislikeWhyEmoji)}
                    />{" "}
                    ({150 - currentDislikeWhy.length})
                  </p>
                </div>
              </div>
              <div className="create-post-btn">
                <Button
                  className="post-create-btn"
                  onClick={() => handleSubmitPost("dislike")}
                  disabled={isDisableBtn}
                >
                  Post
                </Button>
              </div>
            </Grid.Column>
          </Grid>
        </div>
      </div>
      <>
        <Modal
          open={isShowGifClick}
          onClose={() => setIsShowGifClick(false)}
          size="large"
          className="modal-gif-custom"
        >
          <Modal.Content className="content-center">
            <div>
              <Form.Input
                fluid
                placeholder="Search GIF"
                onChange={handleChangeGIFInput}
              />
            </div>
            <Giphy
              searchText={isShowGIFDefaultutValue}
              handleGifUrl={handleGifUrl}
              isTypeLikeDislike={isTypeLikeDislike}
            />
            <div className="btn-div-popup" style={{ marginTop: 30 }}>
              <div>
                <Button type="submit" onClick={() => setIsShowGifClick(false)}>
                  Close
                </Button>
              </div>
            </div>
          </Modal.Content>
        </Modal>
      </>
      <Footer />
    </div>
  );
}
