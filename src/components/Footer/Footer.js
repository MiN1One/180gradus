import React from 'react';
import { useParams } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { FaInstagram, FaTelegramPlane, FaFacebookF, FaYoutube } from 'react-icons/fa';
import { BiHome, BiGlobe } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import './Footer.scss';


const Footer = () => {
    const { t, i18n } = useTranslation();
    const { categories, popular } = useSelector(state => state);
    const device = useSelector(state => state.data);
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
                onMouseDown={() => i18n.changeLanguage(key)}>
                    {languageList[key]}
            </div>
        ));
    }

    const categoryType = categories && categories.find(el => el.name === params.category);
    const popularDevices = popular && popular.map((el, i) => {
        const category = categories && categories.find(cat => cat._id === el.category);
        return (
            <li className="Footer__item" key={i}>
                <NavLink 
                    className="btn btn__pill btn__pill--yellow Footer__tag" 
                    activeClassName="Footer__tag--active" 
                    to={`/categories/${el.type}/${category && category.name}/${el._id}`}>
                        {el.device}
                </NavLink>
            </li>
        )
    });

    return (
        <footer className="Footer">
            <div className="Footer__head">
                <div className="container w-100">
                    <div className="w-100 flex aic jcsb">
                        <div className="flex aic text--wrap">
                            <Link to="/" className="Footer__bread-item">
                                <BiHome className="icon icon--grey mr-1" />
                                {t('nav.home')}
                            </Link>
                            {params.category &&
                                <>
                                    <span className="text--main mr-1 c-grey">&bull;</span>
                                    {!params.id
                                        ? <span className="Footer__bread-item Footer__bread-item--active">
                                            {t(`nav.${params.category}`)}
                                        </span>
                                        : <Link to={`/categories/${categoryType && categoryType.type}/${params.category}`} className="Footer__bread-item text--wrap">
                                            {t(`nav.${params.category}`)}
                                        </Link>
                                    }
                                </>
                            }
                            {params.id &&
                                <>
                                    <span className="text--main mr-1 c-grey">&bull;</span>
                                    <span className="Footer__bread-item Footer__bread-item--active">
                                        {device}
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
            <div className="container z pos-rel">
                <div className="Footer__content">
                    <div className="flex jcsb w-100 aic fwrap fwrap--ss pos-rel">
                        <div className="flex aic mb-15">
                            <span className="text text--mid text--cap flex mr-1 tc">{t('main.find us')}:</span>
                            <div className="flex">
                                <a href="/" className="btn btn__ghost mr-5">
                                    <FaInstagram className="icon--mid Footer__i" />
                                </a>
                                <a href="/" className="btn btn__ghost mr-5">
                                    <FaTelegramPlane className="icon--mid Footer__i" />
                                </a>
                                <a href="/" className="btn btn__ghost mr-5">
                                    <FaFacebookF className="icon--mid Footer__i" />
                                </a>
                                <a href="/" className="btn btn__ghost mr-5">
                                    <FaYoutube className="icon--mid Footer__i" />
                                </a>
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
                        <div className="flex fdc aic mb-3">
                            {popularDevices && popularDevices.length > 0 &&
                                <div className="flex aic fdc mb-3">
                                    <span className="text text--mid text--cap">{t('nav.popular')}:</span>
                                    <ul className="flex mt-2 fwrap fwrap--sm">
                                        {popularDevices}
                                    </ul>
                                </div>
                            }
                            <p className="text text--main c-grey-l Footer__text">
                                {t('text.contact')}
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