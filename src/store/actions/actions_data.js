import actionTypes from './actionTypes';

export const addToFavorites = (skin) => ({
    type: actionTypes.ON_ADD_TO_FAVORITES,
    skin
});

export const addToCart = (skin) => ({
    type: actionTypes.ON_ADD_TO_CART,
    skin
});

export const setMedia = (bp, value) => ({
    type: actionTypes.ON_SET_MEDIA,
    bp,
    value
});

export const removeFromCart = (skinId) => ({
    type: actionTypes.ON_REMOVE_FROM_CART,
    skinId
});

export const setData = (name, value) => ({
    type: actionTypes.ON_SET_DATA,
    name, 
    value
});
