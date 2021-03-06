import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import axios from 'axios';

// import MonitorScroll from '../../UI/MonitorScroll/MonitorScroll';
import './Header.scss';
import Navigation from '../../components/Navigation/Navigation';
import logo from '../../assets/logo.png';
import Footer from '../../components/Footer/Footer';
import Spinner from '../../UI/Spinner/Spinner';

const container = window.innerHeight * 8;

const Header = () => {
    const { t } = useTranslation();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios('/data/home.json')
            .then(({ data }) => {
                setData(data);
                setLoading(false);
            });
    }, []);

    const [transformUp, setTransformUp] = useState(0);
    const [viewOne, setViewOne] = useState(0);
    const [viewTwo, setViewTwo] = useState(0);
    const [viewThree, setViewThree] = useState(0);
    const [viewFour, setViewFour] = useState(0);

    const [hideElements, setHideElements] = useState(false);

    const onScroll = useCallback(() => {
        const inHeight = window.innerHeight;
        const scrollTop = document.documentElement.scrollTop;

        // #### 1st BLOCK ####
        if (scrollTop <= inHeight) {
            // Increase the - height @657 < ...
            setViewOne(scrollTop);

            // Fix delay
            setTransformUp(0);
        } 
        else setViewOne(inHeight);
        
        // If passed block #1
        if (scrollTop > inHeight) {
            // #### 2nd BLOCK ####
            // Scroll from 1 to 2
            if (scrollTop <= (inHeight * 2)) setTransformUp(scrollTop - inHeight);

            if (scrollTop >= (inHeight * 2)) {
                // Stop at 2 - @1300 < ...
                setTransformUp(inHeight);
                
                // Increase the height
                if (scrollTop <= inHeight * 3) setViewTwo(scrollTop - (inHeight * 2));
                else setViewTwo(inHeight);
            }

            // #### 3rd BLOCK ####
            if (scrollTop >= (inHeight * 3)) {
                // Scroll from 2 to 3 - @1900 < ...
                setTransformUp(scrollTop - (inHeight * 2));
                
                if (scrollTop >= (inHeight * 4)) {
                    // Stop at 3
                    setTransformUp(inHeight * 2);

                    // Increase the height
                    if (scrollTop >= (inHeight * 4) && scrollTop < (inHeight * 5)) setViewThree(scrollTop - (inHeight * 4));
                    else setViewThree(inHeight)
                }
            }

            // #### 4th block ####
            // @3285 < ...
            if (scrollTop >= (inHeight * 5)) {
                setTransformUp(scrollTop - (inHeight * 3));
                
                if (scrollTop >= (inHeight * 6)) {
                    // Stop at 4 @3942 < ...
                    setTransformUp(inHeight * 3);

                    // Increase height
                    if (scrollTop <= (inHeight * 7)) setViewFour(scrollTop - (inHeight * 6));
                    else setViewFour(inHeight);
                }

                if (scrollTop >= (inHeight * 7)) setTransformUp(scrollTop - (inHeight * 4));
            }
        }

        // #### Fix transform delay ####
        if (scrollTop === 0) {
            setTransformUp(0);
            setViewOne(0);
            setViewTwo(0);
            setViewThree(0);
            setViewFour(0);
        }

        if (scrollTop > 0) setHideElements(true);
        else setHideElements(false);
    }, []);

    useEffect(() => {
        document.addEventListener('scroll', onScroll);
        return () => document.removeEventListener('scroll', onScroll);
    }, [onScroll]);

    const jumboClass = ['Header__jumbotron'];
    const poppercaseClass = ['Header__poppercase'];
    if (hideElements) {
        jumboClass.push('Header__jumbotron--slideBack');
        poppercaseClass.push('Header__poppercase--expand');
    }

    if (loading || !data)
        return <Spinner />;

    return (
        <>
            {/* <MonitorScroll info={{
                backContainer: container,
                topFirst: viewOne,
                topSecond: viewTwo,
                topThird: viewThree,
                topFourth: viewFour,
                transform: transformUp
            }} /> */}
            <Navigation className={hideElements && 'Navigation--hide'} />
            <div style={{height: container + 'px'}} id="heightContainer"></div>
            <div style={{top: -transformUp + 'px'}} id="wrapper"> 
                <header className="Header">
                    <section className="Header__section">
                        <div className={jumboClass.join(' ')}>
                            <div className="Header__bg">
                            </div>
                            <div className="Header__hero">
                                <div className="Header__logobox">
                                    <figure className="Header__fig">
                                        <img src={logo} alt="180sub" width="100%" height="auto"/>
                                    </figure>
                                </div>
                                <div className="Header__textbox">
                                    <h1 className="Header__heading fdc flex">
                                        {t('main.hero text.p1')}
                                        <span className="Header__heading--sub">{t('main.hero text.p2')}</span>
                                    </h1>
                                    <div className="flex">
                                        <Link to="/categories/skins" className="Header__btn btn btn__primary mr-15">{t('main.explore')}</Link>
                                        <Link to="/180degrees/about" href="/" className="Header__btn btn btn__secondary btn__secondary--fill">{t('nav.about')}</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={poppercaseClass.join(' ')}>
                            <div 
                                className="Header__popper"
                                style={{ backgroundImage: `url(/images/home/${data[0].popper})` }} />
                            <div
                                className="Header__popperbg" 
                                style={{
                                    backgroundImage: `url(/images/home/${data[0].cover})`,
                                    height: `${viewOne}px`,
                                    opacity: `${viewOne / window.innerHeight}`
                                }} />
                            <div className="Header__popper-text">
                                <h2 className="Header__heading--secondary">
                                    {data[0].text.main}
                                    <p className="Header__heading--sub">{data[0].text.sub}</p>
                                </h2>
                            </div>
                        </div>
                    </section>
                    <section className="Header__section">
                        <div className={poppercaseClass.join(' ')}>
                            <div
                                style={{ backgroundImage: `url(/images/home/${data[1].popper})` }} 
                                className="Header__popper" />
                            <div 
                                className="Header__popperbg" 
                                style={{
                                    backgroundImage: `url(/images/home/${data[1].cover})`,
                                    height: `${viewTwo}px`,
                                    opacity: `${viewTwo / window.innerHeight}`
                                }} />
                            <div className="Header__popper-text">
                                <h2 className="Header__heading--secondary">
                                    {data[1].text.main}
                                    <p className="Header__heading--sub">{data[1].text.sub}</p>
                                </h2>
                            </div>
                        </div>
                    </section>
                    <section className="Header__section">
                        <div className={poppercaseClass.join(' ')}>
                            <div
                                style={{ backgroundImage: `url(/images/home/${data[2].popper})` }} 
                                className="Header__popper" />
                            <div 
                                className="Header__popperbg" 
                                style={{
                                    backgroundImage: `url(/images/home/${data[2].cover})`,
                                    height: `${viewThree}px`,
                                    opacity: `${viewThree / window.innerHeight}`
                                }} />
                            <div className="Header__popper-text">
                                <h2 className="Header__heading--secondary">
                                    {data[2].text.main}
                                    <p className="Header__heading--sub">{data[2].text.sub}</p>
                                </h2>
                            </div>
                        </div>
                    </section>
                    <section className="Header__section">
                        <div className={poppercaseClass.join(' ')}>
                            <div
                                style={{ backgroundImage: `url(/images/home/${data[3].popper})` }} 
                                className="Header__popper" />
                            <div 
                                className="Header__popperbg" 
                                style={{
                                    backgroundImage: `url(/images/home/${data[3].cover})`,
                                    height: `${viewFour}px`,
                                    opacity: `${viewFour / window.innerHeight}`
                                }} />
                            <div className="Header__popper-text">
                                <h2 className="Header__heading--secondary">
                                    {data[3].text.main}
                                    <p className="Header__heading--sub">{data[3].text.sub}</p>
                                </h2>
                            </div>
                        </div>
                    </section>
                </header>
            </div>
            <LazyLoadComponent>
                <Footer />
            </LazyLoadComponent>
        </>
    );
}

export default React.memo(Header);