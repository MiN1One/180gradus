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

import x50 from '../../assets/images/Vivo X50.png';
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
    const { t } = useTranslation();

    const [data, setData] = useState({});
    const [selectedSkin, setSelectedSkin] = useState(null);
    const [skinImg, setSkinImg] = useState(null);
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
                    setSkinImg('img');
                });
        }
    }, [params.category, params.id, props.error]);

    const onSelectSkin = (skinId) => {
        if (!mounted.current) return null;
        axiosInstance(`/skins/${params.id}?skin=${skinId}`)
            .then(res => {
                setSkinImg(res);
                console.log(res);
            });
        setSelectedSkin(skinId);
    };

    const isFavorite = selectedSkin !== null && props.favorites.findIndex(el => el === selectedSkin) !== -1;

    return (
        <header className="Main">
            <div className="main-head">
                <div className="container">
                    <div className="flex aic">
                        <button className="btn btn__square mr-2" onClick={() => history.push(`/categories/${params.category}`)}>
                            <BiChevronLeft className="icon--lg icon--dark" /> 
                        </button>
                        <h2 className="heading heading--1 heading--black">
                            {t(`nav.${params.category}`)} ~ {params.id}
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
                                    <LazyLoadImage 
                                        src={x50}
                                        alt={params.id}
                                        className="Main__img"
                                        width="100%"
                                        height="100%"
                                        placeholder={<SubSpinner />} />
                                </figure>
                                {selectedSkin !== null && 
                                    <>
                                        <h5 className="text text--mid Main__title">Black flowers</h5>
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
                                                        ? <AiFillStar className="icon" />
                                                        : <AiOutlineStar className="icon" />
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
                                                <h5 className="heading heading--sm c-white mr-1">{t('sets.black flowers')}</h5>
                                                <span className="mr-1">&bull;</span>
                                                <span className="heading heading--sub c-light">{t('sets.basic')}</span>
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
                                                    <SwiperSlide className="Main__sets-wrapper">
                                                        <div className={`Main__sets-item ${selectedSkin === 0 ? 'Main__sets-item--active' : ''}`} onClick={() => onSelectSkin('01')}>
                                                            <div className="Main__tooltip">
                                                                Black flowers
                                                            </div>
                                                        </div>
                                                        <div className="Main__sets-item">
                                                            <div className="Main__tooltip">
                                                                Black flowers
                                                            </div>
                                                        </div>
                                                        <div className="Main__sets-item">
                                                            <div className="Main__tooltip">
                                                                Black flowers
                                                            </div>
                                                        </div>
                                                        <div className="Main__sets-item">
                                                            <div className="Main__tooltip">
                                                                Black flowers
                                                            </div>
                                                        </div>
                                                        <div className="Main__sets-item">
                                                            <div className="Main__tooltip">
                                                                Black flowers
                                                            </div>
                                                        </div>
                                                        <div className="Main__sets-item">
                                                            <div className="Main__tooltip">
                                                                Black flowers
                                                            </div>
                                                        </div>
                                                        <div className="Main__sets-item">
                                                            <div className="Main__tooltip">
                                                                Black flowers
                                                            </div>
                                                        </div>
                                                        <div className="Main__sets-item">
                                                            <div className="Main__tooltip">
                                                                Black flowers
                                                            </div>
                                                        </div>
                                                        <div className="Main__sets-item">
                                                            <div className="Main__tooltip">
                                                                Black flowers
                                                            </div>
                                                        </div>
                                                    </SwiperSlide>
                                                    <SwiperSlide className="Main__sets-wrapper">
                                                        <div className="Main__sets-item">
                                                            <div className="Main__tooltip">
                                                                Black flowers
                                                            </div>
                                                        </div>
                                                        <div className="Main__sets-item">
                                                        </div>
                                                        <div className="Main__sets-item">
                                                        </div>
                                                        <div className="Main__sets-item">
                                                        </div>
                                                        <div className="Main__sets-item">
                                                        </div>
                                                        <div className="Main__sets-item">
                                                        </div>
                                                        <div className="Main__sets-item">
                                                        </div>
                                                        <div className="Main__sets-item">
                                                        </div>
                                                        <div className="Main__sets-item">
                                                        </div>
                                                    </SwiperSlide>
                                            </Swiper>
                                        </div>
                                    </div>
                                    <div className="Main__summary">
                                        {selectedSkin !== null && <div className="Main__price">$5.99</div>}
                                        <button 
                                            className="Main__btn" 
                                            disabled={selectedSkin !== null ? false : true}
                                            onClick={() => {
                                                if (selectedSkin !== null) props.onAddToCart(selectedSkin);
                                            }}>
                                                {t('main.to cart')}
                                                <BiCartAlt className="icon--mid ml-5" />
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
    favorites: state.favorites
});

const dispatch = dispatch => ({
    onAddToCart: (id) => dispatch(actions.addToCart(id)),
    onAddToFav: (id) => dispatch(actions.addToFavorites(id))
});

export default connect(state, dispatch)(Main);