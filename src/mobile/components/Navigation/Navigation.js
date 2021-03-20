import React from 'react';
import { useTranslation } from 'react-i18next';
import { BiMenu } from 'react-icons/bi';

import Logo from '../../../UI/Logo/Logo';
import './Navigation.scss';

const Navigation = () => {
    const { t } = useTranslation();

    return (
        <nav role="nav" className="m-nav">
            <div className="container">
                <div className="flex jcsb aic">
                    <Logo />
                    <button className="btn btn__pill m-nav__menu">
                        <BiMenu className="icon m-nav__icon" />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default React.memo(Navigation);