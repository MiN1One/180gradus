import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { BiChevronRight, BiChevronLeft, BiPalette, BiChevronDown } from 'react-icons/bi';
import ShadowScrollbars from "../../UI/ShadowScrollbars/ShadowScrollbars";

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';

import './Summary.scss';
import vivo from '../../assets/images/Vivo X50.png';
import { Link } from "react-router-dom";

SwiperCore.use([Navigation, Pagination]);

const Summary = () => {
    const { t } = useTranslation();
    const [swiper, setSwiper] = useState(null);

    useEffect(() => {
        if (swiper) swiper.update();
    });

    return (
        <section className="Summary">
            <div className="Summary__left">
                <div className="d-flex fdc w-100">

                    <Swiper
                        className="Summary__images mb-3"
                        navigation={{
                            prevEl: '.btn__control--prev',
                            nextEl: '.btn__control--next',
                            disabledClass: 'btn__control--disabled'
                        }}
                        slidesPerView={1}
                        onSwiper={(sw) => setSwiper(sw)}>
                            <SwiperSlide className="Summary__figure">
                                <LazyLoadImage 
                                    src={vivo}
                                    alt="vivo"
                                    width="100%"
                                    height="100%"
                                    effect="opacity"
                                    className="Summary__img" />
                            </SwiperSlide>
                            <SwiperSlide className="Summary__figure">
                                <LazyLoadImage 
                                    src={vivo}
                                    alt="vivo"
                                    width="100%"
                                    height="100%"
                                    effect="opacity"
                                    className="Summary__img" />
                            </SwiperSlide>
                            <button className="Summary__btn-control btn__control btn__control--prev">
                                <BiChevronLeft className="icon--sm" />
                            </button>
                            <button className="Summary__btn-control btn__control btn__control--prev">
                                <BiChevronRight className="icon--sm" />
                            </button>
                    </Swiper>
                    <div className="flex fdc aic mb-3">
                        <h3 className="heading heading--main mb-15">Black Flowers</h3>
                        <h2 className="heading heading--sm">Vivo X50</h2>
                    </div>
                    <div className="Summary__cards">
                        <ShadowScrollbars className="Summary__wrapper">
                            <div className="Summary__card" tabIndex="0">
                                <div className="flex aic">
                                    <BiPalette className="icon mr-1" />
                                    <div className="flex fdc">
                                        <span className="Summary__card-title">Black flowers</span>
                                        <span className="Summary__card-title--sub">{t('nav.skins')}</span>
                                    </div>
                                </div>
                                <span className="price-tag">$5.99</span>
                            </div>
                            <div className="Summary__card" tabIndex="0">
                                <div className="flex aic">
                                    <BiPalette className="icon mr-1" />
                                    <div className="flex fdc">
                                        <span className="Summary__card-title">Black flowers</span>
                                        <span className="Summary__card-title--sub">{t('nav.skins')}</span>
                                    </div>
                                </div>
                                <span className="price-tag">$5.99</span>
                            </div>
                            <div className="Summary__card" tabIndex="0">
                                <div className="flex aic">
                                    <BiPalette className="icon mr-1" />
                                    <div className="flex fdc">
                                        <span className="Summary__card-title">Black flowers</span>
                                        <span className="Summary__card-title--sub">{t('nav.skins')}</span>
                                    </div>
                                </div>
                                <span className="price-tag">$5.99</span>
                            </div>
                            <div className="Summary__card" tabIndex="0">
                                <div className="flex aic">
                                    <BiPalette className="icon mr-1" />
                                    <div className="flex fdc">
                                        <span className="Summary__card-title">Black flowers</span>
                                        <span className="Summary__card-title--sub">{t('nav.skins')}</span>
                                    </div>
                                </div>
                                <span className="price-tag">$5.99</span>
                            </div>
                            <div className="Summary__card" tabIndex="0">
                                <div className="flex aic">
                                    <BiPalette className="icon mr-1" />
                                    <div className="flex fdc">
                                        <span className="Summary__card-title">Black flowers</span>
                                        <span className="Summary__card-title--sub">{t('nav.skins')}</span>
                                    </div>
                                </div>
                                <span className="price-tag">$5.99</span>
                            </div>
                            <div className="Summary__card" tabIndex="0">
                                <div className="flex aic">
                                    <BiPalette className="icon mr-1" />
                                    <div className="flex fdc">
                                        <span className="Summary__card-title">Rose</span>
                                        <span className="Summary__card-title--sub">{t('nav.skins')}</span>
                                    </div>
                                </div>
                                <span className="price-tag">$7.99</span>
                            </div>
                        </ShadowScrollbars>
                    </div>
                </div>
                <p className="text text--sm w-100 c-grey-l px-15">
                    {t('summary:num of skins')}: 7,<br/> 
                    {t('summary:sets')}: Rose, Black Flowers
                </p>
            </div>
            <div className="Summary__right">
                <div className="Summary__head">
                    <h2 className="heading heading--1 heading--light">{t('nav.summary')}</h2>
                </div>
                <div className="Summary__body">
                    <p className="text text--main mb-lg">
                        All of your data is kept private, your data is not used except for serving purposes. You can read about privacy policy on <Link to="/180degrees/privacy" className="link link--outline">this page.</Link> You can also read about delivery and skinning process <Link to="/180degrees/delivery" className="link link--outline">here.</Link><br/>
                        You can specify your location by sending your geolocation via <a href="https://www.t.me/he_go_bot" className="link link--outline">telegram</a> or input your address in the field provided.
                    </p>
                    <p className="text text--main c-red mb-15">Fill out all of the fields</p>
                    <form className="Summary__form">
                        <div className="flex fdc wh-auto">
                            <label className="input--label">{t('input:enter your name')}</label>
                            <input className="input input--main" placeholder={t('input:first name')} />
                        </div>
                        <div className="flex fdc wh-auto">
                            <label className="input--label">{t('input:enter your last name')}</label>
                            <input className="input input--main" placeholder={t('input:last name')} />
                        </div>
                        <div className="flex fdc wh-auto pos-rel">
                            <label className="input--label">{t('input:choose location method')}</label>
                            <div className="Summary__input input input--main" tabIndex="0">
                                {t('input:location method')}
                                <BiChevronDown className="icon icon--dark" />
                            </div>
                            <div className="Summary__dropdown">
                                <div className="Summary__drop-item" tabIndex="0">{t('input:telegram geo')}</div>
                                <div className="Summary__drop-item" tabIndex="0">{t('input:input online')}</div>
                            </div>
                        </div>
                        <div className="flex fdc wh-auto">
                            <label className="input--label">{t('input:enter delivery address')}</label>
                            <input className="input input--main" placeholder={t('input:address')} />
                        </div>
                        <div className="flex fdc wh-auto">
                            <label className="input--label">{t('input:Telegram geolocation')}</label>
                            <a 
                                href="https://www.t.me/he_go_bot"
                                className="Summary__input input input--main"
                                target="_blank"
                                rel="noopener noreferrer">
                                    {t('input:telegram bot')}
                                <BiChevronRight className="icon icon--dark" />
                            </a>
                        </div>
                        <div className="flex fdc wh-auto">
                            <label className="input--label">{t('input:enter contact number')}</label>
                            <input className="input input--main" placeholder={t('input:number')} />
                        </div>
                        <div className="flex fdc wh-auto">
                            <label className="input--label">{t('input:enter email')}</label>
                            <input className="input input--main" placeholder={t('input:email')} />
                        </div>
                    </form>
                </div>
                <div className="Summary__footer">
                    <div className="flex aic">
                        <span className="text text--main flex mr-5">{t('input:total')}:&nbsp;</span>
                        <span className="Summary__price-tag price-tag mr-1">$37.98</span>
                        <button className="btn btn__ghost btn__ghost--active Summary__btn">
                            {t('main.order')}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default React.memo(Summary);