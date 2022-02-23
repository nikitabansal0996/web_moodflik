import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import { Button, Grid, Form, Header, Segment, Input, Image } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import "../../../App.scss";
import Footer from "../Footer";
import './about-us.scss'
import LogoHeader from "./LogoHeader";



export default function Profile(props) {
// const [activeItem, setActiveItem] = useState("home")
    const countryOptions =[
        { key: 'm', text: 'India', value: 'India' },
        { key: 'f', text: 'UK', value: 'UK' },
        { key: 'o', text: 'US', value: 'US' },
      ]
      
  return (
    <div className="login-page">
		<LogoHeader />
        <div className="main-content">
            <Header as="h3" textAlign="center">
            Profile Setup:
            </Header>
                <div className="">
                    <div className="profile-form">
                        <Form>
                            <div className="image-profile">
                                <Image src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" width="80" height= "80" />
                            </div>
                            <Form.Group widths='equal'>
                                <Form.Input fluid  className="input-boder-bottom" placeholder='Choose Username' />
                                <Form.Input fluid type="number"  className="input-boder-bottom" placeholder='Mobile Number' />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Select
                                    fluid
                                    options={countryOptions}
                                    placeholder='Country'
                                    className="input-boder-bottom"
                                />
                                <Form.Input fluid className="input-boder-bottom" placeholder='City' />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Input fluid className="input-boder-bottom" placeholder='Website(Optional)' />
                            </Form.Group>
                            <p style={{textAlign: "center"}}>
                            Bio:
                            </p>
                            <div className="profile-bio-input">
                                <Form.Field inline>
                                    <label>Me in 3 words:</label>
                                    <Input className="input-boder-bottom"  />
                                    <label>(30 max)</label>
                                </Form.Field>
                            </div>
                            <div className="profile-bio-input">
                                <Form.Field inline>
                                    <label>Things I Love:</label>
                                    <Input className="input-boder-bottom"  />
                                    <label>(50 max)</label>
                                </Form.Field>
                            </div>
                            <div className="profile-bio-input">
                                <Form.Field inline>
                                    <label>Things I Dislike:</label>
                                    <Input className="input-boder-bottom"  />
                                    <label>(50 max)</label>
                                </Form.Field>
                            </div>
                            <Button className="send-contact-us forgot-pwd-send" style={{borderRadius: 4, marginTop: 25, width: '150px', marginBottom: 20}}>
                            Save
                            </Button>
                        </Form>
                    </div>
                    
                </div>
        </div>
        <Footer />
	</div>
  );
}
