import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import useEditCart from '../../hooks/useEditCart';
import * as actions from '../../store/actions';

import Modal, { ModalCartItem } from '../../UI/Modal/Modal';

const Cart = ({ t, close }) => {
    const { cart } = useEditCart();

    const [editMode, setEditMode] = useState(false);
    const [cartItems, setCartItems] = useState([ ...cart ]);
    const [removedItems, setRemovedItems] = useState([]);

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => setCartItems([ ...cart ]), [cart]);

    const onRevertChanges = () => {
        setCartItems(cart);
        setEditMode(false);
        setRemovedItems([]);
    };

    const onApplyChanges = () => {
        // removedItems.forEach(el => {
        //     editCart(el);
        //     console.log(el);
        // });
        let newCart = [...cart];
        removedItems.forEach(r => {
            newCart = newCart.filter(el => el._id !== r._id);
        });
        dispatch(actions.setData('cart', newCart));
        sessionStorage.setItem('cart', JSON.stringify(newCart));
        setEditMode(false);
        setRemovedItems([]);
    };

    const removeItem = (id) => {
        const item = cartItems.find(el => el._id === id);
        setRemovedItems(prev => [...prev, item && item]);
        
        const newList = cartItems.filter(el => el._id !== id);
        setCartItems(newList);
    };

    const items = cartItems.map((el) => (
        <ModalCartItem 
            key={el._id}
            data={el}
            edit={editMode}
            remove={() => removeItem(el._id)} />
    ));

    const totalPrice = cart.length !== 0 && cart.reduce((acc, el) => acc + parseFloat(el.price), 0);

    console.log(removedItems)

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

export default React.memo(Cart);