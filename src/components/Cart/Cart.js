import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import * as actions from '../../store/actions';
import Modal, { ModalCartItem } from '../../UI/Modal/Modal';

const Cart = ({ t, close, onRemoveFromCart, cart }) => {
    const [editMode, setEditMode] = useState(false);
    const [cartItems, setCartItems] = useState([ ...cart ]);
    const [removedItems, setRemovedItems] = useState([]);
    const history = useHistory();

    useEffect(() => setCartItems([ ...cart ]), [cart]);

    const onRevertChanges = () => {
        setCartItems(cart);
        setEditMode(false);
        setRemovedItems([]);
    };

    const onApplyChanges = () => {
        removedItems.forEach(el => onRemoveFromCart(el));
        setEditMode(false);
        setRemovedItems([]);
    };

    const removeItem = (id) => {
        const newList = cartItems.filter(el => el._id !== id);
        const item = cartItems.find(el => el._id === id)._id;
        setRemovedItems(prevState => [...prevState, item && item]);
        setCartItems(newList);
    };

    const items = cartItems.map((el, i) => (
        <ModalCartItem 
            key={i}
            data={el}
            edit={editMode}
            remove={() => removeItem(el._id)} />
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
                {cart.length !== 0 && items}
        </Modal>
    );
};

const state = (state) => ({
    cart: state.cart
});

const dispatch = (dispatch) => ({
    onRemoveFromCart: (id) => dispatch(actions.removeFromCart(id))
});

export default React.memo(connect(state, dispatch)(Cart));