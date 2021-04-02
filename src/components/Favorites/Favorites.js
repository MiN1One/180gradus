import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import Modal, { ModalFavItem } from '../../UI/Modal/Modal';

const Favorites = ({ t, close, onRemoveAddToFav, onAddToCart, favorites, media }) => {
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
        removedItems.forEach(el => onRemoveAddToFav(el));
        setEditMode(false);
        setRemovedItems([]);
    };

    const removeFromFav = (id) => {
        const removed = favItems.find(el => el._id === id);
        const newList = favItems.filter(el => el._id !== id);
        setFavItems(newList);
        setRemovedItems(prevState => [...prevState, removed && removed]);
    };

    const favoriteItems = favItems.map((el, i) => (
        <ModalFavItem
            key={i}
            media={media} 
            data={el}
            edit={editMode}
            add={() => onAddToCart(el)}
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
                {favorites.length !== 0 && favoriteItems}
        </Modal>
    );
};

const state = state => ({
    favorites: state.favorites,
    media: state.media.mid
});

const dispatch = (dispatch) => ({
    onAddToCart: (skin) => dispatch(actions.addToCart(skin)),
    onRemoveAddToFav: (skin) => dispatch(actions.addToFavorites(skin))
});

export default React.memo(connect(state, dispatch)(Favorites));