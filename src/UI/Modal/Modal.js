import { Scrollbars } from 'react-custom-scrollbars';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTranslation } from 'react-i18next';
import { BiX, BiPlus } from 'react-icons/bi';
import { Link, useHistory } from 'react-router-dom';

import './Modal.scss';
import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) => {
    const { t } = useTranslation();
    
    return (
        <>
            <Backdrop close={props.close} z={100} />
            <div className="Modal">
                <div className="Modal__head">
                    <h3 className="Modal__title heading heading--main">{props.title}</h3>
                    <button className="btn btn__circle" onClick={props.close}>
                        <BiX className="icon" />
                    </button>
                </div>
                <Scrollbars className="Modal__body">
                    <div className="Modal__wrapper">
                        {props.children}
                    </div>
                </Scrollbars>
                <div className="Modal__footer">
                    {!props.loading &&
                        <div className="flex aic">
                            {props.price &&
                                <span className="price-tag mr-1">
                                    {t('main.total')}: ${props.price}
                                </span>
                            }
                            {props.edit &&
                                <button className="btn btn__ghost btn__ghost--active Modal__btn mr-1" onClick={() => props.cancel()}>
                                    {t('main.cancel')}
                                </button>
                            }
                            {props.editSave &&
                                <button className="btn btn__ghost btn__ghost--active Modal__btn mr-1" onClick={() => props.editSave()}>
                                    {props.edit ? t('main.save') : t('main.edit')}
                                </button>
                            }
                            {(props.primary && !props.edit) &&
                                <button className="btn btn__ghost btn__ghost--active Modal__btn" onClick={() => props.primary()}>
                                    {props.actionTitle}
                                </button>
                            }
                        </div>
                    }
                </div>
            </div>
        </>
    );
};

export default Modal;

export const ModalFavItem = ({ data, edit, add, remove, media }) => {
    const { t } = useTranslation();
    const history = useHistory();

    return (
        <div 
            className="Modal__item" 
            onClick={() => {
                if (media) history.push(`/categories/${data.category}/${data.id}`);
            }}>
                <div className="flex aic">
                    <figure className="Modal__figure">
                        <LazyLoadImage
                            className="img"
                            src={data.img}
                            alt={data.title}
                            width="100%"
                            height="100%"
                            effect="opacity" />
                    </figure>
                    <div className="flex fdc">
                        <span className="Modal__name">{data.title}</span>
                        <span className="Modal__name--sub">{data.device}&nbsp;&nbsp;&bull;&nbsp;&nbsp;{t('nav.skins')}</span>
                    </div>
                </div>
                {edit 
                    ? <button className="btn btn__pill btn__pill--red" onClick={() => remove(data.id)}>
                        {t('main.remove')}
                    </button>
                    : (
                        <div className="flex">
                            {!media && 
                                <Link to={`/categories/${data.category}/${data.id}`} className="btn btn__pill btn__pill--yellow mr-1">
                                    {t('nav.collection')}
                                </Link>
                            }
                            <button className="btn btn__pill" onClick={() => add()}>
                                {t('main.to cart')}
                                <BiPlus className="ml-5 icon--sm" />
                            </button>
                        </div>
                    )
                }
        </div>
    )
};

export const ModalCartItem = ({ data, edit, remove }) => {
    const { t } = useTranslation();
    const history = useHistory();

    return (
        <div className="Modal__item" >
            <div className="flex aic">
                <figure className="Modal__figure">
                    <LazyLoadImage
                        className="img"
                        src={data.img}
                        alt={data.title}
                        width="100%"
                        height="100%"
                        effect="opacity" />
                </figure>
                <div className="flex fdc">
                    <span className="Modal__name">{data.title}</span>
                    <span className="Modal__name--sub">{data.device}&nbsp;&nbsp;&bull;&nbsp;&nbsp;{t('nav.skins')}</span>
                </div>
            </div>
            {edit 
                ? <button className="btn btn__pill btn__pill--red" onClick={() => remove(data.id)}>
                    {t('main.remove')}
                </button>
                : <span className="price-tag">{data.price}</span>
            }
        </div>
    )
};