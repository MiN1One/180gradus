import React from 'react';
import { useTranslation } from 'react-i18next';
import './Navigation';

const Navigation = () => {
    const { t } = useTranslation();

    return (
        <nav role="nav" className="m-nav">
            
        </nav>
    );
};

export default React.memo(Navigation);