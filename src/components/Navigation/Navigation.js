import React, { useEffect, useState } from 'react';
import { BiCart } from 'react-icons/bi';
import { AiOutlineStar } from 'react-icons/ai';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './Navigation.scss';
import Tooltip from '../../UI/Tooltip/Tooltip';
import Logo from '../../UI/Logo/Logo';
import Cart from '../Cart/Cart';
import Favorites from '../Favorites/Favorites';

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
            {favView && <Favorites t={t} close={setFavView} />}
            {cartView && <Cart t={t} close={setCartView} />}
            <nav className={`Navigation ${props.class || ''}`}>
                <div className="container">
                    <div className="Navigation__content">
                        <div className="Navigation__side">
                            <Logo className="h-100 mr-1" />
                            <ul className="Navigation__list">
                                <li className="Navigation__item">
                                    <NavLink
                                        exact
                                        activeClassName="Navigation__link--active"
                                        to="/categories/skins"
                                        className="Navigation__link">
                                        {t('nav.skins')}
                                    </NavLink>
                                </li>  
                                <li className="Navigation__item">
                                    <NavLink 
                                        activeClassName="Navigation__link--active"
                                        to="/categories/skins/phones"
                                        className="Navigation__link">
                                        {t('nav.phones')}
                                    </NavLink>
                                </li>                                    
                                <li className="Navigation__item">
                                    <NavLink 
                                        activeClassName="Navigation__link--active"
                                        to="/categories/skins/laptops"
                                        className="Navigation__link">
                                        {t('nav.laptops')}
                                    </NavLink>
                                </li>                                    
                                <li className="Navigation__item">
                                    <NavLink 
                                        activeClassName="Navigation__link--active"
                                        to="/categories/skins/consoles"
                                        className="Navigation__link">
                                        {t('nav.consoles')}
                                    </NavLink>
                                </li>                                    
                                <li className="Navigation__item">
                                    <NavLink 
                                        activeClassName="Navigation__link--active"
                                        to="/categories/skins/exclusive"
                                        className="Navigation__link">
                                        {t('nav.exclusive')}
                                    </NavLink>
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
                                        <AiOutlineStar className="Navigation__icon" />
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