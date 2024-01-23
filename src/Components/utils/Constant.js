const BaseUrl = `https://api.realworld.io/api/`;
const  ArticlesUrl = BaseUrl + "articles";
const SignUpUrl = BaseUrl + 'users';
const LoginUrl = BaseUrl + 'users/login';
const TagsUrl = BaseUrl + "tags";
const localStorageKey = "TokenKey";
const userVerifyUrl = BaseUrl + "user"; 

export {
    BaseUrl, ArticlesUrl,LoginUrl,SignUpUrl, TagsUrl, localStorageKey, userVerifyUrl
}