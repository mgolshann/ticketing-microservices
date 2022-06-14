import buildClient from '../api/build-client';


const landingPage = ({ currentuser }) => {
    return currentuser ? 'Sign in' : 'Not sign in';
}

landingPage.getInitialProps = async context => {

    const client = buildClient(context);
    const { data } = await client.get('/api/users/currentuser')
    
    return data;
}

export default landingPage;