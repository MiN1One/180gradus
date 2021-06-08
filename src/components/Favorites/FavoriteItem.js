import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTranslation } from 'react-i18next';
import { BiPlus } from 'react-icons/bi';
import { Link, useHistory } from 'react-router-dom';

const FavoriteItem = ({ data, edit, add, remove, media }) => {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <div className="pos-rel">
      <div 
          className="Modal__item" 
          onClick={() => {
              if (media) 
                  history.push(`/categories/${data.type}/${data.category}/${data.deviceId}`);
          }}>
            <div className="flex aic">
                <figure className="Modal__figure">
                    <LazyLoadImage
                        className="img"
                        src={`/images/${data.image}`}
                        alt={data.name}
                        width="100%"
                        height="100%"
                        effect="opacity" />
                </figure>
                <div className="flex fdc">
                    <span className="Modal__name">{data.name}</span>
                    <span className="Modal__name--sub">{data.device}&nbsp;&nbsp;&bull;&nbsp;&nbsp;{t(`nav.${data.type}`)}</span>
                </div>
            </div>
      </div>
      <div className="Modal__btn-group">
        {edit 
            ? (
              <button className="btn btn__pill btn__pill--red" onClick={remove}>
                {t('main.remove')}
              </button>
            )
            : (
                <div className="flex">
                    {!media && 
                        <Link to={`/categories/${data.type}/${data.category}/${data.deviceId}`} className="btn btn__pill btn__pill--yellow mr-1">
                          {t('nav.collection')}
                        </Link>
                    }
                    <button className="btn btn__pill" onClick={add}>
                        {t('main.to cart')}
                        <BiPlus className="ml-5 icon--sm" />
                    </button>
                </div>
            )
        }
      </div>
    </div>
  )
};

export default FavoriteItem;