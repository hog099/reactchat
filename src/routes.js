import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';

import AuthorApp from './site/auth/authorpainel'
import HomeSite from './site/index'
import HomeClient from './site/chatclient/index'
import Painel from './site/painel/index'

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