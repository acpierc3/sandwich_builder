import { useState, useEffect } from 'react';

export default httpClient => {

    const [error, setError] = useState(null);

    // since we are changing to a functional component, can remove componentwillmount because this code will run before JSX code is rendered
    // componentWillMount () {
    const reqInterceptor = httpClient.interceptors.request.use(req => {             //used to set error state to null if there are no errors
        setError(null);
        return req;
    });
    const resInterceptor = httpClient.interceptors.response.use(res => res, err => {     //record error if there is one
        setError(err);
    });
    // }

    //removes interceptors when component is no longer mounted so that a bunch of interceptors dont exist after mounting/unmounting multiple components
    useEffect(() => {
        
        //return in useEffect() hook is the "cleanup" function
        return () => {
            httpClient.interceptors.request.eject(reqInterceptor);
            httpClient.interceptors.response.eject(resInterceptor);
        };
    }, [reqInterceptor, resInterceptor])            
        

    const errorConfirmedHandler = () => {
        setError(null);
    }

    return [error, errorConfirmedHandler];
}