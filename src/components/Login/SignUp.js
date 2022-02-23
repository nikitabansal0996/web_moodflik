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
import { toast } from "react-toastify";

function SignUp(props) {
  const [submitted, setSubmitted] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [isError, setIsError] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    password: "",
    gender: "",
	terms_confirmed: false
  });
  const options = [
    { key: "m", text: "Male", value: "M" },
    { key: "f", text: "Female", value: "F" },
    { key: "o", text: "Prefer not to say", value: "NA" },
  ];


  const handleInputChange = (event) => {
      setIsError(false)
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // user register funation
  const doUserSignUp = (e) => {
    e.preventDefault();
    var isValidate = false;
    const userObj = Object.values(formData).map((res, v) => {
      if (Object.values(formData)[v] === "") {
        setSubmitted(true);
        isValidate = true;
        return false;
      }
    });
    var user = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      date_of_birth: formData.dob,
      email: formData.email,
      password: formData.password,
      gender: formData.gender,
	    terms_confirmed: formData.terms_confirmed,
      username: formData.email
    };
    
    if (!isValidate && formData.terms_confirmed) {
      setDisableSubmit(true);
      authServices.userSignUp(user).then(
        (data) => {
          toast.success("Registerd Successfully! Now Please Login ", {
            position: toast.POSITION.TOP_RIGHT,
          });
          debugger
          handleLoginUserDireact()
          // setFormData({
          //   firstName: "",
          //   lastName: "",
          //   dob: "",
          //   email: "",
          //   password: "",
          //   gender: "",
          //   terms_confirmed: false
          // });
          // setDisableSubmit(false);
            
        },
        (error) => {
            debugger
            if(error.date_of_birth){
                toast.error(`Date: ${error.date_of_birth[0]}`, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }else if(error.email){
                toast.error(error.email[0], {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }else if(error.password){
                toast.error(error.password[0], {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }else{
              toast.error(error.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            }
        
          setDisableSubmit(false);
        }
      );
    }else{
        setIsError("All fields are required")
    }
  };

  const handleLoginUserDireact = () => {
    var user = { 
      email: formData.email,
      password: formData.password
    };
    authServices.userLogin(user).then(
      (data) => {
        setDisableSubmit(false);
        debugger
          localStorage.setItem("email", formData.email);
          localStorage.setItem("fullName", `${data.data.first_name} ${data.data.last_name}`);
          localStorage.setItem("ssoToken", data.data.accessToken);
          localStorage.setItem("isLogin", true);
          localStorage.setItem("uid", data.data.uuid)
          localStorage.setItem("fullName", `${data.data.first_name} ${data.data.last_name}`)
          props.history.push("/profile-setting");
          window.location.reload();

      },
      (error) => {
        setDisableSubmit(false);
          toast.error("Email or Password is wrong", {
          position: toast.POSITION.TOP_RIGHT,
          });
        console.log("error.response.status", error);
      }
    );
  }

  const handleClickTearms = (e) => {
    setFormData({
        ...formData,
        terms_confirmed: !formData.terms_confirmed
    })
    setIsError(false)
  }
  return (
      <div>
        <div className="right-sign-up-section">
                <Header as="h4" textAlign="center">
                  No account? No problem. Jump on board in seconds.
                </Header>
                <Button className="primary-btn-login">Signup</Button>
                <div className="sign-up-form">
                  <Form>
                    <Form.Group widths="equal">
					<Form.Input
						fluid
						label="First Name"
						maxLength={30}
						placeholder="First Name"
						value={formData.firstName}
						name="firstName"
						error={
						submitted && !formData.firstName
							? true
							: false
						}
						onChange={handleInputChange}
					/>
					<Form.Input
						fluid
						label="Last Name"
						maxLength={30}
						placeholder="Last Name"
						name="lastName"
						value={formData.lastName}
						error={
						submitted && !formData.lastName
							? true
							: false
						}
						onChange={handleInputChange}
					/>
                    </Form.Group>
                    <Form.Group widths="equal">
                      <Form.Input
                        fluid
                        placeholder="Email Address"
                        value={formData.email}
						name="email"
						onChange={handleInputChange}
                        error={submitted && !formData.email ? true : false}
                      />
                      <Form.Input
                        fluid
                        type="password"
						name="password"
                        minLength={8}
                        placeholder="Password"
                        value={formData.password}
						onChange={handleInputChange}
                        error={submitted && !formData.password ? true : false}
                      />
                    </Form.Group>
                    <Form.Group widths="equal">
						<Form.Input
						type="date"
						name="dob"
						error={
							submitted && !formData.dob
							? true
							: false
						}
						placeholder="Select the date"
						value={formData.dob}
						onChange={handleInputChange}
						/>
                      <Form.Select
                        fluid
                        options={options}
                        placeholder="Gender"
						name="gender"
						error={
							submitted && !formData.gender
							? true
							: false
						}
						onChange={(e, {value}) => setFormData({
							...formData,
							gender: value
						})}
                      />
                    </Form.Group>
                    <div style={{ marginBottom: 25 }}>
                      <span>
                        <span style={{ fontSize: 10 }}>
                          By ticking the box, you are agreeing with our{" "}
                        </span>
                        <span className="link-span">Terms and conditions</span>
                        <br />
                        <span className="link-span">Policy and Data Use</span>
                        <span className="link-span">Community guidelines</span>
                        <span className="link-span">Cookie use</span>
                      </span>
                    </div>

                    <Form.Checkbox label="Agree & Create Account" checked ={formData.terms_confirmed} onChange={handleClickTearms} />
                    <div style={{color: "#ff4040"}}>{isError ? isError : null }</div>
                    <Button
                    //   onClick={() => props.history.push("/profile")}
                      className="primary-btn-login"
					  onClick={doUserSignUp}
                      disabled={disableSubmit}
                    >
                      Confirm & Sign up
                    </Button>
                  </Form>
                </div>
              </div>

      </div>

  );
}
export default withRouter(SignUp);
