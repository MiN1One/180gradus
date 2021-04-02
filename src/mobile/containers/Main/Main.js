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
import './Main.scss';
import axiosInstance from '../../../axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import SubSpinner from '../../../UI/SubSpinner/SubSpinner';

SwiperCore.use([Navigation, Scrollbar]);

const Main = (props) => {
    const params = useParams();
    const history = useHistory();
    const [swiper, setSwiper] = useState(null);
    const [selectedSkin, setSelectedSkin] = useState(null);
    const [data, setData] = useState(null);
    
    const { t } = useTranslation(['translation', data && data.device]);

    useEffect(() => swiper && swiper.update());

    const mounted = useRef();
    useEffect(() => {
        mounted.current = true;
        return () => mounted.current = false;
    }, []);

    useEffect(() => {
        if (mounted.current) {
            axiosInstance(`/skins/${params.id}`)
                .then((res) => {
                    setData(res.data);
                    console.log(res);
                });
        }
    }, [params.category, params.id]);

    const isFavorite = selectedSkin && props.favorites.findIndex(el => el === selectedSkin) !== -1;
    const inTheCart = selectedSkin && props.cart.findIndex(el => el._id === selectedSkin._id);

    let skins = null, deviceName = null;

    if (data) {
        deviceName = data.device;

        skins = data.skins.map((el, i) => {
            el.device = deviceName;
            const category = props.categories && props.categories.find(cat => cat._id === data.category);
            el.category = category && category.name;
            el.deviceId = data._id;
            el.type = data.type;

            return (
                <SwiperSlide 
                    key={i}
                    className={`m-main__sets-item ${(selectedSkin && selectedSkin._id === el._id) ? 'm-main__sets-item--active' : ''}`} 
                    onClick={() => setSelectedSkin(el)}>

                </SwiperSlide>
            )
        });
    }

    return (
        <section className="m-main">
            <div className="main-head">
                <div className="container">
                    <div className="flex aic">
                        <button className="btn btn__square mr-2" onClick={() => history.push(`/categories/skins/${params.category}`)}>
                            <BiChevronLeft className="icon--lg icon--dark" />
                        </button>
                        <h2 className="heading heading--1 heading--black">
                            {deviceName}
                        </h2>
                    </div>
                </div>
            </div>
            <div className="m-main__body">
                <div className="m-main__top">
                    <div className="container flex aic jcc fdc pos-rel">
                        <figure className="m-main__figure">
                            {selectedSkin
                                ? <LazyLoadImage
                                    src={`http://localhost:3003/assets/images/${selectedSkin.image}`}
                                    alt={selectedSkin.name}
                                    className="img"
                                    width="100%"
                                    placeholder={<SubSpinner />}
                                    height="100%" />
                                : <img className="img" alt={deviceName} src={`http://localhost:3003/assets/images/${data && data.default}`} />
                            }
                        </figure>
                        {selectedSkin && 
                            <div className="flex fdc aic m-main__panel">
                                <span className="m-main__title text text--mid mb-1">
                                    {t(`${deviceName}:${selectedSkin.name}`)}
                                </span>
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
                                                : <AiOutlineStar className="m-main__icon" />
                                            }
                                    </button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className="m-main__bottom">
                    <div className="container">
                        {selectedSkin &&
                            <div className="flex mb-15 aic">
                                <h5 className="heading heading--sm c-white mr-1">
                                    {t(`${deviceName}:${selectedSkin.name}`)}
                                </h5>
                                <span className="mr-1 c-light">&bull;</span>
                                <span className="heading heading--sub c-light">{t('translation:main.basic')}</span>
                            </div>
                        }
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
                                }}
                                onInit={(sw) => setSwiper(sw)}>
                                    {skins}
                            </Swiper>
                        </div>
                    </div>
                </div>
                <div className="m-main__summary">
                    <div className="container">
                        <div className="flex jce">
                            <div className="flex">
                                {selectedSkin && <span className="price-tag m-main__price mr-5">${selectedSkin.price}</span>}
                                <button 
                                    className={`m-main__btn ${inTheCart ? 'm-main__btn--active' : ''}`} 
                                    disabled={selectedSkin ? false : true}
                                    onClick={() => props.onAddToCart(selectedSkin)}>
                                        {!inTheCart
                                            ? <>
                                                {t('translation:main.to cart')}
                                                <BiCart className="icon ml-5" />
                                            </>
                                            : <>{t('translation:main.in the cart')}</>
                                        }
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
    favorites: state.favorites,
    cart: state.cart,
    categories: state.categories
});

const dispatch = dispatch => ({
    onAddToFav: (id) => dispatch(actions.addToFavorites(id)),
    onAddToCart: (id) => dispatch(actions.addToCart(id))
});

export default connect(state, dispatch)(React.memo(Main));