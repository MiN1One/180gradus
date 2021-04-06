import React from "react";
import { connect } from "react-redux";

import Footer from "../../components/Footer/Footer";

const AsyncNavigation = React.lazy(() => import('../../components/Navigation/Navigation'));
const AsyncMobileNav = React.lazy(() => import('../../mobile/components/Navigation/Navigation'));

const Layout = ({ media, children }) => {

    return (
        <>
            {media.sm
                ? <AsyncMobileNav />
                : <AsyncNavigation />
            }
                {children}
            <Footer />
        </>
    );
};

const state = state => ({
    media: state.media
});

export default connect(state)(Layout);