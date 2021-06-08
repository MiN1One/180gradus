import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BiSearch, BiX } from 'react-icons/bi';
import { useHistory, useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';

import Card from '../../components/Card/Card';
import axiosInstance from '../../axios';
import './Categories.scss';
import Error from '../../containers/Error/Error';
import SubSpinner from '../../UI/SubSpinner/SubSpinner';
import Spinner from '../../UI/Spinner/Spinner';

const Categories = ({ categories }) => {

    const mounted = useRef();
    useEffect(() => {
        mounted.current = true;
        return () => mounted.current = false;
    }, []);

    const { t } = useTranslation();
    const params = useParams();
    const history = useHistory();
    
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    const [searchLoading, setSearchLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    const fetchData = useCallback(() => {
        if (mounted.current) {
            setLoading(true);
            if (params.category) {
                const categoryId = categories && categories.find(el => el.name === params.category);
                categoryId && axiosInstance(`/categories/${categoryId._id}?project=devices`)
                    .then(({ data }) => {
                        setData(data.data.data.devices);
                        setLoading(false);
                    });
            } else {
                axiosInstance('/skins')
                    .then(({ data }) => {
                        setData(data.data.data);
                        setLoading(false);
                    });
            }
        }
    }, [categories, params.category]);
    
    useEffect(() => {
        fetchData();
    }, [params.category, categories, fetchData]);

    // const handleScroll = (e) => {
    //     const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    // };

    const onInputSearch = (search, e) => {

        if (e) e.preventDefault();
        setSearchLoading(true);

        setSearchInput(search);

        if (search !== '' && mounted.current) {
            axiosInstance(`/skins?search=${search}`)
                .then(({ data }) => {
                    if (e) {
                        setData(data.data.data);
                        setSearchResults(null);
                    } else setSearchResults(data.data.data);
                    setSearchLoading(false);
                });
        }
    };

    const cards = (data && data.length > 0) && data.map((el, i) => (
        <Card data={el} key={nanoid()} />
    ));

    const categoryItems = (categories && !params.category) && categories.map((el, i) => (
        <Card data={el} key={nanoid()} />
    ));
    
    const searchItems = searchResults && searchResults.map((el, i) => {
        const category = categories && categories.find(cat => cat._id === el.category);

        return (
            <div className="input__drop-item" key={nanoid()} onMouseDown={() => history.push(`/categories/skins/${category && category.name}/${el._id}`)}>
                <figure className="input__figure">
                    <img className="img" src={`/images/${el.default}`} alt={el.device} />
                </figure>
                <div className="flex fdc">
                    <span className="text--sm c-black">{el.device}</span>
                    <span className="text--xs c-grey">{t(`nav.${el.type}`)}</span>
                </div>
            </div>
        )
    });

    const catExists = (categories && params.category) && categories.findIndex((el) => el.name === params.category) !== -1;
    if (!catExists && mounted.current && params.category) return <Error notFound />;

    if (loading)
        return <Spinner />;

    return (
        <section className="Categories">
            <div className="container">
                <div className="Categories__head Categories__head--main">
                    <h1 className="heading heading--1 Categories__heading--main">
                        {params.category 
                            ? ((data && data.length > 0) && t(`nav.${params.category}`) )
                            : t('nav.categories')
                        }
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
                                    : (searchItems && searchItems.length) ? searchItems : t('main.no results')
                                }
                            </div>
                        }
                        <button 
                            className="input--clear-btn" 
                            type="button"
                            onClick={() => {
                                setSearchInput('');
                                fetchData();
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
                    <div className="Categories__head">
                        <h2 className="heading heading--main mr-1">
                            {params.category 
                                ? ((data && data.length > 0) && t('nav.popular'))
                                : t(`nav.all ${params.type}`)
                            }
                        </h2>
                    </div>
                    {data && data.length > 0
                        ? <section className="Categories__group pos-rel">
                            {cards}
                        </section>
                        : <div className="Categories__empty">
                            <h1 className="Categories__heading--grace">
                                {t(`nav.${params.category}`)}
                            </h1>
                            <h5 className="Categories__heading--sub">
                                {t('main.coming soon')}
                            </h5>
                        </div>
                    }
                </div>
                {/* <div className="Categories__footer">
                    
                </div> */}
            </div>
        </section>
    );
};

export default Categories;