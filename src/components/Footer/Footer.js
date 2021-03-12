import React from 'react';

import './Footer.scss';

import sprite from '../../assets/icons/sprite.svg';
import social from '../../assets/icons/social.svg';
import { useLocation } from 'react-router';

const Footer = (props) => {
    const location = useLocation();
    const year = new Date().getFullYear();
    
    const langs = ['O\'zbekcha', 'English', 'Русский'];
    const social = ['instagram', 'telegram', 'facebook', 'twitter'];
    const pops = ['Iphone 12', 'OnePlus 8', 'Lenovo Thinkpad 150', 'MacBook 2019', 'Galaxy S10', 'Redmi Note 8'];

    const isHome = location.pathname === '/';

    return (
        <footer className="Footer" style={!isHome ? {position: 'static'} : {position: 'relative'}}>
            <div className="container">
                <div className="Footer__head">
                   
                </div>
            </div>
            
        </footer>
    )
};

export default React.memo(Footer);