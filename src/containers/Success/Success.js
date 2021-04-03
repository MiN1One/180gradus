import React from "react";
import { useTranslation } from "react-i18next";
import { BiChevronLeft } from 'react-icons/bi';
import { Link, useHistory } from "react-router-dom";

import './Success.scss';

const Success = ({ geoMode }) => {
    const { t } = useTranslation();
    const history = useHistory();

    return (
        <section className="Success">
            <div className="container h-100">
                <div className="Success__body">
                    <h1 className="heading heading--1 c-white mb-2">{t('main.success')}</h1>
                    <div className="flex aic">
                        <button className="btn btn__square mr-15" onClick={() => history.goBack()}>
                            <BiChevronLeft className="icon icon--lg icon--dark" />
                        </button>
                        {geoMode
                            ? <p className="text--mid Success__text">
                                {t('main.telegram text')}
                            </p>
                            : <p className="text text--mid Success__text">
                                {t('main.success text.p1')}<Link to="/180degrees/delivery" className="link link--outline">{t('main.success text.p2')}</Link>
                            </p>
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default React.memo(Success);