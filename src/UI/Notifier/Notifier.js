import { useEffect, useRef, useState } from 'react';
import { useTranslation } from "react-i18next";
import { BiBell, BiX } from "react-icons/bi";
import { useSelector } from 'react-redux';

const Notifier = () => {
    const { t } = useTranslation();
    const { favorites, cart } = useSelector(state => state);
    const [favChanged, setFavChanged] = useState(false);
    const [cartChanged, setCartChanged] = useState(false);

    const prevFavLength = useRef();
    const prevCartLength = useRef();

    const prevFavItems = useRef();
    const prevCartItems = useRef();

    useEffect(() => {
        let timer;
        if (prevFavLength.current < favorites.length) {
            setFavChanged(true);
            timer = setTimeout(() => {
                setFavChanged(false);
            }, 5000);
        }
        return () => clearTimeout(timer);
    }, [favorites.length]);
    
    useEffect(() => {
        let timer;
        if (prevCartLength.current < cart.length) {
            setCartChanged(true);
            timer = setTimeout(() => {
                setCartChanged(false);
            }, 5000);
        }
        return () => clearTimeout(timer);
    }, [cart.length]);

    useEffect(() => {
        prevCartItems.current = [...cart];
        prevCartLength.current = cart.length;
    });

    useEffect(() => {
        prevFavItems.current = [...favorites];
        prevFavLength.current = favorites.length;
    });
    
    return (favChanged || cartChanged) ? (
        <div className="notifier">
            <div className="container pos-rel">
                <div className="notifier__wrapper">
                    <div className="notifier__content">
                        <div className="notifier__message flex aic">
                            <BiBell className="icon--sm mr-1" />
                            {cartChanged
                                ? t('main.added cart')
                                : t('main.added fav')
                            }
                        </div>
                        <button className="btn btn__circle ml-1" onClick={() => {
                            cartChanged && setCartChanged(false);
                            favChanged && setFavChanged(false);
                        }}>
                            <BiX className="icon--sm" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
};

export default Notifier;