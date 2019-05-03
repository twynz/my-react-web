import {fromJS} from "immutable";

const s = fromJS({
    result: checkContentFieldByKey('result'),
    currentContentType:checkContentFieldByKey('currentContentType'),
    currentArticleTitle:checkContentFieldByKey('currentArticleTitle'),
    currentArticleContent:checkContentFieldByKey('currentArticleContent'),
    noFooter: "false"
});

function checkContentFieldByKey(key){
    console.log('session storage is '+sessionStorage);

    let field  = sessionStorage.getItem(key);
    console.log('key is'+key+' filed is '+field);
    if(field) {
        if(key === 'result') {
            console.log('result in reducer now is '+ JSON.stringify(field));
            let list = JSON.parse(field);
            let resultList = [];
            for(let i=0;i<list.length;i++) {
                let currentMap = list[i];
                let tmpObj = {};
                tmpObj.id = currentMap['id'];
                tmpObj.title = currentMap['title'];
                tmpObj.desc = currentMap['desc'];
                tmpObj.img = currentMap['img'];
                console.log('tmpobj now is '+tmpObj);
                resultList.push(tmpObj);

            }
            console.log('resultlist now is '+resultList);
            return resultList;
        }

        return field;
    }
    else {
        return null;
    }
}

export default (state = s , action) => {

    if (action.type === 'getContentByType') {
        console.log('getContentByType called');

        sessionStorage.setItem("currentContentType",action.contentType);
        sessionStorage.setItem("result",JSON.stringify(action.data));

        return state.merge({
            result: JSON.parse(JSON.stringify(action.data)),
            currentContentType: action.contentType
        });
    }

    if(action.type === 'getArticleById') {
        console.log('getArticleById called');

        sessionStorage.setItem("currentArticleTitle",action.currentArticleTitle);
        sessionStorage.setItem("currentArticleContent",action.currentArticleContent);

        return state.merge({
            currentArticleTitle: action.title,
            currentArticleContent: action.content
        });
    }

    if(action.type === 'setNoFooter') {
        console.log('set nofooter status is '+action.noFooter);
        return state.merge({
            noFooter: action.noFooter
        });
    }
    return state;
}