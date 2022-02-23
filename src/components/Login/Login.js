import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import "./Login.scss";
import {
  Button,
  Grid,
  Form,
  Header,
  Segment,
  Menu,
  Image,
} from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { Paths } from "../routes/routePaths";
import { Icon } from "semantic-ui-react";
import "../../App.scss";
import { authServices } from "../../Services/Auth";
import Footer from "../FooterLinks/Footer";
import PublickDislike from "../FooterLinks/PublickDislike";
import PublicLike from "../FooterLinks/PublicLike";
import SignUp from "./SignUp";
import { toast } from "react-toastify";
import TrandingLikePost from "./TrandingLikePost";
import TrandingDislikePost from "./TrandingDislikePost";

function Login(props) {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [disLikePostList, setDisLikePostList] = useState([]);
  const [likePostList, setLikePostList] = useState(false);

  useEffect(() => {
    getTredingPostOnLoginPageDisLike();
    getTredingPostOnLoginPageLike();
  }, []);

  const getTredingPostOnLoginPageLike = () => {
    authServices.getTredingPostOnLoginPageLike().then(
      (data) => {
        setLikePostList(data.results.slice(0,5));
      },
      (error) => {
        console.log("error.response.status", error);
      }
    );
  };

  const getTredingPostOnLoginPageDisLike = () => {
    authServices.getTredingPostOnLoginPageDisLike().then(
      (data) => {
        setDisLikePostList(data.results.slice(0,5));
      },
      (error) => {
        console.log("error.response.status", error);
      }
    );
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      var user = {
        email: email,
        password: password,
      };
      setDisableSubmit(true);
      authServices.userLogin(user).then(
        (data) => {
          setDisableSubmit(false);
          toast.success(data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          
          localStorage.setItem("email", email);
          localStorage.setItem("ssoToken", data.data.accessToken);
          localStorage.setItem("isLogin", true);
          localStorage.setItem("fullName", `${data.data.first_name} ${data.data.last_name}`);
          localStorage.setItem("uid", data.data.uuid);
          localStorage.setItem("userName", data.data.user)
          localStorage.setItem("fullName", `${data.data.first_name} ${data.data.last_name}`)


          props.history.push("/public-reactions");

        },
        (error) => {
          setDisableSubmit(false);
          toast.error("Email or Password is wrong", {
            position: toast.POSITION.TOP_RIGHT,
          });
          console.log("error.response.status", error);
        }
      );
    } else {
      setSubmitted(true);
    }
  };

  const handleClickSeeMore = () => {
    toast.warning("To View More Post Please Join", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }

  return (
    <div className="login-page">
      <div className="header-login">
        <Grid>
          <Grid.Column mobile={16} tablet={8} computer={8}>
            <div style={{ marginLeft: 30 }}>
              <Image
                src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fs3.amazonaws.com%2Fappforest_uf%2Ff1601659221875x962391620398017200%2Flogo-02.png?w=256&h=108&auto=compress&fit=crop&dpr=1"
                width="210"
                height="80"
                style={{ marginTop: 12 }}
              />
            </div>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={8}>
            <div className="form-login">
              <Form>
                <Form.Group widths="equal">
                  <Form.Input
                    fluid
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={submitted && !email ? true : false}
                  />
                  <Form.Input
                    fluid
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={submitted && !password ? true : false}
                  />
                  <Button
                    className="form-login-btn"
                    onClick={handleLogin}
                    disabled={disableSubmit}
                  >
                    Log In
                  </Button>
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Checkbox label="Remember me" className="remember-me" />
                  <div className="forgot-password-parent">
                    <Link
                      to="/forgot-password"
                      className="forgot-password-link"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </Form.Group>
              </Form>
            </div>
          </Grid.Column>
        </Grid>
      </div>
      <div className="login-body">
        <div>
          <Grid>
            <Grid.Row>
              <Grid.Column width={16}>
                <Header as="h3" className="welcome-to-moodflik">
                  Welcome to Moodflik, Where you can:
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid>
            <Grid.Column mobile={6} tablet={6} computer={2}>
              <div
                className="text_center"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon name="heart" className="color_primary" size={"big"} />
                <div className="vertical-line"></div>
                <Icon
                  name="thumbs down"
                  className="color_primary"
                  size={"big"}
                />
              </div>
            </Grid.Column>
            <Grid.Column mobile={10} tablet={10} computer={14}>
              <p>
                See, Share & Speak about daily events & experiences of things
                you <span style={{ color: "#108A07" }}>love</span> &{" "}
                <span style={{ color: "#BF1414" }}>dislike</span>{" "}
                simultaneously.
              </p>
            </Grid.Column>
          </Grid>
          <Grid>
            <Grid.Row>
              <Grid.Column width={2}>
                <div className="text_center">
                  <Icon
                    name="user plus"
                    className="color_primary"
                    size={"big"}
                  />
                </div>
              </Grid.Column>
              <Grid.Column width={14}>
                <p>
                  Find & Follow your favourite people, places & organisations
                  with similar interests & dislikes.
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid>
            <Grid.Row>
              <Grid.Column width={2}>
                <div className="text_center">
                  <div className="parent-comment-hash" style={{ margin: 0 }}>
                    <span
                      className="comment-hash color_primary"
                      style={{ top: 3 }}
                    >
                      #
                    </span>
                    <Icon
                      name="comment outline"
                      className="color_primary"
                      size={"big"}
                    />
                  </div>
                </div>
              </Grid.Column>
              <Grid.Column width={14}>
                <p>
                  Join live hot trending topics of events happening locally &
                  globally with diverse reactions.
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
        <div style={{ marginTop: 30 }}>
          <Grid>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <div>
                <Button
                  className="primary-btn-login"
                  style={{ marginTop: 30, marginBottom: 30 }}
                >
                  Trending Reactions
                  <div className="parent-comment-hash">
                    <span className="comment-hash">#</span>
                    <Icon
                      name="comment outline"
                      className="color_primary-comment"
                      size={"big"}
                    />
                  </div>
                </Button>
                <div className="treanding-post-custom">

                
                <Grid>
                  <Grid.Column
                    style={{ borderRight: "1px solid" }}
                    mobile={16}
                    tablet={8}
                    computer={8}
                  >
                    <Button className="green-btn-login">
                      Public Likes(35){" "}
                      <Icon
                        name="heart"
                        size={"large"}
                        style={{ color: "#fff", marginLeft: 10, opacity: 1 }}
                      />
                    </Button>
                    {likePostList.length > 0 &&
                      likePostList.map((post) => {
                        return (
                          <>
                            <TrandingLikePost
                              content={post.content}
                              why_content={post.why_content}
                              media_url={post.media_url}
                              content_type={post.content_type}
                            />
                          </>
                        );
                      })}
                      <Button className="custom-btn-as-link" onClick={handleClickSeeMore}>
                        See More
                      </Button>
                  </Grid.Column>
                  <Grid.Column mobile={16} tablet={8} computer={8}>
                    <Button className="red-btn-login">
                      Public Dislikes(5){" "}
                      <Icon
                        name="thumbs down"
                        size={"large"}
                        style={{ color: "#fff", marginLeft: 10, opacity: 1 }}
                      />
                    </Button>
                    {disLikePostList.length > 0 &&
                      disLikePostList.map((item) => {
                        return (
                          <>
                            <TrandingDislikePost
                              content={item.content}
                              why_content={item.why_content}
                              media_url={item.media_url}
                              content_type={item.content_type}
                            />
                          </>
                        );
                      })}
                      <Button className="custom-btn-as-link" onClick={handleClickSeeMore}>
                        See More
                      </Button>
                  </Grid.Column>
                </Grid>
                </div>
              </div>
            </Grid.Column>
            <Grid.Column
              style={{ borderLeft: "1px solid" }}
              mobile={16}
              tablet={8}
              computer={8}
            >
              <SignUp />
            </Grid.Column>
          </Grid>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default withRouter(Login);
