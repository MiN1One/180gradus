import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BiSearch, BiX } from 'react-icons/bi';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import x50 from '../../assets/images/Vivo X50.png';
import Card from '../../components/Card/Card';
import axiosInstance from '../../axios';
import './Categories.scss';
import SubSpinner from '../../UI/SubSpinner/SubSpinner';
import Spinner from '../../UI/Spinner/Spinner';

const Categories = () => {
    const { t } = useTranslation();
    const params = useParams();

    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    const [searchLoading, setSearchLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    
    const category = params.category ? `/${params.category}` : '';

    const mounted = useRef();
    useEffect(() => {
        mounted.current = true;
        return () => mounted.current = false;
    }, []);
    
    useEffect(() => {
        if (mounted.current) {
            setLoading(true);
            axiosInstance(`/skins${category}`)
                .then((res) => {
                    console.log(res);
                    setLoading(false);
                    setData(res);
                });
        }
    }, [category, params.category]);

    const onInputSearch = (search, e) => {

        if (e) {
            e.preventDefault();
            setLoading(true)
        } else setSearchLoading(true);

        setSearchInput(search);

        setTimeout(() => {
            if (search !== '' && mounted.current) {
                axiosInstance(`/skins${category}?search=${search}`)
                    .then((res) => {
                        if (e) {
                            setLoading(false);
                            setData(res);
                            setSearchResults(null);
                        } else setSearchResults(res);
                        setSearchLoading(false);
                        console.log(res);
                    });
            }
        }, 850);
    };

    const skin = {
        source: x50,
        title: 'Vivo X50',
        category: params.category,
        popular: false,
        premium: false,
        favorite: false
    };

    if (loading) return <Spinner />;

    return (
        <section className="Categories">
            <div className="container">
                <div className="Categories__head Categories__head--main">
                    <h1 className="heading heading--1 Categories__heading--main">{params.category ? t(`nav.${params.category}`) : t('nav.categories')}</h1>
                    <form className="Categories__form" onSubmit={(e) => onInputSearch(searchInput, e)}>
                        <input 
                            className="input input--searchbar" 
                            type="text"
                            value={searchInput}
                            placeholder={t('main.search')}
                            onChange={(e) => onInputSearch(e.target.value)} />
                        <button type="submit" className="Categories__search-btn">
                            <BiSearch className="icon icon--dark" />
                        </button>
                        {searchInput && 
                            <div className="input__dropdown">
                                {searchLoading 
                                    ? <SubSpinner className="loading--sm" />
                                    : <>
                                        <Link to={`/categories/${params.category}/vivox50`} className="input__drop-item">
                                            <figure className="input__figure">
                                                <img className="img" src={x50} alt="vivo" />
                                            </figure>
                                            <div className="flex fdc">
                                                <span className="text--sm c-black">Vivo X50</span>
                                                <span className="text--xs c-grey">{t('nav.skins')}</span>
                                            </div>
                                        </Link>
                                        <Link to={`/categories/${params.category}/vivox50`} className="input__drop-item">
                                            <figure className="input__figure">
                                                <img className="img" src={x50} alt="vivo" />
                                            </figure>
                                            <div className="flex fdc">
                                                <span className="text--sm c-black">Vivo X50</span>
                                                <span className="text--xs c-grey">{t('nav.skins')}</span>
                                            </div>
                                        </Link>
                                        <Link to={`/categories/${params.category}/vivox50`} className="input__drop-item">
                                            <figure className="input__figure">
                                                <img className="img" src={x50} alt="vivo" />
                                            </figure>
                                            <div className="flex fdc">
                                                <span className="text--sm c-black">Vivo X50</span>
                                                <span className="text--xs c-grey">{t('nav.skins')}</span>
                                            </div>
                                        </Link>
                                    </>
                                }
                            </div>
                        }
                        <button 
                            className="input--clear-btn" 
                            type="button"
                            onClick={() => {
                                setSearchInput('');
                                setSearchResults(null);
                            }}>
                            <BiX className="icon icon--dark" />
                        </button>
                    </form>
                </div>
                <div className="Categories__body">
                    {params.category &&
                        <div className="Categories__head" id="popular">
                            <h2 className="heading heading--main mr-1">{t('nav.popular')}</h2>
                        </div>
                    }
                    <section className="Categories__group">
                        <Card data={skin} />
                        <Card data={skin} />
                        <Card data={skin} />
                        <Card data={skin} />
                        <Card data={skin} />
                        <Card data={skin} />
                        <Card data={skin} />
                        <Card data={skin} />
                    </section>
                </div>
                <div className="Categories__footer">
                    
                </div>
            </div>
        </section>
    );
};

export default Categories;