import {fromJS} from "immutable";

const s = fromJS({
    isLogined: false,
    username: null,
    authorities: ['visitor']
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

    return state;
}