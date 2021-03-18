import { useTranslation } from "react-i18next";
import { BiChevronLeft } from 'react-icons/bi';
import { Link } from "react-router-dom";

import './Error.scss';

const Er = ({ er, clean }) => {
    const { t } = useTranslation();

    return (
        <div className="Er">
            <div className="main-head">
                <div className="container">
                    <div className="flex aic">
                        <button className="btn btn__square mr-2" onClick={() => clean()}>
                            <BiChevronLeft className="icon--lg icon--dark" /> 
                        </button>
                        <h2 className="heading heading--1 heading--black">{t('main.error')}</h2>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="Er__body">
                    <p className="heading heading--main c-white mb-5">{er}</p>
                    <p className="text text--mid mb-2">This might be due to poor internet connection or server error.</p>
                    <div className="flex">
                        <Link 
                            to="/" 
                            className="btn btn__ghost btn__ghost--active mr-15" 
                            onClick={() => clean()}>
                                {t('nav.home')}
                        </Link>
                        <Link 
                            to="/180degrees/trouble" 
                            className="btn btn__ghost btn__ghost--active"
                            onClick={() => clean()}>
                                {t('nav.troubleshooting')}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Er;