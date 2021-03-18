import React, { useState } from 'react';
import { useHistory } from 'react-router';

import Modal, { ModalFavItem } from '../../UI/Modal/Modal';
import vivo from '../../assets/images/Vivo X50.png';

const Cart = ({ t, close }) => {
    const [editMode, setEditMode] = useState(false);
    const history = useHistory();

    return (
        <Modal
            actionTitle={t('main.proceed')}
            click={() => history.push('/summary')}
            title={t('nav.cart')}
            close={() => {
                    close(false);
                    setEditMode(false);
                }}
            subClick={() => setEditMode(!editMode)}
            edit={editMode}>
                <ModalFavItem 
                    data={{
                        id: 'someid',
                        img: vivo,
                        title: 'Black Flowers',
                        device: 'Vivo X50',
                        price: '$5.99'
                    }}
                    edit={editMode}
                    cart
                    add={() => {}}
                    remove={() => {}} />
                <ModalFavItem 
                    data={{
                        id: 'someid',
                        img: vivo,
                        title: 'Black Flowers',
                        device: 'Vivo X50',
                        price: '$5.99'
                    }}
                    edit={editMode}
                    cart
                    add={() => {}}
                    remove={() => {}} />
                <ModalFavItem 
                    data={{
                        id: 'someid',
                        img: vivo,
                        title: 'Black Flowers',
                        device: 'Vivo X50',
                        price: '$5.99'
                    }}
                    edit={editMode}
                    cart
                    add={() => {}}
                    remove={() => {}} />
                <ModalFavItem 
                    data={{
                        id: 'someid',
                        img: vivo,
                        title: 'Black Flowers',
                        device: 'Vivo X50',
                        price: '$5.99'
                    }}
                    edit={editMode}
                    cart
                    add={() => {}}
                    remove={() => {}} />
                <ModalFavItem 
                    data={{
                        id: 'someid',
                        img: vivo,
                        title: 'Black Flowers',
                        device: 'Vivo X50',
                        price: '$5.99'
                    }}
                    edit={editMode}
                    cart
                    add={() => {}}
                    remove={() => {}} />
        </Modal>
    );
};

export default React.memo(Cart);