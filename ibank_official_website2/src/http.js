/* ------------- 该文件为axios请求 拦截器文件 ----------------------- */
import axios from "axios";
// import { Spin } from "iview";

axios.defaults = Object.assign(axios.defaults, {
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    }
});

// 添加请求拦截器
axios.interceptors.request.use(
    config => {
        let isUser = sessionStorage.userInfo
        if (isUser) {
            config.headers.accessToken = JSON.parse(isUser).user.token;
        }

        // iview loading
        // Spin.show({
        //     render: (h) => {
        //         return h('div', [
        //             h('Icon', {
        //                 'class': 'demo-spin-icon-load',
        //                 props: {
        //                     type: 'ios-loading',
        //                     size: 14
        //                 }
        //             }),
        //             h('div', '努力加载中...')
        //         ])
        //     }
        // });

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 添加响应拦截器
axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            if (response.data) {
                setTimeout(() => {
                    // Spin.hide();
                }, 1000);
                switch (response.data.code) {
                    case 100: // 正常
                        return response.data.data;
                    default:
                        return Promise.reject(response);
                }
            } else {
                return response;
            }
        } else {
            alert(`网络错误!(${response.status})`)
        }
    },
    error => {
        return Promise.reject(error);
    }
);

export default axios;
