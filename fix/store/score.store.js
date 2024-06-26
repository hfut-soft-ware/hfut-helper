"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var common_vendor = require("../common/vendor.js");
var shared_utils_index = require("../shared/utils/index.js");
var server_api_score = require("../server/api/score.js");
var shared_hooks_useRef = require("../shared/hooks/useRef.js");
var shared_hooks_useSyncStorage = require("../shared/hooks/use-syncStorage.js");
function createScoreDetail(rankData, type) {
  const total = rankData.total;
  const data = type === "average" ? rankData.score : rankData.gpa;
  return {
    total,
    rank: data.rank,
    averageScore: data.avg,
    score: data.mine,
    max: data.max,
    top: data.head
  };
}
function formatScore(score) {
  if (common_vendor.lodash.exports.isNumber(score)) {
    return score.toFixed(2);
  } else {
    const res = parseFloat(`${score}`).toFixed(2);
    return isNaN(res) ? score : res;
  }
}
const scoreKey = "__SCORE__";
const [getScoreStorage, setScoreStorage, removeScoreStorage] = shared_hooks_useSyncStorage.useSyncStorage(scoreKey);
const useScoreStore = common_vendor.defineStore("scoreStore", () => {
  const scoreData = common_vendor.ref(getScoreStorage());
  const [homeActive, setHomeActive] = shared_hooks_useRef.useRef("average");
  const [selectedSemester, setSelectedSemester] = shared_hooks_useRef.useRef(0);
  const [currentSelectedCourse, setCurrentSelectedCourse] = shared_hooks_useRef.useRef({});
  const [currentScoreData, setCurrentScoreData] = shared_hooks_useRef.useRef({});
  const isLoading = common_vendor.ref(false);
  const homeDetailMode = common_vendor.ref("top");
  const homeDetailInfo = common_vendor.computed$1(() => {
    const data = homeScoreData.value;
    return [
      {
        title: "\u6211\u7684\u6210\u7EE9",
        value: parseFloat(data.score.toString()).toFixed(2),
        icon: "user-circle-o"
      },
      {
        title: "\u4E13\u4E1A\u5E73\u5747",
        value: parseFloat(data.averageScore.toString()).toFixed(2),
        icon: "friends-o"
      },
      {
        title: homeDetailMode.value === "top" ? "\u4E13\u4E1A\u524D10%" : "\u4E13\u4E1A\u6700\u9AD8",
        value: parseFloat((homeDetailMode.value === "top" ? data.top : data.max).toString()).toFixed(2),
        icon: "fire-o"
      }
    ];
  });
  const defaultData = {
    total: 0,
    rank: 0,
    score: 0,
    max: 0,
    top: 0,
    averageScore: 0
  };
  const homeScoreRankDataType = common_vendor.ref("compulsory");
  const homeScoreRankData = common_vendor.computed$1(() => homeScoreRankDataType.value === "all" ? scoreData.value.totalRank : scoreData.value.compulsoryRank);
  const homeScoreData = common_vendor.computed$1(() => {
    if (!scoreData.value) {
      return defaultData;
    }
    return createScoreDetail(homeScoreRankData.value, homeActive.value);
  });
  const semesterScoreData = common_vendor.computed$1(() => {
    if (!scoreData.value) {
      return [{ semesterInfo: {}, data: defaultData, index: 0 }];
    }
    return scoreData.value.semesters.map((item, index) => ({
      semesterInfo: item,
      data: createScoreDetail(item.compulsoryRank, homeActive.value),
      index
    }));
  });
  const selectedSemesterData = common_vendor.computed$1(() => {
    return semesterScoreData.value[selectedSemester.value];
  });
  const getScoreStore = async (refresh = false, withTip = true) => {
    isLoading.value = true;
    await server_api_score.getScoreRequest(refresh).then((res) => {
      if (withTip) {
        common_vendor._default.clear();
        common_vendor._default.success({
          message: `\u83B7\u53D6\u6210\u7EE9\u4FE1\u606F\u6210\u529F\uFF01
${common_vendor.getRandomQAQ("happy")[0]}`
        });
      }
      common_vendor.index.stopPullDownRefresh();
      const data = res.data.data;
      scoreData.value = data;
      setScoreStorage(data);
    }).catch((error) => {
      common_vendor._default.clear();
      common_vendor.index.stopPullDownRefresh();
      if (withTip) {
        shared_utils_index.handleError(error, "\u83B7\u53D6\u6210\u7EE9\u4FE1\u606F\u5931\u8D25\uFF0C\u53BB\u4EA4\u6D41\u7FA4\u95EE\u95EE\u5427~");
      }
      throw new Error("cannot get data");
    }).finally(() => {
      isLoading.value = false;
    });
  };
  const getSingleScoreData = async () => {
    const singleScoreDto = {
      lessonId: currentSelectedCourse.value.lessonId,
      semesterId: selectedSemesterData.value.semesterInfo.semesterId
    };
    common_vendor._default.loading({
      duration: 0,
      message: `\u6B63\u5728\u83B7\u53D6\u6210\u7EE9\u4FE1\u606F...
${common_vendor.getRandomQAQ("happy")[0]}`
    });
    try {
      const { data: singleScoreRes } = await server_api_score.getSingleScoreRequest(singleScoreDto);
      setCurrentScoreData(__spreadValues({}, singleScoreRes.data));
      common_vendor._default.clear();
      common_vendor._default.success({
        message: `\u83B7\u53D6\u6210\u7EE9\u4FE1\u606F\u6210\u529F\uFF01
${common_vendor.getRandomQAQ("happy")[0]}`
      });
      common_vendor.index.stopPullDownRefresh();
    } catch (error) {
      common_vendor.index.stopPullDownRefresh();
      shared_utils_index.handleError(error, "\u83B7\u53D6\u6210\u7EE9\u4FE1\u606F\u5931\u8D25\uFF0C\u53BB\u4EA4\u6D41\u7FA4\u95EE\u95EE\u5427~");
    }
  };
  return {
    scoreData,
    homeDetailMode,
    homeDetailInfo,
    homeActive,
    homeScoreRankDataType,
    homeScoreData,
    isLoading,
    setHomeActive,
    getScoreStore,
    semesterScoreData,
    selectedSemester,
    setSelectedSemester,
    selectedSemesterData,
    currentSelectedCourse,
    setCurrentSelectedCourse,
    currentScoreData,
    getSingleScoreData
  };
});
exports.formatScore = formatScore;
exports.scoreKey = scoreKey;
exports.useScoreStore = useScoreStore;
