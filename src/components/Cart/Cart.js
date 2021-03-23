import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import * as actions from '../../store/actions';
import Modal, { ModalCartItem } from '../../UI/Modal/Modal';
import vivo from '../../assets/images/Vivo X50.png';
import axiosInstance from '../../axios';
import SubSpinner from '../../UI/SubSpinner/SubSpinner';

const Cart = ({ t, close, onRemoveFromCart, cart, onAddToCart }) => {
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [cartItems, setCartItems] = useState([ ...cart ])
    const history = useHistory();

    const mounted = useRef();

    useEffect(() => setCartItems([ ...cart ]), [cart]);

    useEffect(() => {
        mounted.current = true;
        // axiosInstance('')
        setLoading(true);
        setTimeout(() => setLoading(false), 2000);
        return () => mounted.current = false;
    }, []);

    const onRevertChanges = () => {
        setCartItems(cart);
        setEditMode(false);
    };

    const onApplyChanges = () => {
        cartItems.forEach(el => onAddToCart(el));
        setEditMode(false);
    };

    const data = {
        id: 'someid',
        img: vivo,
        title: 'Black Flowers',
        device: 'Vivo X50',
        price: '5.99'
    };

    return (
        <Modal
            actionTitle={t('main.proceed')}
            primary={() => history.push('/summary')}
            title={t('nav.cart')}
            loading={loading}
            cancel={onRevertChanges}
            price="37.99"
            close={() => {
                close(false);
                setEditMode(false);
            }}
            editSave={() => editMode ? onApplyChanges() : setEditMode(true)}
            edit={editMode}>
                {loading 
                    ? <SubSpinner className="Modal__spinner" />
                    : <>
                        <ModalCartItem 
                            data={data}
                            edit={editMode}
                            remove={() => onRemoveFromCart(1)} />
                        <ModalCartItem 
                            data={data}
                            edit={editMode}
                            remove={() => onRemoveFromCart(1)} />
                        <ModalCartItem 
                            data={data}
                            edit={editMode}
                            remove={() => onRemoveFromCart(1)} />
                        <ModalCartItem 
                            data={data}
                            edit={editMode}
                            remove={() => onRemoveFromCart(1)} />
                        <ModalCartItem 
                            data={data}
                            edit={editMode}
                            remove={() => onRemoveFromCart(1)} />
                        <ModalCartItem 
                            data={data}
                            edit={editMode}
                            remove={() => onRemoveFromCart(1)} />
                        <ModalCartItem 
                            data={data}
                            edit={editMode}
                            remove={() => onRemoveFromCart(1)} />
                        <ModalCartItem 
                            data={data}
                            edit={editMode}
                            remove={() => onRemoveFromCart(1)} />
                    </>
                }
        </Modal>
    );
};

const state = (state) => ({
    cart: state.cart
});

const dispatch = (dispatch) => ({
    onRemoveFromCart: (id) => dispatch(actions.removeFromCart(id)),
    onAddToCart: (id) => dispatch(actions.addToCart(id))
});

export default React.memo(connect(state, dispatch)(Cart));