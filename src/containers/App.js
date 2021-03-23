import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import axiosInstance from '../axios';
import ErrorBoundary from '../hoc/ErrorBoundary';
import * as actions from '../store/actions';
import Spinner from '../UI/Spinner/Spinner';
import Er from './Error/Error';
import Layout from './Layout/Layout';

const AsyncMain = React.lazy(() => import('./Main/Main'));
const AsyncCategories = React.lazy(() => import('./Categories/Categories'));
const AsyncInfo = React.lazy(() => import('./Info/Info'));
const AsyncSummary = React.lazy(() => import('./Summary/Summary'));
const AsyncHeader = React.lazy(() => import('./Header/Header'));
const AsyncHeaderMobile = React.lazy(() => import('../mobile/containers/Header/Header'));
const AsyncMainMobile = React.lazy(() => import('../mobile/containers/Main/Main'));

function App({ onSetMedia, media }) {
    const { i18n } = useTranslation();
    const [mounted, setMounted] = useState(false);
    const [error, setError] = useState(null);

    const mediaMid = window.matchMedia('(max-width: 59.375em)');
    const mediaSm = window.matchMedia('(max-width: 48em)');

    const watchMedia = (media, bp) => {
        if (media.matches) onSetMedia(bp, true);
        else onSetMedia(bp, false);
    };

    if (!mounted) {
        mediaMid.onchange = () => watchMedia(mediaMid, 'mid');
        mediaSm.onchange = () => watchMedia(mediaSm, 'sm');

        watchMedia(mediaSm, 'sm');
        watchMedia(mediaMid, 'mid');
    }

    useEffect(() => setMounted(true), []);

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
    
    useEffect(() => {
        const requestInterceptor = axiosInstance.interceptors.request.use(
            (req) => {
                req.headers.language = i18n.language;
                console.log(req);
                return req;
            },
            (er) => {
                console.log('req error' + er);
                setError(er.message);
                return Promise.reject(er);
            }
        );
    
        const responseInterceptor = axiosInstance.interceptors.response.use(
            (res) => {
                console.log(res);
                return res;
            },
            (er) => {
                console.log('res error' + er);
                setError(er.message);
                return Promise.reject(er);
            }
        );

        return () => {
            axiosInstance.interceptors.request.eject(requestInterceptor);
            axiosInstance.interceptors.response.eject(responseInterceptor);
        }
    }, []);

    const main = (
        <Layout>
            {media.sm
                ? <AsyncMainMobile er={error} />
                : <AsyncMain />
            }
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

    return (
        <React.Suspense fallback={<Spinner />}>
            <ErrorBoundary onError={setError}>
                {error
                    ? <Er er={error} clean={() => setError(null)} />
                    : <Switch>
                        <Route path="/summary" exact>{summary}</Route>
                        <Route path="/categories/:category/:id" exact>{main}</Route>
                        <Route path="/categories" exact>{categories}</Route>
                        <Route path="/categories/:category" exact>{categories}</Route>
                        <Route path="/180degrees/:category" exact>{info}</Route>
                        <Route path="/" exact>
                            {!media.mid
                                ? <AsyncHeader />
                                : <AsyncHeaderMobile />
                            }
                        </Route>
                        <Route><Er notFound /></Route>
                    </Switch>
                }
                {/* <Spinner /> */}
            </ErrorBoundary>
        </React.Suspense>
    );
}

const state = state => ({
    media: state.media
});

const dispatch = dispatch => ({
    onSetMedia: (bp, val) => dispatch(actions.setMedia(bp, val))
});

export default connect(state, dispatch)(App);