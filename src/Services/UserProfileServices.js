import axios from "axios";
import "../components/Sys/config";

var apiUrl = global.platformURI;

export class UserProfileServices {
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
  getUserProfileDetail(userId) {
      var id = localStorage.getItem("uid")
    return axios.get(apiUrl + `user/${userId ? userId : id}`).then((res) => res.data);
  }
  getMyFavLikePost(id) {
    return axios.get(apiUrl + `api/favourites/?type=like${id ? `&user_id=${id}`: ""}`).then((res) => res.data);
  }
  getMyFavDisLikePost(id) {
    return axios.get(apiUrl + `api/favourites/?type=dislike${id ? `&user_id=${id}`: ""}`).then((res) => res.data);
  }
  handleClickFollowBack(id) {
      var payload ={
        following: id
      }
    return axios.post(apiUrl + `api/follow/`, payload).then((res) => res.data);
  }
  getMyLikePost(url) {
    return axios.get(apiUrl + url).then((res) => res.data);
  }
  getMyDislike(url) {
    return axios.get(apiUrl + url).then((res) => res.data);
  }
  getUserFollowersOrFollowing(id) {
    return axios.get(apiUrl + `api/follow/${id ? `?user_id=${id}` :""}`).then((res) => res.data);
  }
  handleClickUnFollow(id) {
    return axios.delete(apiUrl + `api/remove_follow/${id}`).then((res) => res.data);
  }
  userProfileUpdate(payload) {
      var id= localStorage.getItem("uid")
    return axios.patch(apiUrl + `user/${id}/`, payload).then((res) => res.data);
  }
  getPrivacySettingProfile(id) {
    return axios.get(apiUrl + `privacy_setting/`).then((res) => res.data);
  }
  userPrivacySetting(payload) {
    return axios.post(apiUrl + `privacy_setting/`, payload).then((res) => res.data);
  }
  getNotificationSetting() {
    return axios.get(apiUrl + "post_notifications/").then((res) => res.data);
  }
  updateNotificationSetting(payload) {
    return axios.post(apiUrl + `post_notifications/`, payload).then((res) => res.data);
  }
  getPostDetailUpdate(id) {
    return axios.get(apiUrl + `api/post_by_id/${id}`).then((res) => res.data);
  }
  updateCreateUserQuickBloxOccupantId(payload) {
    var id= localStorage.getItem("uid")
    return axios.patch(apiUrl + `user/${id}/`, payload).then((res) => res.data);
  }
  getFriendListUsers(search) {
    return axios.get(apiUrl + `api/friends/?search=${search}`).then((res) => res.data);
  }
  getFilterAllUserListHeader(search) {
    return axios.get(apiUrl + `usersfilters/?search=${search}`).then((res) => res.data);
  }
}
