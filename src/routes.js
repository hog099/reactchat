import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';

// import Auth from './pages/auth/auth'
import Start from './pages/Index'
// import Admin from './pages/app-admin/index'

function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Start} />
            {/* <Route path="/login" exact component={Auth} /> */}
            {/* <Route path="/admin" exact component={Admin} /> */}
            <Redirect from='*' to='/' />
        </Switch>
    );
}

export default Routes;