import "../components/Sys/config";
var apiUrl = global.platformURI;

export const authServices = {
    userLogin,
    // forgotPassword,
    // resetPassword,
    // verifyEmail,
    userSignUp,
    getTredingPostOnLoginPageDisLike,
    getTredingPostOnLoginPageLike
};

function userLogin(payload) {
    var requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    };

    return fetch(apiUrl+"user/authorize/", requestOptions)
    .then(handleResponse)
    .then(user => {return user})
    }

    function getTredingPostOnLoginPageDisLike() {
        var requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        };
    
        return fetch(apiUrl+"/api/most_seen/?type=dislike", requestOptions)
        .then(handleResponse)
        .then(user => {return user})
        }
        function getTredingPostOnLoginPageLike() {
            var requestOptions = {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            };
        
            return fetch(apiUrl+"/api/most_seen/?type=like", requestOptions)
            .then(handleResponse)
            .then(user => {return user})
            }

function userSignUp(payload) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    };
    console.log('requestOptions', requestOptions);
    return fetch(apiUrl+"user/", requestOptions)
        .then(handleResponse)
        .then(user => {
            return user;
        });
}



function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // logout();
            }

            const error = (data) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
