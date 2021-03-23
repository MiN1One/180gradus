import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import Modal, { ModalFavItem } from '../../UI/Modal/Modal';
import vivo from '../../assets/images/Vivo X50.png';
import SubSpinner from '../../UI/SubSpinner/SubSpinner';

const Favorites = ({ t, close, onRemoveAddToFav, onAddToCart, favorites, media }) => {
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [favItems, setFavItems] = useState([ ...favorites ]);

    const mounted = useRef();

    useEffect(() => {
        mounted.current = true;
        setLoading(true);
        setTimeout(() => setLoading(false), 2000);
        return () => mounted.current = false;
    }, []);

    useEffect(() => setFavItems([ ...favorites ]), [favorites]);

    const onRevertChanges = () => {
        setFavItems(favorites);
        setEditMode(false);
    };

    const onApplyChanges = () => {
        favItems.forEach(el => onAddToCart(el));
        setEditMode(false);
    };

    const data = {
        id: 'someid',
        img: vivo,
        title: 'Black Flowers',
        device: 'Vivo X50'
    };

    return (
        <Modal
            actionTitle={editMode ? t('main.save') : t('main.edit')}
            editSave={() => editMode ? onApplyChanges() : setEditMode(true)}
            title={t('nav.favorites')}
            edit={editMode}
            cancel={onRevertChanges}
            loading={loading}
            close={() => {
                close(false);
                setEditMode(false);
            }}>
                {loading
                    ? <SubSpinner className="Modal__spinner" />
                    : <>
                        <ModalFavItem
                            media={media} 
                            data={data}
                            edit={editMode}
                            add={() => onAddToCart(1)}
                            remove={() => onRemoveAddToFav(1)} />
                        <ModalFavItem
                            media={media} 
                            data={data}
                            edit={editMode}
                            add={() => onAddToCart(1)}
                            remove={() => onRemoveAddToFav(1)} />
                        <ModalFavItem
                            media={media} 
                            data={data}
                            edit={editMode}
                            add={() => onAddToCart(1)}
                            remove={() => onRemoveAddToFav(1)} />
                        <ModalFavItem
                            media={media} 
                            data={data}
                            edit={editMode}
                            add={() => onAddToCart(1)}
                            remove={() => onRemoveAddToFav(1)} />
                        <ModalFavItem
                            media={media} 
                            data={data}
                            edit={editMode}
                            add={() => onAddToCart(1)}
                            remove={() => onRemoveAddToFav(1)} />
                        <ModalFavItem
                            media={media} 
                            data={data}
                            edit={editMode}
                            add={() => onAddToCart(1)}
                            remove={() => onRemoveAddToFav(1)} />
                    </>
                }
        </Modal>
    );
};

const state = state => ({
    favorites: state.favorites,
    media: state.media.mid
});

const dispatch = (dispatch) => ({
    onAddToCart: (id) => dispatch(actions.addToCart(id)),
    onRemoveAddToFav: (id) => dispatch(actions.addToFavorites(id))
});

export default React.memo(connect(state, dispatch)(Favorites));