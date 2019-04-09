import {fromJS} from "immutable";

const s = fromJS({
    articleList: [],
    endNum: 3
});


export default (state = s, action) => {
    console.log('action data is'+action.data);
    if (action.type === 'getArticleBriefListAction') {
        let newList = state.get('articleList');

         newList = newList.concat(action.data);
        console.log('new list is '+ newList);
        return state.merge({
            'articleList': fromJS(newList),
            'endNum': fromJS(action.endNum)
        });
    }
    return state;
}