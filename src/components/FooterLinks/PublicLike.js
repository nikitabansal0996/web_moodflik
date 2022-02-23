import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import "../Login/Login.scss";
import { Button, Grid, Form, Header, Segment, Menu, Image, Icon } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
// import { Paths } from "../routes/routePaths";
// import { Icon } from "semantic-ui-react";
import "../../App.scss";


function PublicLike({
  content = "",
  why_content = "",
  content_type = "",
  media_url = "",
}) {
  return (
    <>
      <div className="why-parent-div">
        <div className="content">
          <p style={{ color: "#fff" }}>{content}</p>
          {
            content_type == "video" &&
            <div>
              <video style={{ width: '100%', maxHeight: '300px' }} controls>
                <source src={media_url} type="video/mp4" />
              </video>
            </div>
          }
          {
            (content_type == "photo" || content_type == "image" || content_type == "gif") &&
            <div>
              <Image style={{ maxHeight: "300px", width: '100%' }} src={media_url} />
            </div>
          }
          {
            (content_type == "file") &&
            <div >
              <a
                href={media_url}
                download
              >
               <span style={{ fontWeight: 600, marginRight: 10, color: "#fff" }}>Document</span>
              <Icon style={{ color: "#fff" }} name="arrow alternate circle down" size="large" />
              </a>
              
            </div>
          }
          <div className="left-line"></div>
          <div className="why-word">Why?</div>
          <div className="right-line"></div>
          <p style={{ color: "#fff" }}>{why_content}</p>
        </div>
      </div>
    </>


  );
}
export default withRouter(PublicLike)
