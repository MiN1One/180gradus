import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Switch } from 'react-router-dom';

import Header from './Header/Header';
import Layout from './Layout/Layout';

const AsyncMain = React.lazy(() => import('./Main/Main'));
const AsyncCategories = React.lazy(() => import('./Categories/Categories'));
const AsyncInfo = React.lazy(() => import('./Info/Info'));
const AsyncSummary = React.lazy(() => import('./Summary/Summary'));

function App() {
    const { i18n } = useTranslation();

    useEffect(() => {
        const link = document.createElement('link');
        let body = document.getElementsByTagName('body')[0];
        link.rel = 'stylesheet';
        
        if (i18n.language === 'ru') {
            link.href = 'https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet';
            // link.href = 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap';
            
            body.style.fontFamily = '"Rubik", sans-serif';
            // body.style.fontFamily = '"IBM Plex Sans", sans-serif';
        } else if (i18n.language === 'en' || i18n.language === 'uz') {
            link.href = 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap';
            
            body.style.fontFamily = '"Poppins", sans-serif';
        }
        document.getElementsByTagName('head')[0].appendChild(link);
    }, [i18n.language]);

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

    const info = (
        <Layout>
            <AsyncInfo />
        </Layout>
    );

    const summary = (
        <Layout>
            <AsyncSummary />
        </Layout>
    );

    // const Success = (
        
    // );

    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <Switch>
                <Route path="/summary" exact>{summary}</Route>
                <Route path="/categories/:category/:id" exact>{main}</Route>
                <Route path="/categories/:category" exact>{categories}</Route>
                <Route path="/180degrees/:category" exact>{info}</Route>
                <Route path="/" exact><Header /></Route>
                <Route>
                    <div>404 not found</div>
                </Route>
            </Switch>
        </React.Suspense>
    );
}

export default App;