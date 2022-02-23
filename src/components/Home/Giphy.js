import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
// import "../../Login/Login.scss";
import {
    Button,
    Form,
    Header,
    Segment,
    Menu,
    Image,
    Input,
} from "semantic-ui-react";
import "../../App.scss";
import Footer from "../FooterLinks/Footer";
import "../FooterLinks/AboutUs/about-us.scss";
import "./home.scss";

import { GiphyFetch } from "@giphy/js-fetch-api";
import { HomeServices } from "../../Services/HomeServices";
import { toast } from "react-toastify";
import {
    Carousel,
    Gif,
    Grid,
    Video,
    VideoOverlay
} from "@giphy/react-components";
const giphy = new GiphyFetch("Iz1NrVrGOnx5hCHvIZ4hPYZ8ecNlibb6");

export default function Giphy({ searchText, handleGifUrl, isTypeLikeDislike }) {
    const [width, setWidth] = useState(window.innerWidth);
    const [modalGif, setModalGif] = useState();

    var tempfetchGifs = (offset) => giphy.trending({ offset, limit: 10 });

    const fetchGifs = (offset) => giphy.search(searchText, { offset, limit: 10 });

    const onGifClick = (gif, e) => {
        e.preventDefault();
        // setModalGif(gif);
        var mediUrl = gif.images && gif.images.original && gif.images.original.url ? gif.images.original.url : '';
        handleGifUrl(gif,mediUrl, isTypeLikeDislike);
    }

    // return <Carousel key={searchText} fetchGifs={searchText == "" ? tempfetchGifs : fetchGifs} gifHeight={200} gutter={6} />;

    return (
        <>
            {modalGif &&
                <Gif gif={modalGif} width={200} />
            }
            <Grid
                key={searchText}
                onGifClick={onGifClick}
                fetchGifs={searchText == "" ? tempfetchGifs : fetchGifs}
                width={width}
                columns={3}
                gutter={6}
            />
        </>
    );

}