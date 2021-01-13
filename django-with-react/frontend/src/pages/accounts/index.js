import React from 'react';
import {Route} from 'react-router-dom';
import Profile from './Profile';
import Login from './Login';

function Routes({ match }) {
    return (
        <>
            <Route path={match.url + '/profile'} component={Profile} />
            <Route path={match.url + '/login'} component={Login} />
        </>
    )

}

export default Routes;