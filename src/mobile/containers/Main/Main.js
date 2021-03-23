import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Scrollbar } from 'swiper';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { connect } from 'react-redux';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

import * as actions from '../../../store/actions';
import vivo from '../../../assets/images/Vivo X50.png';
import './Main.scss';
import axiosInstance from '../../../axios';

SwiperCore.use([Navigation, Scrollbar]);

const Main = (props) => {
    const { t } = useTranslation();
    const params = useParams();
    const history = useHistory();
    const [selectedSkin, setSelectedSkin] = useState(null);
    const [skinImg, setSkinImg] = useState(null);
    const [data, setData] = useState(null); 

    const mounted = useRef();
    useEffect(() => {
        mounted.current = true;
        return () => mounted.current = false;
    }, []);

    useEffect(() => {
        if (mounted.current) {
            axiosInstance(`/skins/${params.category}/${params.id}`)
                .then((res) => {
                    setData(res.data);
                    setSkinImg('img');
                    console.log(res);
                });
        }
    }, [params.category, params.id]);

    const onSelectSkin = (skinId) => {
        if (!mounted.current) return null;
        axiosInstance(`/skins/${params.category}/${params.id}/${skinId}`)
            .then(res => {
                setSkinImg(res);
            });
        setSelectedSkin(skinId);
    };

    return (
        <section className="m-main">
            <div className="main-head">
                <div className="container">
                    <div className="flex aic">
                        <button className="btn btn__square mr-2" onClick={() => history.push(`/categories/${params.category}`)}>
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
                    <div className="container flex aic jcc fdc">
                        <figure className="m-main__figure">
                            <img className="img" src={vivo} alt="vivo" />
                        </figure>
                        {selectedSkin && <span className="m-main__title text text--mid">Black flowers</span>}
                    </div>
                </div>
                <div className="m-main__bottom">
                    <div className="container">
                        <div className="flex mb-15 aic">
                            <h5 className="heading heading--sm c-white mr-1">{t('sets.black flowers')}</h5>
                            <span className="mr-1 c-light">&bull;</span>
                            <span className="heading heading--sub c-light">{t('sets.basic')}</span>
                        </div>
                        <Swiper
                            className="m-main__list"
                            navigation={{
                                nextEl: '.btn__control--next',
                                prevEl: '.btn__control--prev',
                                disabledClass: 'btn__control--disabled'
                            }}
                            slidesPerView={5}
                            spaceBetween={15}
                            breakpoints={{
                                // min-width
                                200: { slidesPerView: 2 },
                                350: { slidesPerView: 3 },
                                400: { slidesPerView: 4 },
                                500: { slidesPerView: 5 },
                                600: { slidesPerView: 6 },
                                700: { slidesPerView: 7 },
                            }}>
                                <button className="btn__control btn__control--prev">
                                    <BiChevronLeft className="icon--sm" />
                                </button>
                                <button className="btn__control btn__control--next">
                                    <BiChevronRight className="icon--sm" />
                                </button>
                                <SwiperSlide className="m-main__sets-item" onClick={() => onSelectSkin('01')}>
                                    
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

const state = (state) => ({
    favorites: state.favorites
});

const dispatch = dispatch => ({
    onAddToFav: (id) => dispatch(actions.addToFavorites(id)),
    onAddToCart: (id) => dispatch(actions.addToCart(id))
});

export default connect(state, dispatch)(React.memo(Main));