import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-mysandwich.firebaseio.com/'
});
export default instance