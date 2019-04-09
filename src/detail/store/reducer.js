import {fromJS} from "immutable";

const s = fromJS({
    contentDetails: []
});


export default (state = s, action) => {
    if(action.type === 'getDetailContentByIdAction') {
        let newList = state.get('contentDetails');
        let obj = {};
        obj['id'] = action.id;
        obj['title'] = action.title;
        obj['content'] = action.content;

        if (newList.length > 10) {
            newList.shift();
        }
        try {
            newList = newList.push(obj);
        } catch (e) {
            console.log(e);
        }

        return state.merge({
            'contentDetails': fromJS(newList)
        });
    }
    return state;
}