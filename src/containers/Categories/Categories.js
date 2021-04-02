import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BiSearch, BiX } from 'react-icons/bi';
import { useHistory, useParams } from 'react-router-dom';

import Card from '../../components/Card/Card';
import axiosInstance from '../../axios';
import './Categories.scss';
import Error from '../../containers/Error/Error';
import SubSpinner from '../../UI/SubSpinner/SubSpinner';

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
    const [data, setData] = useState(null);
    
    useEffect(() => {
        if (mounted.current) {

            if (params.category) {
                const categoryId = categories && categories.find(el => el.name === params.category);
                categoryId && axiosInstance(`/categories/${categoryId._id}?project=devices`)
                    .then((res) => {
                        console.log(res);
                        setData(res.data.devices);
                    });
            } else {
                axiosInstance('/skins')
                    .then((res) => {
                        setData(res.data);
                    });
            }
        }
    }, [params.category, categories]);

    const onInputSearch = (search, e) => {

        if (e) {
            e.preventDefault();
        } else setSearchLoading(true);

        setSearchInput(search);

        if (search !== '' && mounted.current) {
            axiosInstance(`/skins?search=${search}`)
                .then((res) => {
                    if (e) {
                        setData(res.data);
                        setSearchResults(null);
                    } else setSearchResults(res.data);
                    setSearchLoading(false);
                });
        }
    };

    const cards = (data && data.length !== 0) && data.map((el, i) => (
        <Card data={el} key={i} />
    ));

    const categoryItems = (categories && !params.category) && categories.map((el, i) => (
        <Card data={el} key={i} />
    ));
    
    const searchItems = searchResults && searchResults.map((el, i) => {
        const category = categories && categories.find(cat => cat._id === el.category).name;

        return (
            <div className="input__drop-item" key={i} onMouseDown={() => history.push(`/categories/skins/${category}/${el._id}`)}>
                <figure className="input__figure">
                    <img className="img" src={`http://localhost:3003/assets/images/${el.default}`} alt={el.device} />
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