import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function Admin() {
    const { user, isAuthenticated ,isLoading} = useAuth0();

    if(isLoading){
        return <h1>Loading...</h1>
    }

    if (!isAuthenticated || !user) {
        return <h1>Unauthorized</h1>;
    }

    return user.email === 'amit.lpatil282006@gmail.com' ? (
        <AdminForm></AdminForm>
    ) : (
        <h1>Unauthorized</h1>
    );
}

export default Admin;
