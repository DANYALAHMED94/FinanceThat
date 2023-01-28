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
        const token = JSON.parse(localStorage.getItem('user')) !== undefined && JSON.parse(localStorage.getItem('user')) !== null ? JSON.parse(localStorage.getItem('user')).access !== null && JSON.parse(localStorage.getItem('user')).access !== undefined ? JSON.parse(localStorage.getItem('user')).access : null : null;
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
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
    if (error?.response?.status === 403 && originalRequest.url ===
        `${API_URL}/api/token/`) {
        history.push('/login');
        return Promise.reject(error);
    }

    if (error?.response?.status === 403 && !originalRequest._retry) {
        console.log(error, 'authInstace')
        originalRequest._retry = true;
        const refreshToken = JSON.parse(localStorage.getItem('user')) !== undefined && JSON.parse(localStorage.getItem('user')) !== null ? JSON.parse(localStorage.getItem('user')).refresh !== null && JSON.parse(localStorage.getItem('user')).refresh !== undefined ? JSON.parse(localStorage.getItem('user')).refresh : null : null;
        console.log('refreshToken', refreshToken)
        return axios.post(`${API_URL}/api/token/refresh/`,
            {
                "refresh": refreshToken
            })
            .then(res => {
                if (res?.status === 201 || res?.status === 200) {
                    // localStorage.removeItem('user')
                    localStorage.setItem('user', JSON.stringify(res?.data))
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + res?.data?.access;
                    originalRequest.headers['Authorization'] = 'Bearer ' + res?.data?.access;
                    return axios(originalRequest);
                }
            }).catch(err => {
                Store.dispatch(ACTIONS.logout_session())
                history.push('/')
            })
    }
    return Promise.reject(error);
});
export default authInstace