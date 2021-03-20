import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, EffectFade, Mousewheel } from 'swiper';

import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/effect-fade/effect-fade.scss';

import './Header.scss';

SwiperCore.use([Pagination, EffectFade, Mousewheel]);

const Header = () => {
    const { t } = useTranslation();
    const [swiper, setSwiper] = useState(null);
    const [reachEnd, setReachEnd] = useState(false);

    useEffect(() => {
        if (swiper) swiper.update();
    });

    return (
        <header className="m-header">
            <Swiper
                className="m-header__list"
                effect="fade"
                fadeEffect={{ crossFade: true }}
                direction="vertical"
                onInit={(sw) => setSwiper(sw)}
                onReachEnd={() => setReachEnd(true)}
                mousewheel={true}>
                    <SwiperSlide className="m-header__section">
                        <div className="m-header__jumbo">
                            <h1 className="m-header__heading">
                                Reacreate you phone
                                <span className="m-header__heading--sub">
                                    Best choice for you and your device
                                </span>
                            </h1>
                            <div className="flex">
                                <button className="btn btn__primary mr-15">
                                    {t('main.customize')}
                                </button>
                                <button className="btn btn__secondary">
                                    {t('main.sign up')}
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="m-header__section">
                        <div className="m-header__hero">
                            Hehe boay
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="m-header__section">
                        <div className="m-header__hero">
                            Hehe boay
                        </div>
                    </SwiperSlide>
            </Swiper>
        </header>
    );
};  

export default React.memo(Header);