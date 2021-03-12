import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BiSearch, BiX } from 'react-icons/bi';
import { Link, useHistory, useParams } from 'react-router-dom';

import x50 from '../../assets/images/Vivo X50.png';
import './Categories.scss';

const Categories = () => {
    const { t } = useTranslation();
    const params = useParams();
    const history = useHistory();

    useEffect(() => {
        if (history.location.hash) {
            const element = document.getElementById(history.location.hash.substr(1));
            if (element) {
                element.scrollIntoView();
                element.scrollTop -= 75;
                // Array.from(document.querySelectorAll('.Categories__group'))[2].scrollTop -= 75;
            }
        }
    }, [history.location.hash]);

    return (
        <header className="Categories">
            <div className="container">
                <div className="Categories__head">
                    <h2 className="heading heading--main">{t(`nav.${params.category}`)}</h2>
                    <form className="Categories__form" onSubmit={(e) => e.preventDefault()}>
                        <input 
                            className="input input--searchbar" 
                            type="text"
                            placeholder={t('main.search')} />
                        <button className="Categories__search-btn">
                            <BiSearch className="icon icon--dark" />
                        </button>
                        <button className="input--searchbar-btn">
                            <BiX className="icon icon--dark" />
                        </button>
                    </form>
                </div>
                <div className="Categories__body">
                    <section className="Categories__group">
                        <Link to={`/categories/${params.category}/Vivo-x50`} className="Categories__card">
                            <div className="Categories__card-head">
                                <figure className="Categories__card-figure">
                                    <img className="Categories__card-img" src={x50} alt="x50" />
                                </figure>
                            </div>
                            <div className="Categories__card-body">
                                <span className="heading heading--sm tc">Vivo X50</span>
                                <span className="heading heading--sub mt-1 tc">Skins</span>
                            </div>
                        </Link>
                        <Link to={`/categories/${params.category}/Vivo-x50`} className="Categories__card">
                            <div className="Categories__card-head">
                                <figure className="Categories__card-figure">
                                    <img className="Categories__card-img" src={x50} alt="x50" />
                                </figure>
                            </div>
                            <div className="Categories__card-body">
                                <span className="heading heading--sm tc">Vivo X50</span>
                                <span className="heading heading--sub mt-1 tc">Skins</span>
                            </div>
                        </Link>
                        <Link to={`/categories/${params.category}/Vivo-x50`} className="Categories__card">
                            <div className="Categories__card-head">
                                <figure className="Categories__card-figure">
                                    <img className="Categories__card-img" src={x50} alt="x50" />
                                </figure>
                            </div>
                            <div className="Categories__card-body">
                                <span className="heading heading--sm tc">Vivo X50</span>
                                <span className="heading heading--sub mt-1 tc">Skins</span>
                            </div>
                        </Link>
                        <Link to={`/categories/${params.category}/Vivo-x50`} className="Categories__card">
                            <div className="Categories__card-head">
                                <figure className="Categories__card-figure">
                                    <img className="Categories__card-img" src={x50} alt="x50" />
                                </figure>
                            </div>
                            <div className="Categories__card-body">
                                <span className="heading heading--sm tc">Vivo X50</span>
                                <span className="heading heading--sub mt-1 tc">Skins</span>
                            </div>
                        </Link>
                        <Link to={`/categories/${params.category}/Vivo-x50`} className="Categories__card">
                            <div className="Categories__card-head">
                                <figure className="Categories__card-figure">
                                    <img className="Categories__card-img" src={x50} alt="x50" />
                                </figure>
                            </div>
                            <div className="Categories__card-body">
                                <span className="heading heading--sm tc">Vivo X50</span>
                                <span className="heading heading--sub mt-1 tc">Skins</span>
                            </div>
                        </Link>
                        <Link to={`/categories/${params.category}/Vivo-x50`} className="Categories__card">
                            <div className="Categories__card-head">
                                <figure className="Categories__card-figure">
                                    <img className="Categories__card-img" src={x50} alt="x50" />
                                </figure>
                            </div>
                            <div className="Categories__card-body">
                                <span className="heading heading--sm tc">Vivo X50</span>
                                <span className="heading heading--sub mt-1 tc">Skins</span>
                            </div>
                        </Link>
                        <Link to={`/categories/${params.category}/Vivo-x50`} className="Categories__card">
                            <div className="Categories__card-head">
                                <figure className="Categories__card-figure">
                                    <img className="Categories__card-img" src={x50} alt="x50" />
                                </figure>
                            </div>
                            <div className="Categories__card-body">
                                <span className="heading heading--sm tc">Vivo X50</span>
                                <span className="heading heading--sub mt-1 tc">Skins</span>
                            </div>
                        </Link>
                        <Link to={`/categories/${params.category}/Vivo-x50`} className="Categories__card">
                            <div className="Categories__card-head">
                                <figure className="Categories__card-figure">
                                    <img className="Categories__card-img" src={x50} alt="x50" />
                                </figure>
                            </div>
                            <div className="Categories__card-body">
                                <span className="heading heading--sm tc">Vivo X50</span>
                                <span className="heading heading--sub mt-1 tc">Skins</span>
                            </div>
                        </Link>
                    </section>
                    <div className="Categories__head" id="popular">
                        <h2 className="heading heading--main">{t('nav.popular')}</h2>
                    </div>
                    <section className="Categories__group">
                        <Link to={`/categories/${params.category}/Vivo-x50`} className="Categories__card">
                            <div className="Categories__card-head">
                                <figure className="Categories__card-figure">
                                    <img className="Categories__card-img" src={x50} alt="x50" />
                                </figure>
                            </div>
                            <div className="Categories__card-body">
                                <span className="heading heading--sm tc">Vivo X50</span>
                                <span className="heading heading--sub mt-1 tc">Skins</span>
                            </div>
                        </Link>
                    </section>
                    <div className="Categories__head" id="favorites">
                        <h2 className="heading heading--main">{t('nav.favorites')}</h2>
                    </div>
                    <section className="Categories__group">
                        <Link to={`/categories/${params.category}/Vivo-x50`} className="Categories__card">
                            <div className="Categories__card-head">
                                <figure className="Categories__card-figure">
                                    <img className="Categories__card-img" src={x50} alt="x50" />
                                </figure>
                            </div>
                            <div className="Categories__card-body">
                                <span className="heading heading--sm tc">Vivo X50</span>
                                <span className="heading heading--sub mt-1 tc">Skins</span>
                            </div>
                        </Link>
                        <Link to={`/categories/${params.category}/Vivo-x50`} className="Categories__card">
                            <div className="Categories__card-head">
                                <figure className="Categories__card-figure">
                                    <img className="Categories__card-img" src={x50} alt="x50" />
                                </figure>
                            </div>
                            <div className="Categories__card-body">
                                <span className="heading heading--sm tc">Vivo X50</span>
                                <span className="heading heading--sub mt-1 tc">Skins</span>
                            </div>
                        </Link>
                    </section>
                </div>
                <div className="Categories__footer">

                </div>
            </div>
        </header>
    );
};

export default Categories;