import axios from "axios";

axios.defaults.baseURL='api'
axios.defaults.timeout=5000

axios.interceptors.request.use(config => {
    const token = window.localStorage.getItem("Authorization");
    config.headers["Authorization"] = token;
    return config;
},error => {
    Promise.reject(error);
})

axios.interceptors.response.use(response => {
    if(response.code === 403){
        router.push('/')
    }
    return response.data;
},error => {
    Promise.reject(error);
})

export default axios