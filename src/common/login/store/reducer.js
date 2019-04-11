import {fromJS} from "immutable";

const s = fromJS({
    isLogined: checkLoginFieldByKey('isLogined'),
    username: checkLoginFieldByKey('username'),
    authorities: checkLoginFieldByKey('authorities'),
    previousPath: checkLoginFieldByKey('previousPath')
    //will integrated with OAuth2 futher
    // token: null,
    // refreshToken:null
});

function checkLoginFieldByKey(key){
    console.log('session storage is '+sessionStorage);
    let field  = sessionStorage.getItem(key);
    console.log('field is '+field+'constru name'+field.constructor.name);
    if(field) {
        return field;
    } else{
        switch (key) {
            case 'isLogined':
                sessionStorage.setItem('isLogined',false);
                return false;
            case 'username':
                sessionStorage.setItem('username',null);
                return null;
            case 'authorities':
                let authorities = JSON.stringify(["visitor"]);
                sessionStorage.setItem('authorities',authorities);
                return authorities;
            case 'previousPath':
                sessionStorage.setItem('previousPath',null);
                return null;
            return null;
        }
    }
}


export default (state = s , action) => {

    if (action.type === 'userLoginAction') {
        console.log('userLoginAction called');
        console.log(action.username+'sd'+action.isLogined+'asd'+action.data.authorities);
        return state.merge({
            isLogined: action.isLogined,
            username: action.username,
            authorities: action.data.authorities
        });
    }

    if( action.type === 'logoutAction') {
        console.log('logout action triggered!');
        return state.merge({
            isLogined: false,
            username: null,
            authorities: ['visitor'],
            previousPath: null
        });
    }

    if(action.type === 'recordPreviousPathAction') {
        console.log('receive auto redirect path');
        sessionStorage.setItem('previousPath',action.redirectPath);
        return state.set('previousPath',action.redirectPath);
    }

    return state;
}