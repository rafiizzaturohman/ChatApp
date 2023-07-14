import axios from 'axios';
import { Fragment } from 'react';
import { Navigate } from 'react-router-dom';

export const request = axios.create({
    baseURL: 'http://192.168.1.78:3000/',
    timeout: 1000,
    headers: {
        Authorization: JSON.parse(localStorage.getItem('user'))?.token ? `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}` : null
    }
});

export const IsLoggedIn = () => {
    const session = JSON.parse(localStorage.getItem('user'))
    return (
        <Fragment>
            {!session && (
                <Navigate to='/' replace={true} />
            )}
        </Fragment>
    )
}