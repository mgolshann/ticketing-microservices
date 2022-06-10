import { API } from '../pages/_app';
import { useState } from 'react';

export default ({ url, method, body, onSuccess }) => {

    const [errors, setErrors] = useState(null);
    
    const doRequest = async () => {
        try {
            const response = await API[method](url, body);

            if (onSuccess) {
                onSuccess(response.data)
            }

            return response.data;
        } catch (err) {

            setErrors(
                <div className="alert alert-danger">
                    <label>Ooops ....</label>
                    <ul>
                        {err.response.data.errors.map(error => 
                            <li key={error.message}>{error.message}</li>    
                        )}
                    </ul>
                </div>
            );
            
        }
    }
    
    return { doRequest, errors }
}
