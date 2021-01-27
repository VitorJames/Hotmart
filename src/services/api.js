import axios from 'axios';

export default axios.create({
  baseURL: `https://api-hot-connect.hotmart.com/`,
});