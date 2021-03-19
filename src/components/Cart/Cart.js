import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';

import Modal, { ModalFavItem } from '../../UI/Modal/Modal';
import vivo from '../../assets/images/Vivo X50.png';
import axiosInstance from '../../axios';
import SubSpinner from '../../UI/SubSpinner/SubSpinner';

const Cart = ({ t, close }) => {
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const history = useHistory();

    const mounted = useRef();

    useEffect(() => {
        mounted.current = true;
        // axiosInstance('')
        setLoading(true);
        setTimeout(() => setLoading(false), 2000);
        return () => mounted.current = false;
    }, []);

    return (
        <Modal
            actionTitle={t('main.proceed')}
            click={() => history.push('/summary')}
            title={t('nav.cart')}
            loading={loading}
            close={() => {
                    close(false);
                    setEditMode(false);
                }}
            subClick={() => setEditMode(!editMode)}
            edit={editMode}>
                {loading 
                    ? <SubSpinner className="Modal__spinner" />
                    : <>
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
                    </>
                }
        </Modal>
    );
};

export default React.memo(Cart);