import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';

import './Card.scss';

const Card = ({ data }) => {
    const { t } = useTranslation();

    return (
        <Link 
            to={`/categories/${data.category}/Vivo-x50`} 
            className="Card" 
            data-premium={data.premium}
            data-popular={data.popular}
            data-favorite={data.favorite} >
                <div className="Card__head">
                    <figure className="Card__figure">
                        <LazyLoadImage
                            src={data.source}
                            alt={data.title}
                            width="100%"
                            height="100%"
                            className="Card__img" />
                    </figure>
                </div>
                <div className="Card__body">
                    <span className="heading heading--sm tc">{data.title}</span>
                    <span className="heading heading--sub mt-1 tc">{t(`nav.${data.category}`)}</span>
                </div>
        </Link>
    );
};

export default Card;