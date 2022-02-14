import axios from "axios";
import { message } from 'antd';

const service = axios.create({
  timeout: 10000,
});

service.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  // 给的什么垃圾接口连个状态码都没有(拽)
  response => {
    const res = response.data;
    // if (res.code !== 200) {
    //   message.error(res.msg);
    //   return Promise.reject(res.msg);
    // } else {
    //   return res;
    // }
    return res;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default service;