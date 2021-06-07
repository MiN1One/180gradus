import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import useEditCart from '../../hooks/useEditCart';
import useEditFavorites from '../../hooks/useEditFavorites';

import * as actions from '../../store/actions';
import Modal, { ModalFavItem } from '../../UI/Modal/Modal';

const Favorites = ({ t, close, media }) => {
    const dispatch = useDispatch();

    const { editFavorites, favorites } = useEditFavorites();
    const { editCart } = useEditCart();

    const [editMode, setEditMode] = useState(false);
    const [favItems, setFavItems] = useState([ ...favorites ]);
    const [removedItems, setRemovedItems] = useState([]);

    useEffect(() => setFavItems([ ...favorites ]), [favorites]);

    const onRevertChanges = () => {
        setFavItems(favorites);
        setEditMode(false);
        setRemovedItems([]);
    };

    const onApplyChanges = () => {
        removedItems.forEach(el => editFavorites(el));
        let newFavorites = [...favorites];
        removedItems.forEach(r => {
            newFavorites = newFavorites.filter(el => el._id !== r._id);
        });
        dispatch(actions.setData('favorites', newFavorites));
        setEditMode(false);
        setRemovedItems([]);
    };

    const removeFromFav = (id) => {
        const removed = favItems.find(el => el._id === id);
        const newList = favItems.filter(el => el._id !== id);
        setRemovedItems(prevState => [...prevState, removed && removed]);
        setFavItems(newList);
    };

    const favoriteItems = favItems.map((el, i) => (
        <ModalFavItem
            key={el._id}
            media={media} 
            data={el}
            edit={editMode}
            add={() => editCart(el)}
            remove={() => removeFromFav(el._id)} />
    ));

    return (
        <Modal
            actionTitle={editMode ? t('main.save') : t('main.edit')}
            editSave={() => editMode ? onApplyChanges() : setEditMode(true)}
            title={t('nav.favorites')}
            edit={editMode}
            cancel={onRevertChanges}
            close={() => {
                close(false);
                setEditMode(false);
            }}>
                {favorites.length > 0 && favoriteItems}
        </Modal>
    );
};

const state = state => ({
    favorites: state.favorites,
    media: state.media.mid
});

export default React.memo(connect(state)(Favorites));