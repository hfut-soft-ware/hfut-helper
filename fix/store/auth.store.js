"use strict";var common_vendor=require("../common/vendor.js");var components_CoursePopup_useFailureRateQuery=require("../components/CoursePopup/use-failureRateQuery.js");var shared_constant=require("../shared/constant.js");var shared_hooks_useAsync=require("../shared/hooks/use-async.js");var server_api_user=require("../server/api/user.js");var shared_hooks_useSyncStorage=require("../shared/hooks/use-syncStorage.js");var shared_config_request=require("../shared/config/request.js");var AuthStatus=((AuthStatus2)=>{AuthStatus2[AuthStatus2["UN_LOGIN"]=0]="UN_LOGIN";AuthStatus2[AuthStatus2["LOGIN_IN"]=1]="LOGIN_IN";return AuthStatus2})(AuthStatus||{});function checkIsLogin(){const token=common_vendor.index.getStorageSync(shared_constant.TOKEN_KEY);return token.length>0?1:0}const[getUserData]=shared_hooks_useSyncStorage.useSyncStorage(shared_constant.USER_INFO_KEY);const[getUserAccount,setUserAccount]=shared_hooks_useSyncStorage.useSyncStorage(shared_constant.USER_ACCOUNT_KEY);const useAuthStore=components_CoursePopup_useFailureRateQuery.defineStore("authStore",()=>{const auth=common_vendor.reactive({token:"",status:checkIsLogin()});const setToken=(tokenPayload)=>{auth.token=tokenPayload;common_vendor.index.setStorageSync(shared_constant.TOKEN_KEY,tokenPayload)};const setUserInfo=(userInfo)=>{common_vendor.index.setStorageSync(shared_constant.USER_INFO_KEY,userInfo)};const logout=()=>{common_vendor.index.clearStorageSync()};const login=async({studentId,password,callback})=>{common_vendor.index.request({url:`${shared_config_request.requestConfig.baseURL}v2/login`,method:"POST",data:{studentId,password},async success(state){if(state.statusCode!==200){common_vendor._default.fail({message:`${state.data.msg||"\u767B\u5F55\u5931\u8D25!"}${common_vendor.getRandomQAQ("sadness")[0]}`});return}const token=state.data.data.token;common_vendor._default.success({message:`\u767B\u5F55\u6210\u529F${common_vendor.getRandomQAQ("happy")[0]}`});if(common_vendor.lodash.exports.isFunction(callback)){await callback(token)}else{setToken(token);setUserAccount({studentId,password})}common_vendor.index.reLaunch({url:"/pages/day-schedule/index"})}})};const getUserData2=async()=>{try{const{state}=await shared_hooks_useAsync.useAsync(server_api_user.getUserInfo);const data=state.value.data.data;setUserInfo(data);return data}catch(error){common_vendor._default.fail({message:`\u83B7\u53D6\u5B66\u751F\u4FE1\u606F\u5931\u8D25 ${common_vendor.getRandomQAQ("sadness")[0]}${error.message}`})}};return{auth,login,logout,getUserData:getUserData2}});exports.AuthStatus=AuthStatus;exports.checkIsLogin=checkIsLogin;exports.getUserAccount=getUserAccount;exports.getUserData=getUserData;exports.useAuthStore=useAuthStore;