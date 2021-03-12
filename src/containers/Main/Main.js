import { useHistory, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { BiChevronLeft, BiPaintRoll, BiCartAlt, BiChevronRight } from 'react-icons/bi';
import { Scrollbars } from 'react-custom-scrollbars';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';

import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/swiper.scss';

import s20 from '../../assets/images/noback-s20-dgrey.png';
import x50 from '../../assets/images/Vivo X50.png';

import './Main.scss';
import * as utils from '../../utilities/utilities';

SwiperCore.use([Navigation, Pagination]);

const Main = () => {
    const params = useParams();
    const history = useHistory();
    const { t } = useTranslation();

    return (
        <header className="Main">
            <div className="Main__head">
                <div className="container">
                    <div className="flex aic">
                        <button className="btn btn__square mr-2" onClick={() => history.push(`/categories/${params.category}`)}>
                            <BiChevronLeft className="icon--lg icon--dark" /> 
                        </button>
                        <h2 className="heading heading--1 heading--black">{t(`nav.${params.category}`)} ~ {params.id}</h2>
                    </div>
                </div>
            </div>
            <div className="Main__body">
                <div className="Main__left"></div>
                <div className="Main__right"></div>
                <div className="Main__content">
                    <div className="container h-100">
                        <div className="Main__content-wrapper">
                            <div className="Main__right">
                                <figure className="Main__figure">
                                    <LazyLoadImage 
                                        src={x50}
                                        alt={params.id}
                                        className="Main__img"
                                        width="100%"
                                        height="100%"
                                        effect="opacity" />
                                </figure>
                                {/* <div className="pos-rel">
                                    <button className="Main__colorset">
                                        {t('sets.color set')}
                                        <BiPaintRoll className="ml-5 icon--sm" />
                                    </button>
                                    <ul className="Main__dropdown">
                                        <li className="Main__drop-item">Color 1</li>
                                        <li className="Main__drop-item">Color 1</li>
                                        <li className="Main__drop-item">Color 1</li>
                                    </ul>
                                </div> */}
                            </div>
                            <div className="Main__left">
                                <div className="Main__sets">
                                    <button className="Main__btn-control Main__btn-control--prev">
                                        <BiChevronLeft className="icon--sm" />
                                    </button>
                                    <button className="Main__btn-control Main__btn-control--next">
                                        <BiChevronRight className="icon--sm" />
                                    </button>
                                    <div className="flex aic mb-3">
                                        <h2 className="heading heading--sm c-white mr-1">{t('sets.black flowers')}</h2>
                                        <span className="mr-1">&bull;</span>
                                        <span className="heading heading--sub c-light">{t('sets.basic')}</span>
                                    </div>
                                    <Swiper
                                        slidesPerView={1}
                                        className="Main__sets-body"
                                        navigation={{
                                                prevEl: '.Main__btn-control--prev', 
                                                nextEl: '.Main__btn-control--next', 
                                                disabledClass: 'Main__btn-control--disabled'
                                            }}
                                        spaceBetween={30}>
                                            <SwiperSlide className="Main__sets-wrapper">
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
                                                <div className="Main__sets-item">
                                                </div>
                                            </SwiperSlide>
                                    </Swiper>
                                </div>
                                <div className="Main__summary">
                                    <div className="Main__price">$5.99</div>
                                    <button className="Main__btn">
                                        {t('main.buy')}
                                        <BiCartAlt className="icon--mid ml-5" />
                                    </button>
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

export default Main;