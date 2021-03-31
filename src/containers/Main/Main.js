import { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { BiChevronLeft, BiCartAlt, BiChevronRight, BiX } from 'react-icons/bi';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';

import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/swiper.scss';

import * as actions from '../../store/actions';
import './Main.scss';
import { connect } from 'react-redux';
import SubSpinner from '../../UI/SubSpinner/SubSpinner';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import axiosInstance from '../../axios';

SwiperCore.use([Navigation, Pagination]);

const Main = (props) => {
    const params = useParams();
    const history = useHistory();
    
    const [data, setData] = useState(null);
    const [selectedSkin, setSelectedSkin] = useState(null);
    const mounted = useRef();

    const { t } = useTranslation(['translation', data && data.device]);

    useEffect(() => {
        mounted.current = true;
        return () => mounted.current = false;
    }, []);

    useEffect(() => {
        if (mounted.current) {
            axiosInstance(`/skins/${params.id}`)
                .then((res) => {
                    setData(res.data);
                    console.log(res.data.skins);
                });
        }
    }, [params.category, params.id, props.error]);

    const isFavorite = selectedSkin && props.favorites.findIndex(el => el._id === selectedSkin._id) !== -1;
    const inTheCart = selectedSkin && props.cart.findIndex(el => el._id === selectedSkin._id) !== -1;
    
    let skinsSlide = null, deviceName = null;

    if (data) {
        deviceName = data.device;

        const counter = Math.ceil(data.skins.length / 9);
        let skinsArr = [];
        if (counter)
            for (let i = 0; i < counter; i++) {
                skinsArr.push([...data.skins.slice(i * 9, 9 * (i+1))])
            }

        else skinsArr.push([...data.skins]);

        skinsSlide = skinsArr.map((el, i) => {
            const skins = el.map((skin, index) => {
                skin.device = deviceName;
                return (
                    <div 
                        key={index}
                        className={`Main__sets-item ${(selectedSkin && selectedSkin.name) === skin.name ? 'Main__sets-item--active' : ''}`} 
                        onClick={() => setSelectedSkin(skin)}>
                            <div className="Main__tooltip">
                                {t(`${deviceName}:${skin.name}`)}
                            </div>
                    </div>
                )
            });

            return (
                <SwiperSlide className="Main__sets-wrapper" key={i}>
                    {skins}
                </SwiperSlide>
            )
        });
    }

    return (
        <header className="Main">
            <div className="main-head">
                <div className="container">
                    <div className="flex aic">
                        <button className="btn btn__square mr-2" onClick={() => history.push(`/categories/skins/${params.category}`)}>
                            <BiChevronLeft className="icon--lg icon--dark" /> 
                        </button>
                        <h2 className="heading heading--1 heading--black">
                            {t(`nav.${params.category}`)} ~ {deviceName}
                        </h2>
                    </div>
                </div>
            </div>
            <div className="Main__body">
                <div className="Main__left"></div>
                <div className="Main__right"></div>
                <div className="Main__content">
                    <div className="container h-100 flex aic">
                        <div className="Main__content-wrapper">
                            <div className="Main__right">
                                <figure className="Main__figure">
                                    {selectedSkin 
                                        ? <LazyLoadImage 
                                            src={`http://localhost:3003/assets/images/${selectedSkin.image}`}
                                            alt={selectedSkin.name}
                                            className="Main__img"
                                            width="100%"
                                            height="100%"
                                            placeholder={<SubSpinner />} />
                                        : <img className="Main__img" src={data && `http://localhost:3003/assets/images/${data.default}`} alt={data && data.device} />
                                    }
                                </figure>
                                {selectedSkin !== null && 
                                    <>
                                        <h5 className="text text--mid Main__title">{selectedSkin ? t(`${deviceName}:${selectedSkin.name}`) : t('translation:main.default')}</h5>
                                        <div className="Main__right-panel">
                                            <button 
                                                className="btn btn__ghost btn__ghost--active mr-1"
                                                onClick={() => setSelectedSkin(null)}>
                                                    <BiX className="icon" />
                                            </button>
                                            <button 
                                                className="btn btn__ghost btn__ghost--active"
                                                onClick={() => props.onAddToFav(selectedSkin)}>
                                                    {isFavorite
                                                        ? <AiFillStar className="Main__icon" />
                                                        : <AiOutlineStar className="Main__icon" />
                                                    }
                                            </button>
                                        </div>
                                    </>
                                }
                            </div>
                            <div className="Main__left">
                                <div className="Main__sets">
                                    <div className="w-100 pos-rel">
                                        {selectedSkin !== null &&
                                            <div className="flex aic mb-3">
                                                <h5 className="heading heading--sm c-white mr-1">{t(`${deviceName}:${selectedSkin.name}`)}</h5>
                                                <span className="mr-1">&bull;</span>
                                                <span className="heading heading--sub c-light">{t('translation:main.basic')}</span>
                                            </div>
                                        }
                                        <div className="pos-rel w-100">
                                            <button className="btn__control btn__control--prev Main__btn-control">
                                                <BiChevronLeft className="icon--sm" />
                                            </button>
                                            <button className="btn__control btn__control--next Main__btn-control">
                                                <BiChevronRight className="icon--sm" />
                                            </button>
                                            <Swiper
                                                slidesPerView={1}
                                                className="Main__sets-body"
                                                navigation={{
                                                    prevEl: '.btn__control--prev', 
                                                    nextEl: '.btn__control--next', 
                                                    disabledClass: 'btn__control--disabled'
                                                }}
                                                spaceBetween={30}
                                                updateOnWindowResize={true}>
                                                    {skinsSlide}
                                            </Swiper>
                                        </div>
                                    </div>
                                    <div className="Main__summary">
                                        {selectedSkin !== null && <div className="Main__price">${selectedSkin.price}</div>}
                                        <button 
                                            className={`Main__btn ${inTheCart ? 'Main__btn--active' : ''}`} 
                                            disabled={selectedSkin ? false : true}
                                            onClick={() => selectedSkin && props.onAddToCart(selectedSkin)}>
                                                {inTheCart ? t('translation:main.in the cart') : t('translation:main.to cart')}
                                                <BiCartAlt className="icon ml-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="Main__footer">

            </div>
        </header>
    );
};

const state = state => ({
    favorites: state.favorites,
    cart: state.cart
});

const dispatch = dispatch => ({
    onAddToCart: (id) => dispatch(actions.addToCart(id)),
    onAddToFav: (id) => dispatch(actions.addToFavorites(id))
});

export default connect(state, dispatch)(Main);