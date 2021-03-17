import Footer from "../../components/Footer/Footer";
import Navigation from "../../components/Navigation/Navigation";


const Layout = (props) => {

    return (
        <>
            <Navigation />
                {props.children}
            <Footer />
        </>
    );
};

export default Layout;