import Axios from "axios";
import { Toast, Indicator } from "mint-ui";

Axios.defaults = Object.assign(Axios.defaults, {
  baseURL: "http://localhost:8200",
//   baseURL: "http://sarm.tryminex.com/",
  timeout: 0,
  responseType: "json",
  withCredentials: true,
  // headers: {
  //   "Content-Type": "application/json",
  //   Accept: "application/json"
  // }
});

// 添加请求拦截器
Axios.interceptors.request.use(
  function (config) {
    // if (config.axiosLoading) {
    //   Indicator.open();
    // }
    // if (config.url.indexOf("token") == -1) {
    //   config.url +=
    //     (config.url.indexOf("?") > -1 ? "&" : "?") +
    //     `token=${sessionStorage.getItem("token") || ""}`;
    // }
    // if (config.data && !config.data.token) {
    //   config.data.token = sessionStorage.getItem("token") || "";
    // }
    // config.headers = {
    //   "Content-Type": "application/json",
    //   "Accept": "application/json"
    // }
    if (localStorage.getItem('token')) { 
      config.headers.token = localStorage.getItem('token');
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
Axios.interceptors.response.use(
  function (response) {
    if (response.config.axiosLoading) {
      Indicator.close();
    }
    switch (response.data.code) {
      case 100: //正常
        return response;
        break;
      case 200:
        return response;
        break;
      case 600:
        Toast({
          message: '您还未登录，请先登录',
          position: 'middle',
          duration: 1000
        });
        return response;
        break;
      default:
        Toast(response.data.msg);
        return Promise.reject(response.data.msg);
        break;
    }
  },
  function (error) {
    return Promise.reject(error);
  }
);

class Tool {
  find(array, key, val) {
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      if (element[key] === val) {
        return element;
      }
    }
    return null;
  }

  findIndex(array, key, val) {
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      if (element[key] === val) {
        return i;
      }
    }
    return -1;
  }

  format(date, fmt) {
    var o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S': date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt
  }

  formatData(strDateTime, intType) {
    //时间格式化，建议使用这个
    var years, month, days, hours, minutes, seconds;
    var newDate,
      arrDate = new Array(),
      arrTime = new Array();

    if (strDateTime != undefined && strDateTime != null && strDateTime != "") {
      if (strDateTime instanceof Date) {
        newDate = strDateTime;
      } else {
        //获取日期和时间数组
        if (strDateTime.indexOf("-") != -1) {
          var item = strDateTime.split(" ");
          arrDate = item[0].toString().split("-");
          arrTime = item[1].toString().split(":");
        } else if (strDateTime.indexOf("/") != -1) {
          var item = strDateTime.split(" ");
          arrDate = item[0].toString().split("/");
          arrTime = item[1].toString().split(":");
        }
        newDate = new Date(
          parseInt(arrDate[0]),
          parseInt(arrDate[1]),
          parseInt(arrDate[2]),
          parseInt(arrTime[0]),
          parseInt(arrTime[1]),
          arrTime.length >= 3 ? parseInt(arrTime[2]) : "00"
        );
      }

      //处理数据
      years = newDate.getFullYear();
      month = newDate.getMonth();
      if (strDateTime instanceof Date) {
        month = month + 1;
      }
      if (Number(month) < 10) month = "0" + month;
      days = newDate.getDate();
      if (Number(days) < 10) days = "0" + days;
      hours = newDate.getHours();
      if (Number(hours) < 10) hours = "0" + hours;
      minutes = newDate.getMinutes();
      if (Number(minutes) < 10) minutes = "0" + minutes;
      seconds = newDate.getSeconds();
      if (Number(seconds) < 10) seconds = "0" + seconds;

      switch (intType) {
        case "yyyy-MM-dd":
          newDate = years + "-" + month + "-" + days;
          break;
        case "MM-dd HH:mm":
          newDate = month + "-" + days + " " + hours + ":" + minutes;
          break;
        case "HH:mm:ss":
          newDate = hours + ":" + minutes + ":" + seconds;
          break;
        case "HH:mm":
          newDate = hours + ":" + minutes;
          break;
        case "yyyy-MM-dd HH:mm":
          newDate =
            years + "-" + month + "-" + days + " " + hours + ":" + minutes;
          break;
        case "yyyy/MM/dd":
          newDate = years + "/" + month + "/" + days;
          break;
        case "MM/dd HH:mm":
          newDate = month + "/" + days + " " + hours + ":" + minutes;
          break;
        case "yyyy/MM/dd HH:mm":
          newDate =
            years + "/" + month + "/" + days + " " + hours + ":" + minutes;
          break;
        case "yy-MM-dd":
          years = years.toString().substr(2, 2);
          newDate = years + "-" + month + "-" + days;
          break;
        case "yy/MM/dd":
          years = years.toString().substr(2, 2);
          newDate = years + "/" + month + "/" + days;
          break;
        case "yyyy年MM月dd hh时mm分":
          newDate =
            years +
            "年" +
            month +
            "月" +
            days +
            " " +
            hours +
            "时" +
            minutes +
            "分";
          break;
        case "yyyy年MM月dd日":
          newDate = years + "年" + month + "月" + days + "日";
          break;
        case "yyyy-MM-dd HH:mm:ss":
          newDate =
            years +
            "-" +
            month +
            "-" +
            days +
            " " +
            hours +
            ":" +
            minutes +
            ":" +
            seconds;
          break;
      }
    }
    return newDate;
  }
}

export default new Tool();
