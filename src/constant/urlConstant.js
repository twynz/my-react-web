const AUTH_SERVICE = "http://localhost:10001";
const CONTENT_SERVICE = "http://13.236.52.147:80";

export const GET_TOKEN = AUTH_SERVICE+'/oauth/token';
export const ADD_ARTICLE = CONTENT_SERVICE+'/api/article';
export const GET_SUMMARY_LIST_BY_CATEGORY = CONTENT_SERVICE+'/api/article/list/summary';
export const GET_ARTICLE_CONTENT = CONTENT_SERVICE + '/api/article/single';
export const GET_CAPTCHA_CODE_PIC = AUTH_SERVICE+'/captcha/getCodePic';
export const POST_CAPTCHA_CODE = AUTH_SERVICE+'/captcha/verifyCode';
