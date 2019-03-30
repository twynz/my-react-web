import {fromJS} from "immutable";

const s = fromJS({
    focused: false,
    list: []
});

export default (state = s , action) => {
    if(action.type === 'getSearchInfoList') {
        console.log('get search info list called');
        return state.set('list',action.data);
    }
    if(action.type === 'changeFocusedAction') {
        console.log('action'+action.focused);
        return state.set('focused',action.focused);
    }
    return state;
}