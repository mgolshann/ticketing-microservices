import { useEffect } from 'react';
import { API } from './_app';

export default () => {

    useEffect(() => {
        // declare the data fetching function
        const fetchData = async () => {
            const response = await API.get('/api/test');
            console.log(response);
        }
      
        // call the function
        fetchData()
    
      }, [])


    return <h1>Loading page ... </h1>
}