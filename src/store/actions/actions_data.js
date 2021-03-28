import actionTypes from './actionTypes';

export const addToFavorites = (skinId) => ({
    type: actionTypes.ON_ADD_TO_FAVORITES,
    skinId
});

export const addToCart = (skinId) => ({
    type: actionTypes.ON_ADD_TO_CART,
    skinId
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
