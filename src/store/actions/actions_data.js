import actionTypes from './actionTypes';

export const addToFavorites = (skinId) => ({
    type: actionTypes.ON_ADD_TO_FAVORITES,
    skinId
});

