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

function App({ error, onError, onSetMedia, media }) {
    const { i18n } = useTranslation();
    const [mounted, setMounted] = useState(false);

    const mediaMid = window.matchMedia('(max-width: 59.375em)');

    const watchMedia = (media, bp) => {
        if (media.matches) onSetMedia(bp, true);
        else onSetMedia(bp, false);
    };

    if (!mounted) {
        mediaMid.onchange = () => watchMedia(mediaMid, 'mid');

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
            (req) => req,
            (er) => {
                console.log('req error' + er);
                onError(er.message);
                Promise.reject(er);
            }
        );
    
        const responseInterceptor = axiosInstance.interceptors.response.use(
            (res) => res,
            (er) => {
                console.log('res error' + er);
                onError(er.message);
                Promise.reject(er);
            }
        );
        return () => {
            axiosInstance.interceptors.request.eject(requestInterceptor);
            axiosInstance.interceptors.response.eject(responseInterceptor);
        }
    }, [onError]);

    const main = (
        <Layout>
            <AsyncMain />
        </Layout>
    );

    const mobileHeader = (
        <Layout>
            <AsyncHeaderMobile />
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
            <AsyncSummary er={error} />
        </Layout>
    );

    return (
        <React.Suspense fallback={<Spinner />}>
            <ErrorBoundary onError={onError}>
                {error
                    ? <Er er={error} clean={() => onError(null)} />
                    : <Switch>
                        <Route path="/summary" exact>{summary}</Route>
                        <Route path="/categories/:category/:id" exact>{main}</Route>
                        <Route path="/categories" exact>{categories}</Route>
                        <Route path="/categories/:category" exact>{categories}</Route>
                        <Route path="/180degrees/:category" exact>{info}</Route>
                        <Route path="/" exact>
                            {!media.mid
                                ? <AsyncHeader />
                                : mobileHeader
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
    error: state.error,
    media: state.media
});

const dispatch = dispatch => ({
    onError: (er) => dispatch(actions.error(er)),
    onSetMedia: (bp, val) => dispatch(actions.setMedia(bp, val))
});

export default connect(state, dispatch)(App);