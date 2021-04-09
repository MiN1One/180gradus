import { useEffect, useState } from 'react';
import { NavLink, Route, Switch, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { BiMinus, BiPencil, BiPlug, BiPlus, BiX } from 'react-icons/bi';
import { Scrollbars } from 'react-custom-scrollbars';

import './AdminPanel.scss';
import axiosInstance from '../../axios';
import Spinner from '../../UI/Spinner/Spinner';
import SubSpinner from '../../UI/SubSpinner/SubSpinner';
import Backdrop from '../../UI/Backdrop/Backdrop';
import ConfirmationModel from '../../UI/Confirm/Confirm';

const AdminPanel = () => {
    const params = useParams();
    const { t } = useTranslation();
    const [authorized, setAuthorized] = useState(false);
    const [token, setToken] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        axiosInstance.defaults.headers.common['Authorization'] = token && `Bearer ${token}`;
    }, [token]);
    
    useEffect(() => {
        if (token) {
            axiosInstance(`/${params.section || 'skins'}`)
                .then(res => {
                    console.log(res);
                    setData(res.data.data.data);
                });
        }
    }, [token, params.section]);

    if (!authorized)
        return <Auth onAuth={(jwt) => {
                setAuthorized(true);
                setToken(jwt);
            }} />;

    return (
        <>
            <section className="admin">
                <div className="container">
                    <div className="admin__wrapper">
                        <nav className="admin__nav" role="navigation">
                            <NavLink 
                                to="/admin" 
                                activeClassName="admin__link--active" 
                                className="admin__link"
                                exact>
                                    {t('nav.dashboard')}
                            </NavLink>
                            <NavLink 
                                to="/admin/skins" 
                                activeClassName="admin__link--active" 
                                className="admin__link">
                                    {t('nav.skins')}
                            </NavLink>
                            <NavLink 
                                to="/admin/orders" 
                                activeClassName="admin__link--active" 
                                className="admin__link">
                                    {t('nav.orders')}
                            </NavLink>
                            <NavLink 
                                to="/admin/categories" 
                                activeClassName="admin__link--active" 
                                className="admin__link">
                                    {t('main.categories')}
                            </NavLink>
                            <NavLink 
                                to="/admin/users" 
                                activeClassName="admin__link--active" 
                                className="admin__link">
                                    {t('nav.users')}
                            </NavLink>
                        </nav>
                        <div className="admin__body">
                            <Switch>
                                <Route path="/admin/skins">
                                    <Skins token={token} />
                                </Route>
                                <Route path="/categories">
                                    Hello
                                </Route>
                                <Route path="/orders">
                                    Hello
                                </Route>
                                <Route path="/users">
                                    Hello
                                </Route>
                            </Switch>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

const Skins = () => {
    const { t } = useTranslation();
    const [data, setData] = useState(null);
    const [panelLoading, setPanelLoading] = useState(false);
    const [loading, setLoading] = useState(false);

    const [addMode, setAddMode] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [viewMode, setViewMode] = useState(false);
    const [selectedSkin, setSelectedSkin] = useState(null);
    const [confirm, setConfirm] = useState(false);
    const [newSkinList, setNewSkinList] = useState([]);

    // modes: add, remove, edit, view

    useEffect(() => {
        // setLoading(true);
        axiosInstance('/skins')
            .then(({ data }) => {
                console.log(data);
                // setLoading(false);
                setData(data.data.data);
            });
    }, []);

    const getSkins = (device) => {
        setPanelLoading(true)
        axiosInstance(`/skins/${device._id}?project=skins`)
            .then(({ data }) => {
                setViewMode({
                    ...device,
                    skins: data.data.data.skins
                });
                setPanelLoading(false);
            });

        setConfirm(null);
    };

    const onRemoveSkin = (id) => {
        const newSkinList = viewMode.skins.filter(el => el._id !== id);
        axiosInstance.patch(`/skins/${viewMode._id}`, { skins: newSkinList })
            .then(res => {
                setViewMode({
                    ...viewMode,
                    skins: newSkinList
                });
                setConfirm(false);
                console.log(res);
            });
    };

    const onAddSkin = () => {
        
    };
        
    const skins = (viewMode && viewMode.skins) && viewMode.skins.map((el, i) => (
        <div 
            className={`admin__panel-item ${(selectedSkin && selectedSkin._id === el._id) ? 'admin__panel-item--active' : ''}`} 
            key={i} 
            tabIndex="0" 
            onClick={() => setSelectedSkin(el)}>
                <div className="flex aic">
                    <figure className="admin__panel-figure">
                        <LazyLoadImage
                            className="img"
                            width="100%"
                            height="100%"
                            alt={el.name}
                            effect="opacity"
                            src={`http://localhost:3003/images/${el.image}`} />
                    </figure>
                    <span className="admin__panel-itemname">{el.name}</span>
                </div>
                <span className="admin__panel-itemprice">${parseFloat(el.price).toFixed(2)}</span>
        </div>
    ));
    
    let panelView = null;
    if (editMode) {
        panelView = (
            <>
                <div className="admin__panel-head flex aic jcsb">
                    <h1 className="heading heaing--main">{t('main.edit')}</h1>
                    <button 
                        className="btn btn__circle" 
                        onClick={() => setEditMode(null)}>
                            <BiX className="icon" />
                    </button>
                </div>
                <div className="admin__panel-body">

                </div>
            </>
        );
    }

    const devices = (data && data.length > 0) && data.map((el, i) => (
        <li 
            className="admin__item pos-rel"
            key={i}>
                <div 
                    className={`admin__card ${(viewMode && el._id === viewMode._id) ? 'admin__card--active' : ''}`} 
                    onClick={() => {
                        setEditMode(false);
                        setAddMode(false);
                        getSkins(el);
                    }} 
                    tabIndex="0">
                        <div className="flex fdc mr-15">
                            <span className="admin__card-title">{el.device}</span>
                            <span className="heading heading--sub c-grey-l">{el.type}</span>
                        </div>
                        <div className="flex">
                            <span className="admin__card-feature">{t('main.num skins')}: {el.skins.length}</span>
                            <span className="admin__card-feature">{t('main.num purchases')}: {el.numberOfPurchases}</span>
                        </div>
                </div>
                <div className="admin__card-sets">
                    <button 
                        className="mr-1 admin__card-btn" 
                        onClick={() => {
                            setEditMode(true);
                            setAddMode(false);
                            setViewMode(null);
                        }}>
                            <BiPencil className="icon--sm" />
                    </button>
                    <button className="admin__card-btn" onClick={() => {}}>
                        <BiX className="icon--sm" />
                    </button>
                </div>
        </li>
    ));

    // if (loading)
    //     return <div className="wh-100 aic flex jcc"><SubSpinner /></div>;

    return (
        <>
            <div className="flex w-100 jce mb-15">
                <button 
                    className="btn btn__ghost btn__ghost--active" 
                    onClick={() => {
                        setAddMode(!addMode);
                        setViewMode(null);
                        setEditMode(false);
                    }}>
                        {addMode ? t('main.save') : t('main.add')}
                </button>
            </div>
            <div className="flex w-100">
                <ul className="admin__list">
                    {devices}
                </ul>
                {addMode && 
                    <div className="admin__panel">
                        <div className="admin__panel-head flex aic jcsb">
                            <h1 className="heading heaing--main">{t('main.add')}</h1>
                            <button 
                                className="btn btn__circle" 
                                onClick={() => setAddMode(false)}>
                                    <BiX className="icon" />
                            </button>
                        </div>
                        <div className="admin__panel-body">

                        </div>
                    </div>
                }
                {viewMode
                    ? <div className="admin__panel">
                        {panelLoading
                            ? <div className="wh-100 flex aic jcc">
                                <SubSpinner />
                            </div>
                            : <>
                                {confirm && 
                                    <ConfirmationModel 
                                        click={() => onRemoveSkin(selectedSkin._id)} 
                                        close={() => setConfirm(false)}
                                        items={`${viewMode.device}, ${selectedSkin.name}`} />
                                }
                                <div className="admin__panel-head flex fdc">
                                    <div className="flex jcsb aic">
                                        <h1 className="heading heaing--main">{viewMode.device}</h1>
                                        <button 
                                            className="btn btn__circle" 
                                            onClick={() => setViewMode(null)}>
                                                <BiX className="icon" />
                                        </button>
                                    </div>
                                    <span className="admin__card-feature">
                                        {t('main.num skins')}: {viewMode.skins.length}; {t('main.avg price')}: ${parseFloat(viewMode.skins.reduce((a, el) => a + parseFloat(el.price), 0) / viewMode.skins.length).toFixed(2)}
                                    </span>
                                </div>
                                <div className="admin__panel-body">
                                    <Scrollbars className="admin__panel-wrapper">
                                        {skins}
                                    </Scrollbars>
                                </div>
                                    <div className="admin__panel-footer">
                                        <button className="admin__card-btn mr-5">
                                            <BiPlus className="icon--sm" />
                                        </button>
                                    {selectedSkin && 
                                        <button 
                                            className="admin__card-btn" 
                                            onClick={() => setConfirm(true)}>
                                                <BiMinus className="icon--sm" />
                                        </button>
                                    }
                                </div>
                            </>
                        }
                    </div>
                    : (!addMode && <div className="admin__panel"></div>)
                }
            </div>
        </>
    );
};

const ActiveItemPanel = ({ close, data }) => {

    return (
        <div className="admin__panel">
            <div className="admin__panel-head flex aic jcsb">
                <h1 className="heading heaing--main">{}</h1>
                <button 
                    className="btn btn__circle" 
                    onClick={close}>
                        <BiX className="icon" />
                </button>
            </div>
            <div className="admin__panel-body">

            </div>
        </div>
    );
};

const Auth = ({ onAuth }) => {
    const { t } = useTranslation();
    const [login, setLogin] = useState('admin');
    const [password, setPassword] = useState('hehe boay');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const onLogin = (e) => {
        e.preventDefault();
        if (login === '' || password === '')
            return setError(t('error.fill all'));
        setLoading(true);
        axiosInstance.post('/users/login', {
            login,
            password
        }).then((res) => {
            console.log(res);
            setLoading(true);
            setError(null);
            onAuth(res.data.token);
        }).catch((er) => {
            console.log(er.response.data.message);
            setError(er.response.data.message);
            setLoading(false);
        });

    };

    if (loading)
        return <Spinner />;

    return (
        <div className="auth">
            <div className="container">
                <div className="auth__wrapper">
                    <div className="auth__content">
                        <div className="auth__head">
                            <h1 className="auth__heading">{t('nav.auth')}</h1>
                            {error && <p className="auth__text--error">{error}</p>}
                        </div>
                        <form className="auth__body" onSubmit={(e) => onLogin(e)}>
                            <label className="auth__label">
                                {t('input.y login')}
                                <input 
                                    className="auth__input" 
                                    placeholder={t('input.login')} 
                                    value={login} 
                                    type="text"
                                    onChange={(e) => setLogin(e.target.value)} />
                            </label>
                            <label className="auth__label mb-2">
                                {t('input.y password')}
                                <input 
                                    className="auth__input" 
                                    placeholder={t('input.password')} 
                                    value={password} 
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)} />
                            </label>
                            <button className="auth__btn">
                                {t('main.log in')}
                            </button>
                        </form>
                    </div>
                    <div className="auth__brand">
                        &copy;180Gradus {new Date().getFullYear()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;

// create skin, orders, all skins, categories, users
// fetch all skins, preview skin, 
// all orders
// all categories, devices per category
// all users, users by type