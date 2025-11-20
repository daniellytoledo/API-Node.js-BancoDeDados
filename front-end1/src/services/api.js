import axios from "axios";

const api = axios.create({
    baseURL: 'https://api-node-js-express-react.onrender.com/'
})

export default api