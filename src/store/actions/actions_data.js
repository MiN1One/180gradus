import actionTypes from './actionTypes';

export const addToFavorites = (skinId) => ({
    type: actionTypes.ON_ADD_TO_FAVORITES,
    skinId
});

export const error = (er) => ({
    type: actionTypes.ON_ERROR,
    error: er
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
