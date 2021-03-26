import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, useParams } from 'react-router-dom';

import './Card.scss';

const Card = ({ data }) => {
    const { t } = useTranslation();
    const params = useParams();
    const category = params.category ? `/${params.category}` : '';

    return (
        <Link 
            to={`/categories/skins${category}/${data.name || data._id}`} 
            className="Card" >
                <div className="Card__head">
                    <figure className="Card__figure">
                        <LazyLoadImage
                            src={`http://localhost:3003/assets/images/${data.image || data.default}`}
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