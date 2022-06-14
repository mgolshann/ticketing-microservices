import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

import Header from '../components/header';
import buildClient from '../api/build-client';
export const API = axios.create({ baseURL: 'http://localhost:3000' });

// we are not talking about page but we are here to wrap a component
// into a page so the arguments that provided to the getIntiailProps 
// function for a page are different than the arguments that send to 
// getInitialProps for a custom component

// Page component          ===> context === { req, res}
// Custom app component    ===> context === { Component: ctx: { req, res}} 

const appComponent = ({ Component, pageProps, currentuser }) => {
    return (
        <div>
            <Header currentuser={currentuser}/>
            <Component {...pageProps} />
        </div>
    );
};

appComponent.getInitialProps = async appContext => {
    
    const client = buildClient(appContext.ctx);
    const { data } = await client.get('/api/users/currentuser');

    let pageProps = {};
    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }
    
    return {
        pageProps,
        ...data
    };

}

export default appComponent;


