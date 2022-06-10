import { useState } from 'react';
import { API } from '../_app';


export default () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(null);

    const onSubmit = async event => {
        event.preventDefault();

        try {
            await API.post('/api/users/signup', {
                email, password
            });
        } catch (err) {
            setErrors(err.response.data.errors)
            // console.log(err.response.data.errors)
        }

    }

    return (
        <form onSubmit={onSubmit}>
            
            <h1>Sign Up</h1>
            
            <div className="form-group">
                <label>Email Address</label>
                <input 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    className="form-control" />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    type="password" className="form-control" />
            </div>

            <button className="btn btn-primary">Sign Up</button>

            {errors !== null && (
                <div className="form-group">
                    <div className="alert alert-danger">
                    <label>Ooops ....</label>
                    <ul>
                        {errors.map(error => 
                            <li>{error.message}</li>    
                        )}
                        </ul>
                    </div>
                </div>
            )}

        </form>
    )
}