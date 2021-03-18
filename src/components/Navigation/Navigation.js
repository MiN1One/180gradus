import React, { useEffect, useState } from 'react';
import { BiCart, BiStar } from 'react-icons/bi';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './Navigation.scss';
import Tooltip from '../../UI/Tooltip/Tooltip';
import Logo from '../../UI/Logo/Logo';

const AsyncFavorites = React.lazy(() => import('../Favorites/Favorites'));
const AsyncCart = React.lazy(() => import('../Cart/Cart'));

const Navigation = (props) => {
    const { t } = useTranslation();
    const location = useLocation();

    useEffect(() => {
        setFavView(false);
        setCartView(false);
    }, [location.pathname]);

    const [favView, setFavView] = useState(false);
    const [cartView, setCartView] = useState(false);
            
    return (
        <>
            {favView && <AsyncFavorites t={t} close={setFavView} />}
            {cartView && <AsyncCart t={t} close={setCartView} />}
            <nav className={`Navigation ${props.class || ''}`}>
                <div className="container">
                    <div className="Navigation__content">
                        <div className="Navigation__side">
                            <div className="Navigation__logo">
                                <Logo />
                            </div>
                            <ul className="Navigation__list">
                                <li className="Navigation__item">
                                    <Link 
                                        to="/categories/skins"
                                        className="Navigation__link">
                                        {t('nav.skins')}
                                    </Link>
                                </li>                                    
                                <li className="Navigation__item">
                                    <Link 
                                        to="/categories/phones"
                                        className="Navigation__link">
                                        {t('nav.phones')}
                                    </Link>
                                </li>                                    
                                <li className="Navigation__item">
                                    <Link 
                                        to="/categories/laptops"
                                        className="Navigation__link">
                                        {t('nav.laptops')}
                                    </Link>
                                </li>                                    
                                <li className="Navigation__item">
                                    <Link 
                                        to="/categories/consoles"
                                        className="Navigation__link">
                                        {t('nav.consoles')}
                                    </Link>
                                </li>                                    
                                <li className="Navigation__item">
                                    <Link 
                                        to="/categories/exclusive"
                                        className="Navigation__link">
                                        {t('nav.exclusive edition')}
                                    </Link>
                                </li>                                    
                                <li className="Navigation__item">
                                    <Link 
                                        to="/180degrees/about"
                                        className="Navigation__link">
                                        {t('nav.about')}
                                    </Link>
                                </li>                                    
                            </ul>
                        </div>
                        <div className="Navigation__side">
                            <div className="Navigation__item">
                                <button 
                                    className="Navigation__link Navigation__link--pop" 
                                    onClick={() => setCartView(true)}>
                                        <BiCart className="Navigation__icon" />
                                </button>
                                <Tooltip>{t('nav.cart')}</Tooltip>
                            </div>
                            <div className="Navigation__item">
                                <button 
                                    className="Navigation__link Navigation__link--pop" 
                                    onClick={() => setFavView(true)}>
                                        <span>2</span>
                                        <BiStar className="Navigation__icon" />
                                </button>
                                <Tooltip>{t('nav.favorites')}</Tooltip>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </nav>
        </>
    );
};

export default React.memo(Navigation);