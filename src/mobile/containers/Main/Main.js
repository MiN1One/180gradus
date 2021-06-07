import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import { BiCart, BiChevronLeft, BiChevronRight, BiX } from 'react-icons/bi';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

import * as actions from '../../../store/actions';
import './Main.scss';
import axiosInstance from '../../../axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import SubSpinner from '../../../UI/SubSpinner/SubSpinner';
import useEditFavorites from '../../../hooks/useEditFavorites';
import useEditCart from '../../../hooks/useEditCart';

SwiperCore.use([Navigation]);

const Main = (props) => {
    const params = useParams();
    const history = useHistory();
    const [swiper, setSwiper] = useState(null);
    const [loadingImage, setLoadingImage] = useState(false);
    const [selectedSkin, setSelectedSkin] = useState(null);
    const [data, setData] = useState(null);

    const { isFavorite, editFavorites } = useEditFavorites();
    const { inTheCart, editCart } = useEditCart(); 
    
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
                .then(({ data }) => {
                    setData(data.data.data);
                    props.onSetData('data', data.data.data.device);
                    console.log(data);
                });
        }
    }, [params.category, params.id]);

    const image = selectedSkin && selectedSkin.image;
    useEffect(() => {
        if (selectedSkin) {
            setLoadingImage(true);
            const imagePreloader = new Image();
      
            imagePreloader.src = `/images/${selectedSkin.image}`;

            if (imagePreloader.complete) {
                setLoadingImage(false);
                imagePreloader.onload = null;
            } else {
                imagePreloader.onload = () => {
                    setLoadingImage(false);
                    imagePreloader.onload = null;
                };
            }
        }
    }, [image]);

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
                    key={nanoid()}
                    className={`m-main__sets-item ${(selectedSkin && selectedSkin._id === el._id) ? 'm-main__sets-item--active' : ''}`} 
                    onClick={() => setSelectedSkin(el)}>
                        <LazyLoadImage 
                            className="img" 
                            alt={el.name} 
                            src={`/images/placeholders/${el.placeholder}`} 
                            width="100%" 
                            height="100%"
                            effect="opacity" />
                </SwiperSlide>
            )
        });
    }

    return (
        <section className="m-main">
            <div className="main-head">
                <div className="container">
                    <div className="flex aic">
                        <button className="btn btn__square mr-2" onClick={() => history.push(`/categories/${data && data.type}/${params.category}`)}>
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
                            {loadingImage
                                ? <SubSpinner />
                                : (
                                    <>
                                        <img 
                                            className="Main__img" 
                                            src={data ? `/images/${data.default}` : `/images/${selectedSkin && selectedSkin.image}`} 
                                            alt={data ? data.device : (selectedSkin && selectedSkin.name)} />
                                    </>
                                )
                            }
                        </figure>
                        {selectedSkin && 
                            <div className="flex fdc aic">
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
                                        onClick={() => editFavorites(selectedSkin)}>
                                            {isFavorite(selectedSkin._id)
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
                                {selectedSkin && (
                                    <span className="price-tag m-main__price mr-5">
                                        ${parseFloat(selectedSkin.price).toFixed(2)}
                                    </span>
                                )}
                                <button 
                                    className={`m-main__btn ${inTheCart(selectedSkin?._id) ? 'm-main__btn--active' : ''}`} 
                                    disabled={selectedSkin ? false : true}
                                    onClick={() => 
                                        !inTheCart(selectedSkin._id) && editCart(selectedSkin)
                                    }>
                                        {!inTheCart(selectedSkin?._id)
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
    onAddToCart: (id) => dispatch(actions.addToCart(id)),
    onSetData: (name, val) => dispatch(actions.setData(name, val))
});

export default connect(state, dispatch)(React.memo(Main));