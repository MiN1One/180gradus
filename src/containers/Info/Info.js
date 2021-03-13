import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

import './Info.scss';

const Info = () => {
    const { t } = useTranslation();
    const params = useParams();

    return (
        <section className="Info">
            {params.category}
        </section>
    );
};

export default Info;