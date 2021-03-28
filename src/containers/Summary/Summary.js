import React, { useState, useEffect, useRef } from "react";
import { useTranslation, Trans } from "react-i18next";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { BiChevronRight, BiChevronLeft, BiPalette, BiChevronDown, BiX } from 'react-icons/bi';
import ShadowScrollbars from "../../UI/ShadowScrollbars/ShadowScrollbars";
import { Link } from "react-router-dom";
import * as emailValidator from 'email-validator';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';

import * as actions from '../../store/actions';
import './Summary.scss';
import vivo from '../../assets/images/Vivo X50.png';
import axios from '../../axios';
import { connect } from "react-redux";

const AsynSuccess = React.lazy(() => import('../Success/Success'));

SwiperCore.use([Navigation, Pagination]);

const Summary = ({ onRemoveFromCart, cart, onAddToCart }) => {
    const { t } = useTranslation(['translation', 'input']);
    const [swiper, setSwiper] = useState(null);

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [geoMode, setGeoMode] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [cartItems, setCartItems] = useState([ ...cart ]);

    const emailRef = useRef();
    const phoneRef = useRef();
    const addressInputRef = useRef();
    const fnameRef = useRef();
    const lnameRef = useRef();
    
    useEffect(() => swiper && swiper.update());

    useEffect(() => setCartItems([ ...cart ]), [cart]);
    
    useEffect(() => {
        if (error) document.documentElement.scrollTop = 0;
    }, [error]);

    const onRemoveCartItem = (id) => {
        const newArr = cartItems.filter(el => el !== id);
        setCartItems(newArr);
    };

    const onApplyChanges = () => {
        cartItems.forEach(el => onRemoveFromCart(el));
        setEditMode(false);
    };

    const onSubmit = () => {
        if (
            fnameRef.current.value.length < 2 || 
            lnameRef.current.value.length < 2
           ) { return setError(t('input:fill out all')) }

        if (phoneRef.current.value.length < 7) 
            return setError(t('input:provide valid phone number'));

        if (
            !geoMode && 
            (addressInputRef.current.value === '' || 
            addressInputRef.current.value.length < 4)
           ) { return setError(t('input:provide valid address')) };

        if (
            emailRef.current.value !== '' &&
            !emailValidator.validate(emailRef.current.value)
           ) { return setError(t('input:provide valid email')) };

        setError(null);

        const body = {
            name: fnameRef.current.value,
            last_name: lnameRef.current.value,
            phone_number: phoneRef.current.value,
            email: emailRef.current.value !== '' ? emailRef.current.value : '',
            address: (!geoMode && addressInputRef.current.value) ? addressInputRef.current.value : ''
        };

        axios.post('/order', body)
            .then(() => {
                // if (geoMode) window.location.replace('https://www.t.me/he_go_bot');
                if (geoMode) window.open('https://www.t.me/he_go_bot', '_blank');
                setSuccess(true);
            });
    };

    if (success) return <AsynSuccess geoMode={geoMode} />;

    return (
        <section className="Summary">
            <div className="Summary__left">
                <div className="d-flex fdc w-100">
                    <Swiper
                        className="Summary__list mb-3"
                        navigation={{
                            prevEl: '.btn__control--prev',
                            nextEl: '.btn__control--next',
                            disabledClass: 'btn__control--disabled'
                        }}
                        slidesPerView={1}
                        onInit={(sw) => setSwiper(sw)}
                        onActiveIndexChange={({ activeIndex }) => console.log(activeIndex)}>
                            <SwiperSlide className="Summary__item">
                                <figure className="Summary__figure">
                                    <LazyLoadImage 
                                        src={vivo}
                                        alt="vivo"
                                        width="100%"
                                        height="100%"
                                        effect="opacity"
                                        className="img" />
                                </figure>
                            </SwiperSlide>
                            <SwiperSlide className="Summary__item">
                                <figure className="Summary__figure">
                                    <LazyLoadImage 
                                        src={vivo}
                                        alt="vivo"
                                        width="100%"
                                        height="100%"
                                        effect="opacity"
                                        className="img" />
                                </figure>
                            </SwiperSlide>
                            <button className="Summary__btn-control btn__control btn__control--prev">
                                <BiChevronLeft className="icon--sm" />
                            </button>
                            <button className="Summary__btn-control btn__control btn__control--next">
                                <BiChevronRight className="icon--sm" />
                            </button>
                    </Swiper>
                    <div className="flex fdc aic mb-3">
                        <h3 className="heading heading--main mb-15">Black Flowers</h3>
                        <h2 className="heading heading--sm">Vivo X50</h2>
                    </div>
                    <div className="Summary__cards">
                        <ShadowScrollbars className="Summary__wrapper">
                            <div className="Summary__card" tabIndex="0" onClick={() => swiper.slideTo(0, 300)}>
                                <div className="flex aic">
                                    <BiPalette className="icon mr-1" />
                                    <div className="flex fdc">
                                        <span className="Summary__card-title">Black flowers</span>
                                        <span className="Summary__card-title--sub">{t('translation:nav.skins')}</span>
                                    </div>
                                </div>
                                <span className="price-tag">$5.99</span>
                            </div>
                            <div 
                                className="Summary__card" 
                                tabIndex="0" 
                                onClick={() => !editMode && swiper.slideTo(1, 300)}>
                                    <div className="flex aic">
                                        <BiPalette className="icon mr-1" />
                                        <div className="flex fdc">
                                            <span className="Summary__card-title">Black flowers</span>
                                            <span className="Summary__card-title--sub">{t('translation:nav.skins')}</span>
                                        </div>
                                    </div>
                                    {editMode
                                        ? <button onClick={() => onRemoveCartItem(1)} className="price-tag mr-5 Summary__card-btn">
                                            <BiX className="icon" /> 
                                        </button>
                                        : <span className="price-tag">$5.99</span>
                                    }
                            </div>
                            <div className="Summary__card" tabIndex="0">
                                <div className="flex aic">
                                    <BiPalette className="icon mr-1" />
                                    <div className="flex fdc">
                                        <span className="Summary__card-title">Black flowers</span>
                                        <span className="Summary__card-title--sub">{t('translation:nav.skins')}</span>
                                    </div>
                                </div>
                                <span className="price-tag">$5.99</span>
                            </div>
                            <div className="Summary__card" tabIndex="0">
                                <div className="flex aic">
                                    <BiPalette className="icon mr-1" />
                                    <div className="flex fdc">
                                        <span className="Summary__card-title">Black flowers</span>
                                        <span className="Summary__card-title--sub">{t('translation:nav.skins')}</span>
                                    </div>
                                </div>
                                <span className="price-tag">$5.99</span>
                            </div>
                            <div className="Summary__card" tabIndex="0">
                                <div className="flex aic">
                                    <BiPalette className="icon mr-1" />
                                    <div className="flex fdc">
                                        <span className="Summary__card-title">Black flowers</span>
                                        <span className="Summary__card-title--sub">{t('translation:nav.skins')}</span>
                                    </div>
                                </div>
                                <span className="price-tag">$5.99</span>
                            </div>
                            <div className="Summary__card" tabIndex="0">
                                <div className="flex aic">
                                    <BiPalette className="icon mr-1" />
                                    <div className="flex fdc">
                                        <span className="Summary__card-title">Rose</span>
                                        <span className="Summary__card-title--sub">{t('translation:nav.skins')}</span>
                                    </div>
                                </div>
                                <span className="price-tag">$7.99</span>
                            </div>
                        </ShadowScrollbars>
                    </div>
                </div>
                <div className="w-100 flex jcsb px-15">
                    {editMode
                        ? <button 
                            onClick={() => {
                                setCartItems(cart);
                                setEditMode(false);
                            }}
                            className="btn btn__ghost btn__ghost--active">
                                {t('main.cancel')}
                        </button>
                        : <p className="text text--sm text--wrap w-50 c-grey-l">
                            {t('translation:main.num skins')}: {cart.length},<br/> 
                            {t('translation:nav.set')}: Rose, Black Flowers
                        </p>
                    }
                    <button 
                        onClick={() => editMode ? onApplyChanges() : setEditMode(true)} 
                        className="btn btn__ghost btn__ghost--active">
                            {!editMode ? t('translation:main.edit') : t('translation:main.save')}
                    </button>
                </div>
            </div>
            <div className="Summary__right">
                <div className="Summary__head">
                    <h2 className="heading heading--1 c-white">{t('translation:nav.summary')}</h2>
                </div>
                <div className="Summary__body">
                    <p className="text text--main mb-lg">
                        {t('input:summary.s1.p1')}<Link to="/180degrees/privacy" className="link link--outline">{t('input:summary.s1.p2')}</Link>{t('input:summary.s2.p1')}<Link to="/180degrees/delivery" className="link link--outline">{t('input:summary.s2.p2')}</Link><br/>
                        {t('input:summary.s3.p1')}<a rel="noreferrer noopener" target="_blank" href="https://www.t.me/he_go_bot" className="link link--outline">{t('input:summary.s3.p2')}</a>{t('input:summary.s3.p3')}
                    </p>
                    {error && <p className="text text--main c-red mb-15">{error}</p>}
                    <form className="Summary__form">
                        <div className="flex fdc wh-auto">
                            <label className="input--label">{t('input:enter fname')}</label>
                            <input ref={fnameRef} className="input input--main" placeholder={t('input:fname')} />
                        </div>
                        <div className="flex fdc wh-auto">
                            <label className="input--label">{t('input:enter lname')}</label>
                            <input ref={lnameRef} className="input input--main" placeholder={t('input:lname')} />
                        </div>
                        <div className="flex fdc wh-auto pos-rel">
                            <label className="input--label">{t('input:choose method')}</label>
                            <div className="Summary__input input input--main" tabIndex="0">
                                {t(`input:${geoMode ? 'telegram' : 'input'}`)}
                                <BiChevronDown className="icon icon--dark" />
                            </div>
                            <div className="Summary__dropdown">
                                <div className="Summary__drop-item" tabIndex="0" onMouseDown={() => setGeoMode(true)}>{t('input:telegram')}</div>
                                <div className="Summary__drop-item" tabIndex="0" onMouseDown={() => setGeoMode(false)}>{t('input:input')}</div>
                            </div>
                        </div>
                        <div className="flex fdc wh-auto">
                            <label className="input--label">{t('input:enter phone')}</label>
                            <input maxLength="15" type="number" ref={phoneRef} className="input input--main" placeholder={t('input:phone')} />
                        </div>
                        <div className="flex fdc wh-auto">
                            <label className="input--label">{t('input:enter email')}</label>
                            <input ref={emailRef} className="input input--main" placeholder={t('input:email')} />
                        </div>
                        {!geoMode
                            ? <div className="flex fdc wh-auto">
                                <label className="input--label">{t('input:enter address')}</label>
                                <input ref={addressInputRef} className="input input--main" placeholder={t('input:address')} />
                            </div>
                            : <div className="flex fdc wh-auto">
                                <label className="input--label">{t('input:telegram')}</label>
                                <a 
                                    href="https://www.t.me/he_go_bot"
                                    className="Summary__input input input--main"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                        {t('input:telegram')}
                                    <BiChevronRight className="icon icon--dark" />
                                </a>
                            </div>
                        }
                    </form>
                </div>
                <div className="Summary__footer">
                    <div className="flex aic">
                        <span className="text text--main flex mr-5">{t('translation:main.total')}:&nbsp;</span>
                        <span className="Summary__price-tag price-tag mr-1">$37.98</span>
                        <button onClick={() => onSubmit()} className="btn btn__ghost btn__ghost--active Summary__btn">
                            {t('translation:main.order')}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

const state = state => ({
    cart: state.cart
});

const dispatch = dispatch => ({
    onRemoveFromCart: (id) => dispatch(actions.removeFromCart(id)),
    onAddToCart: (id) => dispatch(actions.addToCart(id))
});

export default React.memo(connect(state, dispatch)(Summary));