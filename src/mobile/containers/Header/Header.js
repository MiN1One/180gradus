import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, EffectFade, Mousewheel } from 'swiper';
import axios from 'axios';

import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/effect-fade/effect-fade.scss';

import './Header.scss';
import logo from '../../../assets/logo.png';
import Navigation from "../../components/Navigation/Navigation";
import { Link } from "react-router-dom";
import Spinner from "../../../UI/Spinner/Spinner";

SwiperCore.use([Pagination, EffectFade, Mousewheel]);

const Header = () => {
    const { t } = useTranslation();
    const [swiper, setSwiper] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => swiper && swiper.update());

    useEffect(() => {
        setLoading(true);
        axios('/data/home.json')
            .then(({ data }) => {
                setLoading(false);
                setData(data);
            });
    }, []);

    if (loading || !data)
        return <Spinner />;

    return (
        <>
            <Navigation />
            <header className="m-header">
                <Swiper
                    className="m-header__list"
                    effect="fade"
                    fadeEffect={{ crossFade: true }}
                    direction="vertical"
                    onInit={(sw) => setSwiper(sw)}
                    mousewheel={true}>
                        <SwiperSlide className="m-header__section">
                            <div className="m-header__jumbo">
                                <div className="container">
                                    <figure className="m-header__figure">
                                        <img className="img" src={logo} alt="180logo" />
                                    </figure>
                                    <div className="mb-1">
                                        <h1 className="m-header__heading">
                                            {t('main.hero text.p1')}
                                        </h1>
                                        <h2 className="m-header__heading--sub">
                                            {t('main.hero text.p2')}
                                        </h2>
                                    </div>
                                    <div className="flex">
                                        <Link to="/categories/skins" className="btn btn__primary mr-15">
                                            {t('main.explore')}
                                        </Link>
                                        <Link to="/180degrees/about" className="btn btn__secondary">
                                            {t('nav.about')}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="m-header__section" style={{
                            backgroundImage: `url(/images/home/${data[0].popper})` 
                        }}>
                            <div className="m-header__hero">
                                <h2 className="m-header__heading--secondary">
                                    {data[0].text.main}
                                </h2>
                                <p className="m-header__heading--sub">{data[0].text.sub}</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="m-header__section" style={{
                            backgroundImage: `url(/images/home/${data[0].cover})` 
                        }}>
                            {/* <div className="m-header__hero">
                                <h2 className="m-header__heading--secondary">
                                    Maximum Wear
                                </h2>
                                <p className="m-header__heading--sub">{data[0].text.sub}</p>
                            </div> */}
                        </SwiperSlide>
                        <SwiperSlide className="m-header__section" style={{
                            backgroundImage: `url(/images/home/${data[1].popper})` 
                        }}>
                            <div className="m-header__hero">
                                <h2 className="m-header__heading--secondary">
                                    {data[1].text.main}
                                </h2>
                                <p className="m-header__heading--sub">{data[1].text.sub}</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="m-header__section" style={{
                            backgroundImage: `url(/images/home/${data[1].cover})` 
                        }}>
                            {/* <div className="m-header__hero">
                                <h2 className="m-header__heading--secondary">
                                    Protective material
                                </h2>
                                <p className="m-header__heading--sub">{data[0].text.sub}</p>
                            </div> */}
                        </SwiperSlide>
                        <SwiperSlide className="m-header__section" style={{
                            backgroundImage: `url(/images/home/${data[2].popper})` 
                        }}>
                            <div className="m-header__hero">
                                <h2 className="m-header__heading--secondary">
                                    {data[2].text.main}
                                </h2>
                                <p className="m-header__heading--sub">{data[2].text.sub}</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="m-header__section" style={{
                            backgroundImage: `url(/images/home/${data[2].cover})` 
                        }}>
                            {/* <div className="m-header__hero">
                                <h2 className="m-header__heading--secondary">
                                    Super accurate cut
                                </h2>
                                <p className="m-header__heading--sub">{data[0].text.sub}</p>
                            </div> */}
                        </SwiperSlide>
                        <SwiperSlide className="m-header__section" style={{
                            backgroundImage: `url(/images/home/${data[3].popper})` 
                        }}>
                            <div className="m-header__hero">
                                <h2 className="m-header__heading--secondary"> 
                                    {data[3].text.main}
                                </h2>
                                <p className="m-header__heading--sub">{data[3].text.sub}</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="m-header__section" style={{
                            backgroundImage: `url(/images/home/${data[3].cover})` 
                        }}>
                            {/* <div className="m-header__hero">
                                <h2 className="m-header__heading--secondary">
                                    Rich skin set
                                </h2>
                                <p className="m-header__heading--sub">{data[0].text.sub}</p>
                            </div> */}
                        </SwiperSlide>
                </Swiper>
            </header>
        </>
    );
};  

export default React.memo(Header);