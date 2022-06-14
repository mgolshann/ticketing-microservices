import { useEffect } from 'react';
import router from 'next/router';
import useRequest from '../../hooks/use-request';

export default () => {

    const { doRequest } = useRequest({
        method: 'post',
        url: '/api/users/signout',
        body: {},
        onSuccess: () => router.push('/')
    });

    useEffect(() => {
        doRequest()
    }, []);

    return (
        <div>Signing out ...</div>
    )
}