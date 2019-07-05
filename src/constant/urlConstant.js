const AUTH_SERVICE = process.env.REACT_APP_AUTH_SERVICE===null?process.env.REACT_APP_AUTH_SERVICE:'http://localhost'+':10001';
const CONTENT_SERVICE = process.env.REACT_APP_CONTENT_SERVICE===null?process.env.REACT_APP_AUTH_SERVICE:'http://localhost'+':10002';

export const GET_TOKEN = AUTH_SERVICE+'/oauth/token';
export const ADD_ARTICLE = CONTENT_SERVICE+'/api/article';
export const GET_SUMMARY_LIST_BY_CATEGORY = CONTENT_SERVICE+'/api/article/list/summary';
export const GET_ARTICLE_CONTENT = CONTENT_SERVICE + '/api/article/single';
