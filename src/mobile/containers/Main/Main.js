import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Scrollbar } from 'swiper';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

import vivo from '../../../assets/images/Vivo X50.png';
import './Main.scss';
import axiosInstance from '../../../axios';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

SwiperCore.use([Navigation, Scrollbar]);

const Main = (props) => {
    const { t } = useTranslation();
    const params = useParams();
    const [selectedSkin, setSelectedSkin] = useState(null);
    const [data, setData] = useState(null);

    const mounted = useRef();
    useEffect(() => {
        mounted.current = true;
        return () => mounted.current = false;
    }, []);

    useEffect(() => {
        if (mounted.current) {
            axiosInstance(`/skins/${params.category}/${params.id}?skin=${selectedSkin || 'default'}`)
                .then((res) => {
                    if (props.error) return null;
                    setData(res.data);
                    console.log(res);
                });
        }
    }, [selectedSkin, params.category, params.id]);

    return (
        <section className="m-main">
            <div className="main-head">
                <div className="container">
                    <div className="flex aic">
                        <button className="btn btn__square mr-2">
                            <BiChevronLeft className="icon--lg icon--dark" />
                        </button>
                        <h2 className="heading heading--1 heading--black">
                            {params.category} ~ {params.id}
                        </h2>
                    </div>
                </div>
            </div>
            <div className="m-main__body">
                <div className="m-main__top">
                    <div className="container flex aic jcc">
                        <figure className="m-main__figure">
                            <img className="img" src={vivo} alt="vivo" />
                        </figure>
                    </div>
                </div>
                <div className="m-main__bottom">
                    <div className="container w-100">
                        <Swiper
                            className="m-main__list"
                            navigation={{
                                nextEl: '.btn__control--next',
                                prevEl: '.btn__control--prev',
                                disabledClass: 'btn__control--disabled'
                            }}
                            slidesPerView={5}
                            breakpoints={{

                            }}>
                                <button className="btn__control btn__control--prev">
                                    <BiChevronLeft className="icon--sm" />
                                </button>
                                <button className="btn__control btn__control--next">
                                    <BiChevronRight className="icon--sm" />
                                </button>
                                <SwiperSlide className="m-main__sets-item">
                                    
                                </SwiperSlide>
                                <SwiperSlide className="m-main__sets-item">
                                    
                                </SwiperSlide>
                                <SwiperSlide className="m-main__sets-item">
                                    
                                </SwiperSlide>
                                <SwiperSlide className="m-main__sets-item">
                                    
                                </SwiperSlide>
                                <SwiperSlide className="m-main__sets-item">
                                    
                                </SwiperSlide>
                                <SwiperSlide className="m-main__sets-item">
                                    
                                </SwiperSlide>
                                <SwiperSlide className="m-main__sets-item">
                                    
                                </SwiperSlide>
                                <SwiperSlide className="m-main__sets-item">
                                    
                                </SwiperSlide>
                                <SwiperSlide className="m-main__sets-item">
                                    
                                </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default React.memo(Main);