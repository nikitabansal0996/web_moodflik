import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
// import "../../Login/Login.scss";
import {
  Button,
  Grid,
  Form,
  Header,
  Segment,
  Modal,
  Image,
  Input,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import "../../App.scss";
import defaultUserImage from "../../assets/img/user-image.png";
import "./chating.scss";
import Footer from "../FooterLinks/Footer";
import "../FooterLinks/AboutUs/about-us.scss";
import "../Home/home.scss";
import { Link, withRouter } from "react-router-dom";
import MenuBar from "../FooterLinks/AboutUs/MenuBar";
import HeaderHome from "../Home/HeaderHome";
import userImage from "../../assets/img/user-image.png";
import PublicLike from "../FooterLinks/PublicLike";
import PublickDislike from "../FooterLinks/PublickDislike";
import { HomeServices } from "../../Services/HomeServices";
import { toast } from "react-toastify";
import { UserProfileServices } from "../../Services/UserProfileServices";
import Picker from "emoji-picker-react";

const homeServices = new HomeServices();
const userProfileServices = new UserProfileServices();

var QB = require("quickblox/quickblox.min");
var messageListTemp = [];
function UserListChat(props) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [friendListNew, setFriendListNew] = useState([]);
  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [activeDialog, setActiveDialog] = useState({});
  const [userListChat, setUserListChat] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [messageListParticular, setMessageListParticular] = useState([]);
  const [userDetailDialog, setUserDetailDialog] = useState({});
  const [isOpenEmoji, setIsOpenEmoji] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // getUserFollowersOrFollowing();
    QBConnectUser();
    getFriendListUsers();
  }, []);

  const qbLogin = () => {
    var params = {
      login: localStorage.getItem("userName"),
      password: "qb_moodflik_test",
    };
    QB.createSession(params, function (error, result) {
      debugger;
      if (result) {
        console.log("user_iduser_id", result.user_id);
        var userCredentials = {
          userId: result && result.user_id,
          password: "qb_moodflik_test",
        };
        localStorage.setItem("occupantId", result.user_id);
        onCallDialog(userCredentials);
      }
    });
  };

  const onCallDialog = (userCredentials) => {
    QB.chat.dialog.list({ sort_desc: "updated_at" }, function (error, dialogs) {
      let dialogList = dialogs && dialogs.items;
      if (dialogList.length > 0) {
        setUserListChat(dialogList);
      }
      console.log("dialogs", dialogs);
      connect(userCredentials);
    });
  };
  const connect = (userCredentials) => {
    QB.chat.connect(userCredentials, function (error, contactList) {
      console.log("contactList:", contactList);
    });
  };

  QB.chat.onMessageListener = onMessage;

  const QBConnectUser = () => {
    var CREDENTIALS = {
      appId: "91867",
      authKey: "J5H-KYBZTGWarmg",
      authSecret: "wPXG4CXPrMKFOQd",
      accountKey: "G3AHXj94R9sNP5S--fqM",
      apiEndpoint: "",
      chatEndpoint: "",
    };

    QB.init(
      CREDENTIALS.appId,
      CREDENTIALS.authKey,
      CREDENTIALS.authSecret,
      CREDENTIALS.accountKey
    );

    var params = {
      login: localStorage.getItem("userName"),
      password: "qb_moodflik_test",
    };
    QB.createSession(function (error, result) {
      var paramsNew = {
        login: localStorage.getItem("userName"),
        password: "qb_moodflik_test",
        full_name: localStorage.getItem("fullName"),
      };

      QB.users.create(paramsNew, function (error, result) {
        debugger;
        if (error) {
          qbLogin();
        } else {
          debugger;
          handleCreateOccupantId(result.user_id ? result.user_id : result.id);
          qbLogin();
        }
      });
    });
  };

  const handleCreateOccupantId = (userId) => {
    console.log("result.user_id check", userId);
    var data = {
      occupant_id: userId,
    };
    debugger;
    userProfileServices.updateCreateUserQuickBloxOccupantId(data).then(
      (data) => {
        console.log("Occupant id");
      },
      (error) => {
        console.log("error.response.status", error);
      }
    );
  };

  const getFriendListUsers = (searchVal = "") => {
    userProfileServices.getFriendListUsers(searchVal).then(
      (data) => {
        setFriendListNew(data.results);
      },
      (error) => {
        console.log("error.response.status", error);
      }
    );
  };

  const handleCancle = () => {
    setOpenAddUserModal(false);
    setSearchVal("");
  };

  const handleSearchInput = (e) => {
    setSearchVal(e.target.value);
    getFriendListUsers(e.target.value);
  };

  const handleAddNewUserForChat = (occupantId) => {
    var params = {
      type: 3,
      occupants_ids: occupantId,
    };

    QB.chat.dialog.create(params, function (error, dialog) {
      handleJoinDialog(dialog);
      var userCredentials = {
        userId: localStorage.getItem("occupantId"),
        password: "qb_moodflik_test",
      };
      onCallDialog(userCredentials);
      setOpenAddUserModal(false);
    });
  };

  const handleJoinDialog = (dialog) => {
    setActiveDialog(dialog);
    getMessageList(dialog);
  };
  const getMessageList = (dialog) => {
    debugger;
    var dialogId = dialog._id;
    setUserDetailDialog(dialog);
    var params = {
      chat_dialog_id: dialogId,
      sort_desc: "date_sent",
      limit: 100,
      skip: 0,
    };

    QB.chat.message.list(params, function (error, messages) {
      if (messages.items.length > 0) {
        setMessageListParticular(messages.items.reverse());
      }
    });
  };

  function onMessage(userId, message) {
    if (message) {
      // messageListTemp.push(messageListTemp[0].push(message))
      console.log("fuuuuuuuuuuuuu", message);
      messageListParticular.push(message);
      setMessageListParticular([...messageListParticular]);
    }
  }

  console.log("fhgdgfsfh", messageListParticular);

  const sendMessage = () => {
    var message = {
      type: "chat",
      body: messageInput,
      extension: {
        save_to_history: 1,
        dialog_id: activeDialog._id,
      },
      markable: 1,
    };
    var opponentId = activeDialog.occupants_ids[0];
    if (activeDialog.occupants_ids[0] == localStorage.getItem("occupantId")) {
      opponentId = activeDialog.occupants_ids[1];
    }
    setMessageInput("");
    try {
      message.id = QB.chat.send(opponentId, message);
      getMessageList(activeDialog);
    } catch (e) {
      if (e.name === "ChatNotConnectedError") {
        // not connected to chat
      }
    }
    var userCredentials = {
      userId: localStorage.getItem("occupantId"),
      password: "qb_moodflik_test",
    };
    onCallDialog(userCredentials);
  };
  const handleKeypress = (e, type) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="login-page">
      <HeaderHome />

      <div className="main-content" style={{ height: "100vh" }}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              <Header as="h3">Chating</Header>
            </Grid.Column>
            <Grid.Column width={6}>
              <Button
                className="send-contact-us"
                style={{
                  float: "right",
                  borderRadius: "10px",
                }}
                onClick={() => setOpenAddUserModal(true)}
              >
                Add User
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {/* <Segment className="loader-custom">
          <Dimmer active={isLoading} inverted>
            <Loader inverted content="Loading" />
          </Dimmer>
        </Segment> */}

        <Grid>
          <Grid.Column mobile={16} tablet={6} computer={6}>
            <div className="user-chat-list-box">
              {userListChat.length > 0 &&
                userListChat.map((user) => {
                  return (
                    <>
                      <div className="user-chat-box-content">
                        <div
                          className="user-chat"
                          onClick={() => handleJoinDialog(user)}
                        >
                          <div className="user-name-image">
                            <Image
                              src={user.photo ? user.photo : defaultUserImage}
                              width="50"
                              height="50"
                              className="image-user"
                            />
                            <Header as="h5" style={{ margin: 0 }}>
                              {user.name}
                              <Header.Subheader>
                                {user.last_message}
                              </Header.Subheader>
                            </Header>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={10} computer={10}>
            <div className="user-chat-detail-box">
              <div className="user-chat-detail-content">
                {userDetailDialog && (
                  <div className="user-chat-name-user">
                    <Header as="h4">
                      {userDetailDialog.name && userDetailDialog.name}
                    </Header>
                  </div>
                )}
                {messageListParticular.length > 0 &&
                  messageListParticular.map((item) => {
                    return (
                      <>
                        <div>
                          {localStorage.getItem("occupantId") ==
                          item.sender_id ? (
                            <div className="user-chat-detail">
                              <p className="sender-message">
                                {item.message || item.body}
                              </p>
                            </div>
                          ) : (
                            <div>
                              <p className="reciver-message">
                                {item.message || item.body}
                              </p>
                            </div>
                          )}
                        </div>
                      </>
                    );
                  })}
              </div>
              <div className="bottom-input-send-message">
                <div className="input-box-send">
                  <Icon
                    name="smile outline"
                    className="smile-in-chat"
                    onClick={() => setIsOpenEmoji(!isOpenEmoji)}
                  />

                  {isOpenEmoji && (
                    <div className="emoji-style-custom">
                      <Picker
                        onEmojiClick={(event, emojiObject) =>
                          setMessageInput(messageInput + emojiObject.emoji)
                        }
                      />
                    </div>
                  )}

                  <Form.Input
                    fluid
                    type="text"
                    value={messageInput}
                    className="input-box-custom"
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type Here..."
                    name="messageInput"
                    autoFocus={true}
                    onKeyPress={(e) => handleKeypress(e)}
                    icon={
                      <Icon
                        name="send"
                        link
                        style={{ color: "#bec5d3" }}
                        onClick={() => sendMessage()}
                      />
                    }
                  />
                </div>
              </div>
            </div>
          </Grid.Column>
        </Grid>

        <Modal
          onClose={() => setOpenAddUserModal(false)}
          onOpen={() => setOpenAddUserModal(true)}
          open={openAddUserModal}
          size="tiny"
        >
          <Modal.Content>
            <Header textAlign="center">Add New User</Header>
            <div className="input-search-friend">
              <Form.Input
                fluid
                type="text"
                onChange={handleSearchInput}
                placeholder="Search Name"
                name="name"
                value={searchVal}
              />
            </div>

            <div className="add-user-friend-list-modal">
              <Grid>
                {friendListNew.length > 0 &&
                  friendListNew.map((item) => {
                    if (item.occupant_id) {
                      return (
                        <>
                          <Grid.Column mobile={12} tablet={12} computer={12}>
                            <p>
                              {item.first_name}
                              {item.last_name}
                            </p>
                            <p>
                              <span>{item.username}</span>
                            </p>
                          </Grid.Column>
                          <Grid.Column mobile={4} tablet={4} computer={4}>
                            <Button
                              className="save-btn"
                              style={
                                {
                                  // margin: 0,
                                }
                              }
                              onClick={() =>
                                handleAddNewUserForChat(item.occupant_id)
                              }
                              //   disabled={disableSubmit}
                            >
                              Add
                            </Button>
                          </Grid.Column>
                        </>
                      );
                    }
                  })}
              </Grid>
            </div>
          </Modal.Content>
          <Modal.Actions
            style={{
              backgroundColor: "#fff",
              textAlign: "center",
              borderTop: "none",
            }}
          >
            <Button
              onClick={handleCancle}
              className="cancle-btn"
              style={{
                width: " 35%",
                margin: 0,
              }}
            >
              Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
export default withRouter(UserListChat);
