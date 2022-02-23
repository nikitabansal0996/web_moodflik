import axios from "axios";
import "../components/Sys/config";

var apiUrl = global.platformURI;

export class HomeServices {
  constructor() {
    axios.interceptors.request.use(
      function (config) {
        let token = localStorage.getItem("ssoToken");
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => {
        console.log("error.response.status", error);
        return error;
      }
    );
  }
  getAllCreatePost() {
    return axios.get(apiUrl + "api/post/?type=like").then((res) => res.data);
  }
  getAllCreatePostDislike() {
    return axios.get(apiUrl + `api/post/?type=dislike`).then((res) => res.data);
  }
  addCommentLikePost(payload) {
    return axios.post(apiUrl + `api/comment/`, payload).then((res) => res.data);
  }
  getCommentParticularPost(id) {
    return axios.get(apiUrl + `api/get_post_comments/${id}`).then((res) => res.data);
  }
  getLikeOrDislikeParticularPost(payload) {
    return axios.post(apiUrl + `api/reactions/`, payload).then((res) => res.data);
  }
  addFavouratePost(url, payload) {
    return axios.post(apiUrl + url, payload).then((res) => res.data);
  }
  deleteMyPost(url, payload) {
    return axios.delete(apiUrl + url).then((res) => res.data);
  }
  createMyPostLike(payload, id) {
    if (id) {
      return axios.patch(apiUrl + `api/post_update/${id}`, payload).then((res) => res.data);
    } else {
      return axios.post(apiUrl + "api/post/", payload).then((res) => res.data);
    }
  }
  handleClickPostSee(id) {
    var payload = {
      post: id
    }
    return axios.post(apiUrl + `api/seen/`, payload).then((res) => res.data);
  }
  handleClickFollowingUser(id) {
    var payload = {
      following: id
    }
    return axios.post(apiUrl + `api/follow/`, payload).then((res) => res.data);
  }
}
