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

const Categories = ({ categories }) => {
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
        const categoryQuery = params.category ? `category=${params.category}` : '';
        if (mounted.current) {
            setLoading(true);
            axiosInstance(`/skins?${categoryQuery}&project=default,device,deviceVendor,type`)
                .then((res) => {
                    setLoading(false);
                    setData(res.devices);
                });
        }
    }, [params.category]);

    const onInputSearch = (search, e) => {

        if (e) {
            e.preventDefault();
            setLoading(true);
        } else setSearchLoading(true);

        setSearchInput(search);

        setTimeout(() => {
            if (search !== '' && mounted.current) {
                axiosInstance(`/skins?search=${search}`)
                    .then((res) => {
                        if (e) {
                            setLoading(false);
                            setData(res.devices);
                            setSearchResults(null);
                        } else setSearchResults(res.devices);
                        setSearchLoading(false);
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

    const cards = (data && data.length) && data.map((el, i) => (
        <Card data={el} key={i} />
    ));

    const categoryItems = (categories && !params.category) && categories.map((el, i) => (
        <Card data={el} key={i} />
    ));

    const searchItems = searchResults && searchResults.map((el, i) => (
        <Link to={`/skins${category}/${el._id}`} className="input__drop-item" key={i}>
            <figure className="input__figure">
                <img className="img" src={`http://localhost:3003/assets/images/${el.default}`} alt={el.device} />
            </figure>
            <div className="flex fdc">
                <span className="text--sm c-black">{el.device}</span>
                <span className="text--xs c-grey">{t(`nav.${el.type}`)}</span>
            </div>
        </Link>
    ));

    return (
        <section className="Categories">
            <div className="container">
                <div className="Categories__head Categories__head--main">
                    <h1 className="heading heading--1 Categories__heading--main">
                        {params.category ? t(`nav.${params.category}`) : t('nav.categories')}
                    </h1>
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
                                    : <>{(searchItems && searchItems.length) ? searchItems : t('main.no results')}</>
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
                    {!params.category &&
                        <section className="Categories__group">
                            {categoryItems}
                        </section>
                        }
                    <div className="Categories__head" id="popular">
                        <h2 className="heading heading--main mr-1">{params.category ? t('nav.popular') : t('nav.all skins')}</h2>
                    </div>
                    <section className="Categories__group">
                        {cards}
                    </section>
                </div>
                <div className="Categories__footer">
                    
                </div>
            </div>
        </section>
    );
};

export default Categories;