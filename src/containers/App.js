import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './Header/Header';
import Layout from './Layout/Layout';

const AsyncMain = React.lazy(() => import('./Main/Main'));
const AsyncCategories = React.lazy(() => import('./Categories/Categories'));

function App(props) {

    const main = (
        <Layout>
            <AsyncMain />
        </Layout>
    );

    const categories = (
        <Layout>
            <AsyncCategories />
        </Layout>
    );

    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <Switch>
                <Route path="/categories/:category/:id" exact>{main}</Route>
                <Route path="/categories/:category" exact>{categories}</Route>
                <Route path="/" exact><Header /></Route>
                <Route>
                    <div>404 not found</div>
                </Route>
            </Switch>
        </React.Suspense>
    );
}

export default App;