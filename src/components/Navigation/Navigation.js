import React, { useEffect, useState } from 'react';
import { BiCart, BiStar } from 'react-icons/bi';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './Navigation.scss';
import vivo from '../../assets/images/Vivo X50.png';
import Tooltip from '../../UI/Tooltip/Tooltip';
import Logo from '../../UI/Logo/Logo';
import Modal, { ModalFavItem } from '../../UI/Modal/Modal';

const Navigation = (props) => {
    const { t } = useTranslation();
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        setFavView(false);
        setCartView(false);
    }, [location.pathname]);

    useEffect(() => {
        
    });

    const [favView, setFavView] = useState(false);
    const [cartView, setCartView] = useState(false);
    const [summaryView, setSummaryView] = useState(true);

    const [tempFavs, setTempFavs] = useState({  });
    const [tempCart, setTempCart] = useState({  });

    const [favEditMode, setFavEditMode] = useState(false);
    const [cartEditMode, setCartEditMode] = useState(false);

    const onSaveFavorites = () => {
        if (favEditMode) {
            
        } else {

        }
    };

    const onSaveCartPurchases = () => {
        if (cartEditMode) {

        } else {

        }
    };
            
    return (
        <>
            {favView &&
                <Modal
                    actionTitle={favEditMode ? t('main.save') : t('main.edit')}
                    click={() => setFavEditMode(!favEditMode)}
                    title={t('nav.favorites')}
                    close={() => {
                            setFavView(false);
                            setFavEditMode(false);
                        }}>
                            <ModalFavItem 
                                data={{
                                    id: 'someid',
                                    img: vivo,
                                    title: 'Black Flowers',
                                    device: 'Vivo X50'
                                }}
                                edit={favEditMode}
                                add={() => {}}
                                remove={() => {}} />
                            <ModalFavItem 
                                data={{
                                    id: 'someid',
                                    img: vivo,
                                    title: 'Black Flowers',
                                    device: 'Vivo X50'
                                }}
                                edit={favEditMode}
                                add={() => {}}
                                remove={() => {}} />
                            <ModalFavItem 
                                data={{
                                    id: 'someid',
                                    img: vivo,
                                    title: 'Black Flowers',
                                    device: 'Vivo X50'
                                }}
                                edit={favEditMode}
                                add={() => {}}
                                remove={() => {}} />
                            <ModalFavItem 
                                data={{
                                    id: 'someid',
                                    img: vivo,
                                    title: 'Black Flowers',
                                    device: 'Vivo X50'
                                }}
                                edit={favEditMode}
                                add={() => {}}
                                remove={() => {}} />
                            <ModalFavItem 
                                data={{
                                    id: 'someid',
                                    img: vivo,
                                    title: 'Black Flowers',
                                    device: 'Vivo X50'
                                }}
                                edit={favEditMode}
                                add={() => {}}
                                remove={() => {}} />
                            <ModalFavItem 
                                data={{
                                    id: 'someid',
                                    img: vivo,
                                    title: 'Black Flowers',
                                    device: 'Vivo X50'
                                }}
                                edit={favEditMode}
                                add={() => {}}
                                remove={() => {}} />
                </Modal>
            }
            {cartView &&
                <Modal
                    actionTitle={t('main.proceed')}
                    click={() => history.push('/summary')}
                    title={t('nav.cart')}
                    close={() => {
                            setCartView(false);
                            setCartEditMode(false);
                        }}
                    subClick={() => setCartEditMode(!cartEditMode)}
                    edit={cartEditMode}>
                        <ModalFavItem 
                            data={{
                                id: 'someid',
                                img: vivo,
                                title: 'Black Flowers',
                                device: 'Vivo X50',
                                price: '$5.99'
                            }}
                            edit={cartEditMode}
                            cart
                            add={() => {}}
                            remove={() => {}} />
                        <ModalFavItem 
                            data={{
                                id: 'someid',
                                img: vivo,
                                title: 'Black Flowers',
                                device: 'Vivo X50',
                                price: '$5.99'
                            }}
                            edit={cartEditMode}
                            cart
                            add={() => {}}
                            remove={() => {}} />
                        <ModalFavItem 
                            data={{
                                id: 'someid',
                                img: vivo,
                                title: 'Black Flowers',
                                device: 'Vivo X50',
                                price: '$5.99'
                            }}
                            edit={cartEditMode}
                            cart
                            add={() => {}}
                            remove={() => {}} />
                        <ModalFavItem 
                            data={{
                                id: 'someid',
                                img: vivo,
                                title: 'Black Flowers',
                                device: 'Vivo X50',
                                price: '$5.99'
                            }}
                            edit={cartEditMode}
                            cart
                            add={() => {}}
                            remove={() => {}} />
                        <ModalFavItem 
                            data={{
                                id: 'someid',
                                img: vivo,
                                title: 'Black Flowers',
                                device: 'Vivo X50',
                                price: '$5.99'
                            }}
                            edit={cartEditMode}
                            cart
                            add={() => {}}
                            remove={() => {}} />
                </Modal>
            }
            <nav className={`Navigation ${props.class || ''}`}>
                <div className="container">
                    <div className="Navigation__content">
                        <div className="Navigation__side">
                            <div className="Navigation__logo">
                                <Logo />
                            </div>
                            <ul className="Navigation__list">
                                <li className="Navigation__item">
                                    <Link 
                                        to="/categories/skins"
                                        className="Navigation__link">
                                        {t('nav.skins')}
                                    </Link>
                                </li>                                    
                                <li className="Navigation__item">
                                    <Link 
                                        to="/categories/phones"
                                        className="Navigation__link">
                                        {t('nav.phones')}
                                    </Link>
                                </li>                                    
                                <li className="Navigation__item">
                                    <Link 
                                        to="/categories/laptops"
                                        className="Navigation__link">
                                        {t('nav.laptops')}
                                    </Link>
                                </li>                                    
                                <li className="Navigation__item">
                                    <Link 
                                        to="/categories/consoles"
                                        className="Navigation__link">
                                        {t('nav.consoles')}
                                    </Link>
                                </li>                                    
                                <li className="Navigation__item">
                                    <Link 
                                        to="/categories/exclusive"
                                        className="Navigation__link">
                                        {t('nav.exclusive edition')}
                                    </Link>
                                </li>                                    
                                <li className="Navigation__item">
                                    <Link 
                                        to="/180degrees/about"
                                        className="Navigation__link">
                                        {t('nav.about')}
                                    </Link>
                                </li>                                    
                            </ul>
                        </div>
                        <div className="Navigation__side">
                            <div className="Navigation__item">
                                <button 
                                    className="Navigation__link Navigation__link--pop" 
                                    onClick={() => {
                                        setCartView(true);
                                        setFavEditMode(false);
                                        }}>
                                        <BiCart className="Navigation__icon" />
                                </button>
                                <Tooltip>{t('nav.cart')}</Tooltip>
                            </div>
                            <div className="Navigation__item">
                                <button 
                                    className="Navigation__link Navigation__link--pop" 
                                    onClick={() => {
                                        setFavView(true);
                                        setFavEditMode(false);
                                        }}>
                                        <span>2</span>
                                        <BiStar className="Navigation__icon" />
                                </button>
                                <Tooltip>{t('nav.favorites')}</Tooltip>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </nav>
        </>
    );
};

export default React.memo(Navigation);