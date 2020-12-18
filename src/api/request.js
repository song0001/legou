// request.js 封装

import axios from "axios";
import qs from "qs";
import Vue from 'vue';
import { Toast } from 'vant';

Vue.use(Toast);
var host;
// process.env是Nodejs提供的一个API，它返回一个包含用户环境信息的对象。
// 通过NODE_ENV 判断当前环境是生产环境(production)还是开发环境(development) 自动切换不同域名
// 暂时开发环境和生产环境  所以域名暂时一样 
if (process.env.NODE_ENV == "development") {
    host = "http://shop.bufantec.com/bufan";
} else {
    host = "http://shop.bufantec.com/bufan";
}

// 创建axios实例 
const instance = axios.create({
    // baseURL  公共接口路径
    baseURL: host,
    // timeout 超时时间
    timeout: 5000
});
// 请求拦截器
instance.interceptors.request.use(

    config => {
        Toast.loading({
            message: '加载中...',
            forbidClick: true,
        })
        if (config.method.toLowerCase() == 'post') {
            // qs系列化
            // https://www.npmjs.com/package/qs
            //  arrayFormat: 'repeat' 作用:  { a: ['b', 'c'] }  ==> 'a=b&a=c'
            //  allowDots: true  作用: { a: { b: { c: 'd', e: 'f' } } }  ==>  'a.b.c=d&a.b.e=f'
            config.data = qs.stringify(config.data, { arrayFormat: 'repeat', allowDots: true })
        } else {
            // 
            config.params = config.data
        }
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// 响应拦截器  

instance.interceptors.response.use(
    response => {
        Toast.clear()
        const res = response.data
        return res
    },
    error => {
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)


export default instance