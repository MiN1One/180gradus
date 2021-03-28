import React, { useEffect, useState } from 'react';
import { BiCart } from 'react-icons/bi';
import { AiOutlineStar } from 'react-icons/ai';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import './Navigation.scss';
import Tooltip from '../../UI/Tooltip/Tooltip';
import Logo from '../../UI/Logo/Logo';
import Cart from '../Cart/Cart';
import Favorites from '../Favorites/Favorites';

const Navigation = ({ categories, className }) => {
    const { t } = useTranslation();
    const location = useLocation();

    useEffect(() => {
        setFavView(false);
        setCartView(false);
    }, [location.pathname]);

    const [favView, setFavView] = useState(false);
    const [cartView, setCartView] = useState(false);

    const navItems = categories && categories.map((el, i) => (
        <li className="Navigation__item" key={i}>
            <NavLink
                exact
                activeClassName="Navigation__link--active"
                to={`/categories/${el.type}/${el.name}`}
                className="Navigation__link"
                data-premium={el.exclusive}>
                    {t(`nav.${el.name}`)}
            </NavLink>
        </li>
    ));
            
    return (
        <>
            {favView && <Favorites t={t} close={setFavView} />}
            {cartView && <Cart t={t} close={setCartView} />}
            <nav className={`Navigation ${className || ''}`}>
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
                                {navItems}                   
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

const state = (state) => ({
    categories: state.categories
});

export default React.memo(connect(state)(Navigation));