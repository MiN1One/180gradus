import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Scrollbar } from 'swiper';
import { BiCart, BiChevronLeft, BiChevronRight, BiX } from 'react-icons/bi';
import { connect } from 'react-redux';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

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

    const isFavorite = selectedSkin && props.favorites.findIndex(el => el === selectedSkin) !== -1;

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
                        {selectedSkin && 
                            <div className="flex fdc aic">
                                <span className="m-main__title text text--mid mb-1">Black flowers</span>
                                <div className="flex">
                                    <button  
                                        className="btn btn__ghost btn__ghost--active mr-1"
                                        onClick={() => setSelectedSkin(null)}>
                                            <BiX className="icon" />
                                    </button>
                                    <button 
                                        className="btn btn__ghost btn__ghost--active"
                                        onClick={() => props.onAddToFav(selectedSkin)}>
                                            {isFavorite
                                                ? <AiFillStar className="icon" />
                                                : <AiOutlineStar className="icon" />
                                            }
                                    </button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className="m-main__bottom">
                    <div className="container">
                        <div className="flex mb-15 aic">
                            <h5 className="heading heading--sm c-white mr-1">{t('sets.black flowers')}</h5>
                            <span className="mr-1 c-light">&bull;</span>
                            <span className="heading heading--sub c-light">{t('sets.basic')}</span>
                        </div>
                        <div className="pos-rel w-100">
                            <button className="btn__control m-main__control--left btn__control--prev">
                                <BiChevronLeft className="icon--sm" />
                            </button>
                            <button className="btn__control m-main__control--right btn__control--next">
                                <BiChevronRight className="icon--sm" />
                            </button>
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
                                    <SwiperSlide className={`m-main__sets-item ${selectedSkin ? 'm-main__sets-item--active' : ''}`} onClick={() => onSelectSkin('01')}>
                                        
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
                <div className="m-main__summary">
                    <div className="container">
                        <div className="flex jce">
                            <div className="flex">
                                {selectedSkin && <span className="price-tag m-main__price mr-5">$5.99</span>}
                                <button className="m-main__btn" disabled={selectedSkin ? false : true}>
                                    {t('main.to cart')}
                                    <BiCart className="icon--mid ml-5" />
                                </button>
                            </div>
                        </div>
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