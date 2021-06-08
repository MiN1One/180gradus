import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router';
import { BiChevronLeft } from 'react-icons/bi';

import logo from '../../assets/logo.png';
import './Info.scss';
import React from 'react';

const Info = () => {
    const { t } = useTranslation();
    const params = useParams();
    const history = useHistory();

    return (
        <section className="Info">
            <div className="main-head">
                <div className="container">
                    <div className="flex aic">
                        <button className="btn btn__square mr-2" onClick={() => history.goBack()}>
                            <BiChevronLeft className="icon--lg icon--dark" /> 
                        </button>
                        <h2 className="heading heading--1 heading--black">
                            {t(`nav.${params.category}`)}
                        </h2>
                    </div>
                </div>
            </div>
            <div className="section-body">
                <div className="container">
                    <div className="flex aic">
                        <figure className="Info__logo-figure">
                            <img className="Info__logo-img" src={logo} alt="180Gradus" />
                        </figure>
                        <div className="">
                            <h3 className="heading heading--main c-white mb-2">{t('about.prem materials')}</h3>
                            <p className="text text--main"></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default React.memo(Info);