import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';

import AuthorApp from './pages/auth/authorpainel'
import HomeSite from './pages/index'
import HomeClient from './pages/chatclient/index'
import Painel from './pages/painel/index'

function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={HomeSite} />
            <Route path="/homeClient" exact component={HomeClient} />
            <Route path="/login" exact component={AuthorApp} />
            <Route path="/painel" exact component={Painel} />
            <Redirect from='*' to='/' />
        </Switch>
    );
}

export default Routes;