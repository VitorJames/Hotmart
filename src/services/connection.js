import axios from 'axios';

export default axios.create({
  baseURL: `https://api-sec-vlc.hotmart.com/security/`,
});