import { useTranslation } from 'react-i18next';
import Backdrop from '../Backdrop/Backdrop';

const ConfirmationModel = ({ click, close, message, items }) => {
    const { t } = useTranslation();

    return (
        <>
            <Backdrop z={100} close={close} />
            <div className="confirm">
                <div>
                    <p className="confirm__text">{t('main.confirm')}</p>
                    {items && <p className="confirm__text--sub">{t('main.to delete')}: {items}</p>}
                </div>
                <div className="flex w-100 jce">
                    <button className="btn btn__ghost btn__ghost--active mr-1" onClick={click}>
                        {t('main.apply')}
                    </button>
                    <button className="btn btn__ghost btn__ghost--active" onClick={close}>
                        {t('main.cancel')}
                    </button>
                </div>
            </div>
        </>
    );
};

export default ConfirmationModel;