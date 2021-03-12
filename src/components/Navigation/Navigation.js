import React, { useEffect, useState } from 'react';
import { BiUser, BiStar } from 'react-icons/bi';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './Navigation.scss';
import Tooltip from '../../UI/Tooltip/Tooltip';
import * as utils from '../../utilities/utilities';
import Logo from '../../UI/Logo/Logo';

const Navigation = (props) => {
    const { t } = useTranslation();
    const location = useLocation();
    const hideNav = useState(false);
            
    return (
        <React.Fragment>
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
                                        className="Navigation__link link link__main">
                                        {t('nav.skins')}
                                    </Link>
                                </li>                                    
                                <li className="Navigation__item">
                                    <Link 
                                        to="/categories/phones"
                                        className="Navigation__link link link__main">
                                        {t('nav.phones')}
                                    </Link>
                                </li>                                    
                                <li className="Navigation__item">
                                    <Link 
                                        to="/categories/laptops"
                                        className="Navigation__link link link__main">
                                        {t('nav.laptops')}
                                    </Link>
                                </li>                                    
                                <li className="Navigation__item">
                                    <Link 
                                        to="/categories/consoles"
                                        className="Navigation__link link link__main">
                                        {t('nav.consoles')}
                                    </Link>
                                </li>                                    
                                <li className="Navigation__item">
                                    <Link 
                                        to="/categories/exclusive"
                                        className="Navigation__link link link__main">
                                        {t('nav.exclusive edition')}
                                    </Link>
                                </li>                                    
                                <li className="Navigation__item">
                                    <Link 
                                        to="/categories/about"
                                        className="Navigation__link link link__main">
                                        {t('nav.about')}
                                    </Link>
                                </li>                                    
                            </ul>
                        </div>
                        <div className="Navigation__side">
                            <div className="Navigation__item">
                                <a href="/" className="Navigation__link link link__main Navigation__link--pop">
                                    <BiUser className="Navigation__icon" />
                                </a>
                                <Tooltip>{t('nav.favorites')}</Tooltip>
                            </div>
                            <div className="Navigation__item">
                                <a href="/" className="link link__main Navigation__link Navigation__link--pop">
                                    <span>2</span>
                                    <BiStar className="Navigation__icon" />
                                </a>
                                <Tooltip>{t('nav.cart')}</Tooltip>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </nav>
        </React.Fragment>
    );
};

export default React.memo(Navigation);