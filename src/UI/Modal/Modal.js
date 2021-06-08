import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import { BiX } from 'react-icons/bi';

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
                        {props.children || 
                            <p className="Modal__text">
                                {t('main.nothing here')}
                            </p>
                        }
                    </div>
                </Scrollbars>
                <div className="Modal__footer">
                    {props.children &&
                        <div className="flex aic">
                            {props.price &&
                                <span className="price-tag mr-1">
                                    {t('main.total')}: ${props.price}
                                </span>
                            }
                            {props.edit &&
                                <button className="btn btn__ghost btn__ghost--active Modal__btn" onClick={() => props.cancel()}>
                                    {t('main.cancel')}
                                </button>
                            }
                            {props.editSave &&
                                <button className="btn btn__ghost btn__ghost--active Modal__btn" onClick={() => props.editSave()}>
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

