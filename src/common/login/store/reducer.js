/* eslint-disable */
import {fromJS} from "immutable";

const s = fromJS({
    isLogined: checkLoginFieldByKey('isLogined'),
    username: checkLoginFieldByKey('username'),
    access_token: checkLoginFieldByKey('access_token'),
    previousPath: checkLoginFieldByKey('previousPath'),
    errorMsg: null,
    captchaId: checkLoginFieldByKey('captchaId'),
    captchaPic:checkLoginFieldByKey('captchaPic'),
    isValid:false
    //will integrated with OAuth2 futher
    // token: null,
    // refreshToken:null
});

function checkLoginFieldByKey(key) {
    //console.log('session storage is ' + sessionStorage);
    let field = sessionStorage.getItem(key);

    if (field) {
        switch (key) {
            case 'isLogined':
                return (field == 'true');
            case 'access_token':
                return field;
            case 'previousPath':
                return field;
            case 'username':
                return field;
            case 'errorMsg':
                return field;
            case 'captchaId':
                return field;
            case 'captchaPic':
                return field;
            default:
                return field;
        }
    } else {
        switch (key) {
            case 'isLogined':
                return false;
            case 'access_token':
                return null;
            case 'previousPath':
                //console.log("previous path is /");
                return '/';
            case 'username':
                return null;
            case 'errorMsg':
                return null;
            case 'captchaId':
                return null;
            case 'captchaPic':
                return null;
            default:
                return null;
        }
    }
}


    export default (state = s, action) => {

        if (action.type === 'captchaValidAction') {
            console.log('in reducer'+action.isValid);
            return state.merge({
                isValid: action.isValid
            });
        }

        if (action.type === 'clearErrorMsgAction') {
            return state.merge({
                errorMsg: action.errorMsg
            });
        }

        if (action.type === 'captchaAction') {
            return state.merge({
                captchaId: action.captchaId,
                captchaPic:action.captchaPic
            });
        }

        if (action.type === 'userLoginAction') {
            //console.log('userLoginAction called');
            //console.log(action.username + 'sd' + action.isLogined);
            sessionStorage.setItem('isLogined', action.isLogined);
            sessionStorage.setItem('username', action.username);
            sessionStorage.setItem('access_token', action.access_token);


            return state.merge({
                isLogined: action.isLogined,
                username: action.username,
                access_token: action.access_token
            });
        }

        if (action.type === 'logoutAction') {
            //console.log('logout action triggered!');

            sessionStorage.removeItem('isLogined');
            sessionStorage.removeItem('username');
            sessionStorage.removeItem('access_token');
            sessionStorage.removeItem('previousPath');

            return state.merge({
                isLogined: false,
                username: null,
                access_token: null,
                previousPath: null
            });
        }

        if (action.type === 'recordPreviousPathAction') {
            //console.log('receive auto redirect path');
            sessionStorage.setItem('previousPath', action.redirectPath);
            return state.set('previousPath', action.redirectPath);
        }

        if (action.type === 'errorMsgAction'){
            return state.set('errorMsg', action.errorMsg);
        }

        return state;
    }
