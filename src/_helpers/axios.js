import axios from "axios";
import { API_URL } from '../constant'
// Alter defaults after instance has been created
const simpleAxios = axios.create({
    baseURL: API_URL
});

export default simpleAxios