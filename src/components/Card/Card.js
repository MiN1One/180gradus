import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './Card.scss';

const Card = ({ data }) => {
    const { t } = useTranslation();
    const categoriesList = useSelector(state => state.categories);

    const category = data.category && categoriesList.find(el => el._id === data.category);
    const categoryName = category && category.name;

    return (
        <Link 
            to={`/categories/skins/${data.category ? `${categoryName}/${data._id}` : data.name}`} 
            className="Card"
            data-premium={data.exclusive || false}>
                <div className="Card__head">
                    <figure className="Card__figure">
                        <LazyLoadImage
                            src={`/images/${data.image || data.default}`}
                            alt={data.name || data.device}
                            width="100%"
                            height="100%"
                            className="Card__img" />
                    </figure>
                </div>
                <div className="Card__body">
                    <span className="heading heading--sm tc">{data.name ? t(`nav.${data.name}`) : data.device}</span>
                    <span className="heading heading--sub mt-1 tc">{t(`nav.${data.type}`)}</span>
                </div>
        </Link>
    );
};

export default Card;