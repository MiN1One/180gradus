import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineStar } from 'react-icons/ai';
import { BiCart, BiMenuAltLeft, BiMenuAltRight } from 'react-icons/bi';
import { connect, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';

import Cart from '../../../components/Cart/Cart';
import Favorites from '../../../components/Favorites/Favorites';
import Backdrop from '../../../UI/Backdrop/Backdrop';
import Logo from '../../../UI/Logo/Logo';
import './Navigation.scss';

const Navigation = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const [menu, setMenu] = useState(false);
    const [favView, setFavView] = useState(false);
    const [cartView, setCartView] = useState(false);
    const categories = useSelector(state => state.categories);
    
    useEffect(() => {
        const root = document.getElementById('root');
        if (menu) {
            document.documentElement.style.overflow = 'hidden';
            root.style.transition = 'all .3s ease';
            root.style.transform = 'translateX(-60vw)';
        } else {
            root.style.removeProperty('transform');
            document.documentElement.style.removeProperty('overflow');
        }

        return () => {
            root.removeAttribute('style');
            document.documentElement.removeAttribute('style');
        };
    }, [menu]);

    useEffect(() => {
        setMenu(false);
        setFavView(false);
        setCartView(false);
    }, [location.pathname]);

    const isHome = location.pathname === '/'; 

    const navItems = categories && categories.map((el, i) => (
        <NavLink 
            key={i} 
            activeClassName="m-nav__link--active" 
            to={`/categories/${el.type}/${el.name}`}
            className="m-nav__link"
            data-premium={el.exclusive}>
                {t(`nav.${el.name}`)}
        </NavLink>
    ));

    return (
        <>  
            {favView && <Favorites t={t} close={() => setFavView(false)} />}
            {cartView && <Cart t={t} close={() => setCartView(false)} />}
            {menu &&
                <>
                    <Backdrop z={109} close={() => setMenu(false)} className="backdrop--transparent" />
                    <nav className="m-nav__bar">
                        <div className="m-nav__group">
                            <span className="m-nav__title text text--mid">{t('main.categories')}:</span>
                            <NavLink activeClassName="m-nav__link--active" exact to="/categories/skins" className="m-nav__link">
                                {t('nav.skins')}
                            </NavLink>
                            {navItems}
                        </div>
                        <div className="m-nav__group">
                            <button 
                                onClick={() => {
                                    setMenu(false);
                                    setFavView(true);
                                }} 
                                className="btn btn__ghost btn__ghost--active">
                                    {/* {t('nav.favorites')} */}
                                    <AiOutlineStar className="icon" />
                            </button>
                            <button 
                                onClick={() => {
                                    setMenu(false);
                                    setCartView(true);
                                }} 
                                className="btn btn__ghost btn__ghost--active">
                                    {/* {t('nav.favorites')} */}
                                    <BiCart className="icon" />
                            </button>
                        </div>
                    </nav>
                </>
            }
            <nav role="navigation" className={`m-nav ${isHome ? '' : 'm-nav--fill'}`}>
                <div className="container w-100">
                    <div className={`flex aic ${isHome ? 'jce' : 'jcsb'}`}>
                        {!isHome && <Logo />}
                        <button className={`m-nav__menu ${menu ? 'm-nav__menu--active' : ''}`} onClick={() => setMenu(true)}>
                            {menu
                                ? <>
                                    <BiMenuAltLeft className="icon mr-5" />
                                    {t('main.close')}
                                </>
                                : <>
                                    <BiMenuAltRight className="icon mr-5" />
                                    {t('nav.menu')}
                                </>
                            }
                            
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default React.memo(Navigation);