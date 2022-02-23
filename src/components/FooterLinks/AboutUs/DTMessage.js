import React, { useState, useEffect } from 'react';
// import { Divider, Card, Row, Col, Comment, Avatar } from 'antd';
import moment from 'moment';
const QB = window.QB;

const QuickBlox = QB.QuickBlox;

const APPLICATION_ID = "91867";
const AUTH_KEY = "J5H-KYBZTGWarmg";
const AUTH_SECRET = "wPXG4CXPrMKFOQd";
const ACCOUNT_KEY = "G3AHXj94R9sNP5S--fqM"

const CONFIG = {
    streamManagement: {
      enable: true
    }
};

const filters = {  
    sort_desc: 'updated_at', 
}

export default function DTMessage() {
	const [loggedInUser, setLoggedInUser] = useState(null);
	const [dialogList, setDialogList] = useState([]);
	const [selectedDialog, setSelectedDialog] = useState();
	const [messages, setMessages] = useState([]);
	const [msgText, setMsgText] = useState('');

	useEffect(()=> {
        QB.init(APPLICATION_ID, AUTH_KEY, AUTH_SECRET,ACCOUNT_KEY, CONFIG);
		// var params = { login: 'freedom.wekan', password: 'wekancode' };
		var params = { login: '5f6c55cac31ac84d7a483738', password: 'freedomapp' };
        QB.createSession(params,function(err, result) {
			console.log('session creation', result);
			let userCredentials = {
				userId: result.user_id,
				password: result.token
			}
			debugger
            login(userCredentials)
        });

        function login(userCredentials){
            QB.login(params, function(err, user) {
                if (err) {
                    console.log("Errrorrr",err)
                } else {
                    // let userCredentials = {
					// 	// userId: SESSION.qbUserId,
					// 	// userId: user.id,
                    //     userId: 114197739,
                    //     password: 'wekancode'
					// }
                    QB.chat.dialog.list(filters, function(error, dialogs) {
                        let dialogList = dialogs.items;
                        console.log('dialogs', dialogs)
						connect(userCredentials)
						debugger
                        setDialogList(dialogList);
                        if(dialogList.length > 0 ) {
                            setSelectedDialog(dialogList[0])
                        }                        
                        if(dialogList.length > 0)
                            getHistory(dialogList[0])
                    });
                }
            });
        }

        function connect(userCredentials) {
			debugger
			QB.chat.connect(userCredentials, function(error, contactList) {
				debugger
				console.log('contactList:', contactList)
			});
		}
		
    }, [])
    
    function getHistory(dialog) {
		var dialogId = dialog._id;

		var params = {
			chat_dialog_id: dialogId,
			sort_asc: 'date_sent',
			limit: 100,
			skip: 0
		};

		QB.chat.message.list(params, function(error, messages) {
			console.log('messages:', messages)
			debugger
			setMessages(messages.items)
			setTimeout(()=> {
				console.log("Enter")
				let height = document.querySelector('.msg-scroll').scrollHeight;
				document.querySelector('.msg-scroll').scroll(0, height)
			}, 800)
		});
	}

	const handleSelectDialog = (x) => {
		setSelectedDialog(x);
		getHistory(x)
	}

	const sendData = () => {
		sendMessage(selectedDialog)
	}

	async function sendMessage(conversation) {
		console.log("conversation::", conversation)
		var dialog = conversation;
		if(dialog && msgText) {
			var message = {
				type: dialog.type == 3 ? 'chat' : 'groupchat',
				body: msgText,
				extension: {
					save_to_history: 1,
					dialog_id: dialog._id
				},
				markable: 1
				};
		
				var opponentId = dialog.occupants_ids[1];
				message.id = QB.chat.send(opponentId, message);
				QB.chat.onMessageListener = onMessage;
				setMsgText('')
				getHistory(conversation);
				setTimeout(()=> {
					console.log("Enter")
					let height = document.querySelector('.msg-scroll').scrollHeight;
					document.querySelector('.msg-scroll').scroll(0, height)
				}, 1000)
		}
	}
	
	function onMessage(userId, message) { 
		setMsgText('');
		console.log("Enter");
		console.log('Receiving message', message)
	}

	return (
		<div>
			
		</div>
	);
}