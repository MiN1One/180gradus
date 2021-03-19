import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import './Main.scss';
import axiosInstance from '../../../axios';

const Main = () => {
    const { t } = useTranslation();
    const [selectedSkin, setSelectedSkin] = useState(null);

    const mounted = useRef();
    useEffect(() => {
        mounted.current = true;

        return () => mounted.current = false;
    }, []);

    return (
        <section className="m-main">
            
        </section>
    );
};

export default React.memo(Main);