import React from 'react';
import { useLocation, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { FaInstagram, FaTelegramPlane, FaFacebookF, FaYoutube } from 'react-icons/fa';
import { BiChevronRight } from 'react-icons/bi';
import { BiHome, BiGlobe } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';

import './Footer.scss';

import sprite from '../../assets/icons/sprite.svg';
import social from '../../assets/icons/social.svg';

const Footer = (props) => {
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const params = useParams();
    const year = new Date().getFullYear();

    const languageList = {
        en: 'English',
        ru: 'Русский',
        uz: 'O\'zbekcha'
    };

    const languages = [];
    for (let key in languageList) {
        console.log(key)
        languages.push((
            <div 
                tabIndex="0" 
                className="Footer__drop-item" 
                key={key}
                onMouseDown={() => {i18n.changeLanguage(key); console.log(key)}}>
                    {languageList[key]}
            </div>
        ))
    }

    const popularArr = ['Iphone 12', 'OnePlus 8', 'Lenovo Thinkpad', 'MacBook 2019', 'Galaxy S21', 'Redmi Note 8'];
    const sectionsArr = ['Privacy Policy', 'How to buy', 'About us', 'Feedback']

    const isHome = location.pathname === '/';

    const popular = popularArr.map((el, i) => (
        <li className="Footer__item" key={i}>
            <Link to={`/categories/phones/${el}`} className="Footer__link">
                <BiChevronRight className="icon--sm mr-5" />
                {el}
            </Link>
        </li>
    ));

    const sections = sectionsArr.map((el, i) => (
        <li className="Footer__item" key={i}>
            <Link to={`/180degrees/${el}`} className="Footer__link">
                <BiChevronRight className="icon--sm mr-5" />
                {el}
            </Link>
        </li>
    ));

    return (
        <footer className="Footer">
            <div className="Footer__head">
                <div className="container">
                    <div className="w-100 flex aic jcsb">
                        <div className="flex">
                            <Link to="/" className="Footer__bread-item">
                                <BiHome className="icon--mid icon--grey mr-1" />
                                {t('nav.home')}
                            </Link>
                            {params.category &&
                                <>
                                    <span className="Footer__bread-item c-grey">&bull;</span>
                                    {!params.id
                                        ? <span className="Footer__bread-item Footer__bread-item--active">
                                            {t(`nav.${params.category}`)}
                                        </span>
                                        : <Link to={`/categories/${params.category}`} className="Footer__bread-item">
                                            {t(`nav.${params.category}`)}
                                        </Link>
                                    }
                                </>
                            }
                            {params.id &&
                                <>
                                    <span className="Footer__bread-item c-grey">&bull;</span>
                                    <span className="Footer__bread-item Footer__bread-item--active">
                                        {t(`${params.category}.${params.id}`)}
                                    </span>
                                </>
                            }
                        </div>
                        <div className="pos-rel">
                            <button className="Footer__language btn btn__ghost btn__ghost--active">
                                <BiGlobe className="icon--grey icon mr-5" />
                                {languageList[i18n.language]}
                            </button>
                            <div className="Footer__lang-drop">
                                {languages}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="Footer__content">
                    <div className="flex jcsb w-100 aic mb-3">
                        <div className="flex aic">
                            <span className="text text--mid flex mr-1 c-grey-l">{t('main.find us on')}:</span>
                            <Link to="/" className="btn btn__ghost mr-5">
                                <FaInstagram className="icon--mid Footer__i" />
                            </Link>
                            <Link to="/" className="btn btn__ghost mr-5">
                                <FaTelegramPlane className="icon--mid Footer__i" />
                            </Link>
                            <Link to="/" className="btn btn__ghost mr-5">
                                <FaFacebookF className="icon--mid Footer__i" />
                            </Link>
                            <Link to="/" className="btn btn__ghost mr-5">
                                <FaYoutube className="icon--mid Footer__i" />
                            </Link>
                        </div>
                        <Link to="/180degrees/contact" className="btn btn__ghost btn__ghost--active">
                            {t('main.contact us')}
                        </Link>
                    </div>
                    <div className="Footer__body">
                        {/* <div className="">
                            <span className="Footer__title mb-15">
                                {t('nav.More')}:
                            </span>
                            <ul className="Footer__list">{popular}</ul>
                        </div>
                        <div className="">
                            <span className="Footer__title mb-15">
                                {t('nav.popular')}:
                            </span>
                            <ul className="Footer__list">{sections}</ul>
                        </div> */}
                        
                    </div>
                    <div className="Footer__text">
                        &copy;180Gradus {year}. {t('main.reserved')}
                    </div>
                </div>
            </div>
            
        </footer>
    )
};

export default React.memo(Footer);