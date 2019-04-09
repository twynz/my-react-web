import {fromJS} from "immutable";

const s = fromJS({
    isLogined: false,
    username: null,
    authorities: ['visitor'],
    previousPath: null
    //will integrated with OAuth2 futher
    // token: null,
    // refreshToken:null
});

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
            authorities: ['visitor']
        });
    }

    if(action.type === 'recordPreviousPathAction') {
        console.log('receive auto redirect path');
        return state.set('previousPath',action.redirectPath);
    }

    return state;
}