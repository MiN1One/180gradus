import React, { useState } from 'react';

import Modal, { ModalFavItem } from '../../UI/Modal/Modal';
import vivo from '../../assets/images/Vivo X50.png';

const Favorites = ({ t, close }) => {
    const [editMode, setEditMode] = useState(false);

    return (
        <Modal
            actionTitle={editMode ? t('main.save') : t('main.edit')}
            click={() => setEditMode(!editMode)}
            title={t('nav.favorites')}
            close={() => {
                close(false);
                setEditMode(false);
            }}>
                <ModalFavItem 
                    data={{
                        id: 'someid',
                        img: vivo,
                        title: 'Black Flowers',
                        device: 'Vivo X50'
                    }}
                    edit={editMode}
                    add={() => {}}
                    remove={() => {}} />
                <ModalFavItem 
                    data={{
                        id: 'someid',
                        img: vivo,
                        title: 'Black Flowers',
                        device: 'Vivo X50'
                    }}
                    edit={editMode}
                    add={() => {}}
                    remove={() => {}} />
                <ModalFavItem 
                    data={{
                        id: 'someid',
                        img: vivo,
                        title: 'Black Flowers',
                        device: 'Vivo X50'
                    }}
                    edit={editMode}
                    add={() => {}}
                    remove={() => {}} />
                <ModalFavItem 
                    data={{
                        id: 'someid',
                        img: vivo,
                        title: 'Black Flowers',
                        device: 'Vivo X50'
                    }}
                    edit={editMode}
                    add={() => {}}
                    remove={() => {}} />
                <ModalFavItem 
                    data={{
                        id: 'someid',
                        img: vivo,
                        title: 'Black Flowers',
                        device: 'Vivo X50'
                    }}
                    edit={editMode}
                    add={() => {}}
                    remove={() => {}} />
                <ModalFavItem 
                    data={{
                        id: 'someid',
                        img: vivo,
                        title: 'Black Flowers',
                        device: 'Vivo X50'
                    }}
                    edit={editMode}
                    add={() => {}}
                    remove={() => {}} />
        </Modal>
    );
};

export default React.memo(Favorites);