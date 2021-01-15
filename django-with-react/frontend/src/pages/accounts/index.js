import React from 'react';
import {Route} from 'react-router-dom';
import Profile from './Profile';
import Login from './Login';
import Signup from './Signup';

function Routes({ match }) {
    return (
        <>
            <Route path={match.url + '/profile'} component={Profile} />
            <Route path={match.url + '/login'} component={Login} />
            <Route path={match.url + '/signup'} component={Signup} />
        </>
    )

}

export default Routes;