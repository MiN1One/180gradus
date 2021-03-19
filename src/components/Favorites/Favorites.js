import React, { useEffect, useRef, useState } from 'react';

import Modal, { ModalFavItem } from '../../UI/Modal/Modal';
import vivo from '../../assets/images/Vivo X50.png';
import SubSpinner from '../../UI/SubSpinner/SubSpinner';

const Favorites = ({ t, close }) => {
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);

    const mounted = useRef();

    useEffect(() => {
        mounted.current = true;
        setLoading(true);
        setTimeout(() => setLoading(false), 2000);
        return () => mounted.current = false;
    }, []);

    return (
        <Modal
            actionTitle={editMode ? t('main.save') : t('main.edit')}
            click={() => setEditMode(!editMode)}
            title={t('nav.favorites')}
            loading={loading}
            close={() => {
                close(false);
                setEditMode(false);
            }}>
                {loading
                    ? <SubSpinner className="Modal__spinner" />
                    : <>
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
                    </>
                }
        </Modal>
    );
};

export default React.memo(Favorites);