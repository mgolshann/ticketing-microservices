import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

export const API = axios.create({ baseURL: 'http://localhost:3000' });

export default ({ Component, pageProps }) => {
    return <Component {...pageProps} />
};