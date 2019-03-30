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

    if (action === 'changeLoginSuccessfulAction') {
        console.log('changeLoginSuccessfulAction called');
        let cloneState = JSON.parse(JSON.stringify(state));
        cloneState.set('username',action.username);
        cloneState.set('isLogined',action.isLogined);
        cloneState.set('authorities',action.authorities);
        return state.set(cloneState);
    }

    return state;
}