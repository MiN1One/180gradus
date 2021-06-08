import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTranslation } from 'react-i18next';

const CartItem = ({ data, edit, remove }) => {
  const { t } = useTranslation();

  return (
      <div className="Modal__item" >
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
                  <span className="Modal__name--sub">
                    {data.device}&nbsp;&nbsp;&bull;&nbsp;&nbsp;{t('nav.skins')}
                  </span>
              </div>
          </div>
          {edit 
              ? (
                <button className="btn btn__pill btn__pill--red" onClick={remove}>
                  {t('main.remove')}
                </button>
              )
              : (
                <span className="price-tag">
                  ${parseFloat(data.price).toFixed(2)}
                </span>
              )
          }
      </div>
  )
};

export default CartItem;