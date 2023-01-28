import axios from "axios";
import { API_URL } from '../constant'
import { history } from './history'
import * as ACTIONS from '../actions/authActions'
import Store from './store'

// Alter defaults after instance has been created
const authInstace = axios.create({
    baseURL: API_URL
});


// Add a request interceptor
authInstace.interceptors.request.use(
    config => {
        const token = JSON.parse(localStorage.getItem('admin')) !== undefined && JSON.parse(localStorage.getItem('admin')) !== null ? JSON.parse(localStorage.getItem('admin')).access !== null && JSON.parse(localStorage.getItem('admin')).access !== undefined ? JSON.parse(localStorage.getItem('admin')).access : null : null;
        const dealer = (Number(localStorage.getItem('user_type')) === 2) ? (JSON.parse(localStorage.getItem('user')) !== undefined && JSON.parse(localStorage.getItem('user')) !== null ? JSON.parse(localStorage.getItem('user')).access !== null && JSON.parse(localStorage.getItem('user')).access !== undefined ? JSON.parse(localStorage.getItem('user')).access : null : null) : false;
      
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }else if(dealer){
            config.headers['Authorization'] = 'Bearer ' + dealer;
        } else {
            delete axios.defaults.headers.common["Authorization"];

        }
        return config;
    },
    error => {
        Promise.reject(error)
    });



//Add a response interceptor

authInstace.interceptors.response.use((response) => {
    return response
}, function (error) {
    const originalRequest = error.config;
    console.log(error,"error",error.config)
    if (error?.response?.status === 403 && originalRequest.url ===
        `${API_URL}/api/token/`) {
    console.log(API_URL,"1")

        history.push('/secure/admin-login');
        return Promise.reject(error);
    }

    if (error?.response?.status === 403 && !originalRequest._retry) {

        originalRequest._retry = true;
        const refreshToken = JSON.parse(localStorage.getItem('admin')) !== undefined && JSON.parse(localStorage.getItem('admin')) !== null ? JSON.parse(localStorage.getItem('admin')).refresh !== null && JSON.parse(localStorage.getItem('admin')).refresh !== undefined ? JSON.parse(localStorage.getItem('admin')).refresh : null : null;
        console.log('refreshToken', refreshToken)
        return axios.post(`${API_URL}/api/token/refresh/`,
            {
                "refresh": refreshToken
            })
            .then(res => {
                if (res?.status === 201 || res?.status === 200) {
                    // localStorage.removeItem('admin')
                    localStorage.setItem('admin', JSON.stringify(res.data))
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.access;
                    originalRequest.headers['Authorization'] = 'Bearer ' + res.data.access;
                    return axios(originalRequest);
                }
            }).catch(err => {
                if((Number(localStorage.getItem('user_type')) === 2)){
                    console.log("2")
                }else{
                    Store.dispatch(ACTIONS.logout_session_admin())
                    history.push('/secure/admin-login')
                }
            })
    }
    return Promise.reject(error);
});
export default authInstace