import React from "react";
import { useTranslation } from "react-i18next";

import './Header.scss';

const Header = () => {
    const { t } = useTranslation();

    return (
        <header className="m-header">

        </header>
    );
};  

export default React.memo(Header);