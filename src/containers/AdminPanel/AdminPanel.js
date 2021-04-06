import { useEffect, useState } from 'react';
import { NavLink, Route, Switch, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './AdminPanel.scss';
import logo from '../../assets/logo.png';

const AdminPanel = () => {
    const history = useHistory();
    const { t } = useTranslation();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        if (!authorized) history.push('/admin/auth');
        else history.push('/admin');
    }, [authorized, history]);

    return (
        <>
            <Switch>
                <Route path="/admin/auth"><Auth onAuth={() => setAuthorized(true)} /></Route>
                <Route path="/admin">
                    <section className="admin">
                        <div className="container">
                            <div className="admin__wrapper">
                                <nav className="admin__nav" role="navigation">
                                    <NavLink 
                                        to="/admin" 
                                        activeClassName="admin__link--active" 
                                        exact 
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
                                    
                                </div>
                            </div>
                        </div>
                    </section>
                </Route>
            </Switch>
        </>
    );
};

const Auth = ({ onAuth }) => {
    const { t } = useTranslation();
    const [login, setLogin] = useState('admin');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const onLogin = (e) => {
        e.preventDefault();
        
        onAuth();
    };

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
                            <label className="auth__label">
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