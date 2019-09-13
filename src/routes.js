import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';

import Auth from './pages/auth/Auth'
import Start from './pages/Index'
import HomeClient from './pages/chatClient/Index'
// import Admin from './pages/app-admin/index'

function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Start} />
            <Route path="/homeClient" exact component={HomeClient} />
            <Route path="/login" exact component={Auth} />
            {/* <Route path="/admin" exact component={Admin} /> */}
            <Redirect from='*' to='/' />
        </Switch>
    );
}

export default Routes;