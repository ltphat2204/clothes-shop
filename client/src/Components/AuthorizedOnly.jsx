import { useContext, Fragment, useEffect } from 'react';
import { UserContext } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function AuthorizedOnly(){
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    useEffect(()=>{
        if (!user || user.role === "customer") navigate('/signin');
    }, [user]);

    return (
        <Fragment>
        </Fragment>
    );
}