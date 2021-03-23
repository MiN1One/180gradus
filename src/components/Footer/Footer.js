import React from 'react';
import { useLocation, useParams } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
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
        languages.push((
            <div 
                tabIndex="0" 
                className="Footer__drop-item" 
                key={key}
                onMouseDown={() => {i18n.changeLanguage(key); console.log(key)}}>
                    {languageList[key]}
            </div>
        ));
    }

    return (
        <footer className="Footer">
            <div className="Footer__head">
                <div className="container w-100">
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
                        <div className="pos-rel Footer__language--desktop">
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
                    <div className="flex jcsb w-100 aic fwrap fwrap--ss z pos-rel">
                        <div className="flex aic mb-15">
                            <span className="text text--mid text--cap flex mr-1 tc">{t('main.find us on')}:</span>
                            <div className="flex">
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
                        </div>
                        <Link to="/180degrees/contact" className="mb-15 btn btn__ghost btn__ghost--active">
                            {t('main.contact us')}
                        </Link>
                        <div className="Footer__language--mob pos-rel mb-15 ml-15">
                            <button className="Footer__language btn btn__ghost btn__ghost--active">
                                <BiGlobe className="icon--grey icon mr-5" />
                                {languageList[i18n.language]}
                            </button>
                            <div className="Footer__lang-drop">
                                {languages}
                            </div>
                        </div>
                    </div>
                    <div className="Footer__body">
                        <div className="flex fdc aic mb-lg">
                            <div className="flex aic fdc mb-3">
                                <span className="text text--mid text--cap">{t('nav.popular')}:</span>
                                <ul className="flex mt-2 fwrap fwrap--sm">
                                    <li className="Footer__item">
                                        <NavLink className="btn btn__pill btn__pill--yellow Footer__tag" activeClassName="Footer__tag--active" to="/categories/phones/samsungs21">
                                            Samsung s21
                                        </NavLink>
                                    </li>
                                    <li className="Footer__item">
                                        <NavLink className="btn btn__pill btn__pill--yellow Footer__tag" activeClassName="Footer__tag--active" to="/categories/phones/apple12">
                                            Iphone 12
                                        </NavLink>
                                    </li>
                                    <li className="Footer__item">
                                        <NavLink className="btn btn__pill btn__pill--yellow Footer__tag" activeClassName="Footer__tag--active" to="/categories/phones/Vivo-x50">
                                            Vivo X50
                                        </NavLink>
                                    </li>
                                    <li className="Footer__item">
                                        <NavLink className="btn btn__pill btn__pill--yellow Footer__tag" activeClassName="Footer__tag--active" to="/categories/phones/ps5">
                                            PS 5
                                        </NavLink>
                                    </li>
                                    <li className="Footer__item">
                                        <NavLink className="btn btn__pill btn__pill--yellow Footer__tag" activeClassName="Footer__tag--active" to="/categories/phones/xiaomi10">
                                            Xiaomi Mi10
                                        </NavLink>
                                    </li>
                                    <li className="Footer__item">
                                        <NavLink className="btn btn__pill btn__pill--yellow Footer__tag" activeClassName="Footer__tag--active" to="/categories/phones/huaweip40">
                                            Huawei P40
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                            <p className="text text--main c-grey-l Footer__text">
                                You can contact us at any convenient for you time via phone 71-200-0060 or email 180gradus@enter.org
                            </p>
                        </div>
                        <div className="flex fwrap mb-2 fwrap--ss">
                            <Link className="text Footer__link" to="/180degrees/about">{t('nav.about')}</Link>
                            <Link className="text Footer__link" to="/180degrees/about">{t('nav.privacy')}</Link>
                            <Link className="text Footer__link" to="/180degrees/about">{t('nav.help')}</Link>
                            <Link className="text Footer__link" to="/180degrees/about">{t('nav.delivery')}</Link>
                            <Link className="text Footer__link" to="/180degrees/about">{t('nav.refund')}</Link>
                        </div>
                        <div className="text text--main c-grey tc">
                            &copy;180Gradus {year}. {t('main.reserved')}
                        </div>
                        <a href="https://www.linkedin.com/in/nodirbek-ulashev-765a28201/" target="_blank" rel="noopener noreferrer" className="Footer__appdev">MiN1One &bull; Dev</a>
                    </div>
                </div>
            </div>
        </footer>
    )
};

export default React.memo(Footer);