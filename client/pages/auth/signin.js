import { useState } from 'react';
import router from 'next/router';
import useRequest from '../../hooks/use-request';

export default () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { doRequest, errors } = useRequest({
        method: 'post',
        url: '/api/users/signin',
        body: {
            email, password
        },
        onSuccess: () => router.push('/')
    });

    const onSubmit = async event => {
        event.preventDefault();

        await doRequest();
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="form-control">
                
                <h1>Sign In</h1>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        className="form-control"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password} 
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                
                <div className="form-group">
                    <button className="btn btn-primary">Sign In</button>
                </div>

                {errors}
            
            </div>
        </form>
    )
}