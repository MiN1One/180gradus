import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import Modal, { ModalFavItem } from '../../UI/Modal/Modal';

const Favorites = ({ t, close, onRemoveAddToFav, onAddToCart, favorites, media }) => {
    const [editMode, setEditMode] = useState(false);
    const [favItems, setFavItems] = useState([ ...favorites ]);

    useEffect(() => setFavItems([ ...favorites ]), [favorites]);

    const onRevertChanges = () => {
        setFavItems(favorites);
        setEditMode(false);
    };

    const onApplyChanges = () => {
        favItems.forEach(el => onAddToCart(el));
        setEditMode(false);
    };

    const favoriteItems = favorites.map((el, i) => (
        <ModalFavItem
            key={i}
            media={media} 
            data={el}
            edit={editMode}
            add={() => onAddToCart(el)}
            remove={() => onRemoveAddToFav(el)} />
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
                {favoriteItems}
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