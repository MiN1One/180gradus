import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import * as actions from '../../store/actions';
import Modal, { ModalCartItem } from '../../UI/Modal/Modal';

const Cart = ({ t, close, onRemoveFromCart, cart, onAddToCart }) => {
    const [editMode, setEditMode] = useState(false);
    const [cartItems, setCartItems] = useState([ ...cart ])
    const history = useHistory();

    useEffect(() => setCartItems([ ...cart ]), [cart]);

    const onRevertChanges = () => {
        setCartItems(cart);
        setEditMode(false);
    };

    const onApplyChanges = () => {
        cartItems.forEach(el => onAddToCart(el));
        setEditMode(false);
    };

    const items = cart.length !== 0 && cart.map((el, i) => (
        <ModalCartItem 
            key={i}
            data={el}
            edit={editMode}
            remove={() => onRemoveFromCart(el._id)} />
    ));

    const totalPrice = cart.length !== 0 && cart.reduce((acc, el) => acc + parseFloat(el.price), 0);

    return (
        <Modal
            actionTitle={t('main.proceed')}
            primary={() => history.push('/summary')}
            title={t('nav.cart')}
            cancel={onRevertChanges}
            price={totalPrice && totalPrice.toFixed(2)}
            close={() => {
                close(false);
                setEditMode(false);
            }}
            editSave={() => editMode ? onApplyChanges() : setEditMode(true)}
            edit={editMode}>
                {items}
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