import React from "react";
import { useTranslation } from "react-i18next";

import './Success.scss';

const Success = () => {
    const { t } = useTranslation();

    return (
        <section className="Success">
            <div className=""></div>
        </section>
    );
};

export default React.memo(Success);