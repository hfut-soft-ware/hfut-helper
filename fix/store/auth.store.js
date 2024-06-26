"use strict";
var common_vendor = require("../common/vendor.js");
var shared_constant = require("../shared/constant.js");
var shared_hooks_useAsync = require("../shared/hooks/use-async.js");
var server_api_user = require("../server/api/user.js");
var shared_hooks_useSyncStorage = require("../shared/hooks/use-syncStorage.js");
var shared_utils_auth = require("../shared/utils/auth.js");
var server_api_auth = require("../server/api/auth.js");
var shared_utils_index = require("../shared/utils/index.js");
var AuthStatus = /* @__PURE__ */ ((AuthStatus2) => {
  AuthStatus2[AuthStatus2["UN_LOGIN"] = 0] = "UN_LOGIN";
  AuthStatus2[AuthStatus2["LOGIN_IN"] = 1] = "LOGIN_IN";
  return AuthStatus2;
})(AuthStatus || {});
function checkIsLogin() {
  const token = common_vendor.index.getStorageSync(shared_constant.TOKEN_KEY);
  return (token == null ? void 0 : token.length) > 0 ? 1 : 0;
}
const [getUserData] = shared_hooks_useSyncStorage.useSyncStorage(shared_constant.USER_INFO_KEY);
const [getUserAccount, setUserAccount] = shared_hooks_useSyncStorage.useSyncStorage(shared_constant.USER_ACCOUNT_KEY);
const useAuthStore = common_vendor.defineStore("authStore", () => {
  const auth = common_vendor.reactive({
    token: "",
    status: checkIsLogin()
  });
  const setToken = (tokenPayload) => {
    auth.token = tokenPayload;
    common_vendor.index.setStorageSync(shared_constant.TOKEN_KEY, tokenPayload);
  };
  const setUserInfo = (userInfo) => {
    common_vendor.index.setStorageSync(shared_constant.USER_INFO_KEY, userInfo);
  };
  const logout = () => {
    common_vendor.index.clearStorageSync();
  };
  const login = async ({ studentId, password, callback }) => {
    var _a;
    try {
      const { data, statusCode } = await server_api_auth.loginRequest({ studentId, password });
      if (statusCode !== 200) {
        common_vendor._default.fail({
          message: `${data.msg} || '\u767B\u5F55\u5931\u8D25!'}
${common_vendor.getRandomQAQ("sadness")[0]}`
        });
        return;
      }
      const token = data.data.token;
      common_vendor._default.clear();
      common_vendor._default.success({
        message: `\u767B\u5F55\u6210\u529F${common_vendor.getRandomQAQ("happy")[0]}`
      });
      if (common_vendor.lodash.exports.isFunction(callback)) {
        await callback(token);
      } else {
        setToken(token);
        shared_utils_auth.handeLoginKey(data);
        setUserAccount({
          studentId,
          password
        });
      }
      common_vendor.index.reLaunch({
        url: "/pages/day-schedule/index"
      });
    } catch (error) {
      if ((_a = error == null ? void 0 : error.data) == null ? void 0 : _a.msg) {
        shared_utils_index.handleError(error);
      } else {
        shared_utils_index.handleError(error, "\u672A\u77E5\u9519\u8BEF");
      }
    }
  };
  const getUserData2 = async () => {
    try {
      const { state } = await shared_hooks_useAsync.useAsync(server_api_user.getUserInfo);
      const data = state.value.data.data;
      setUserInfo(data);
      return data;
    } catch (error) {
      common_vendor._default.fail({
        message: `\u83B7\u53D6\u5B66\u751F\u4FE1\u606F\u5931\u8D25
${common_vendor.getRandomQAQ("sadness")[0]}
${error.message}`
      });
    }
  };
  return {
    auth,
    login,
    logout,
    getUserData: getUserData2
  };
});
exports.AuthStatus = AuthStatus;
exports.checkIsLogin = checkIsLogin;
exports.getUserAccount = getUserAccount;
exports.getUserData = getUserData;
exports.useAuthStore = useAuthStore;
