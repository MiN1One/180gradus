import actionTypes from '../actions/actionTypes';

const initialState = {
    favorites: JSON.parse(localStorage.getItem('favorites')) || [],
    cart: JSON.parse(sessionStorage.getItem('skins')) || [],
    error: null,
    media: {
        mid: false,
        sm: false
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ON_ADD_TO_FAVORITES:

            let newList = [...state.favorites];
            const existing = state.favorites.findIndex(el => el === action.skinId) !== -1;    
            if (existing) newList = newList.filter(el => el !== action.skinId);
            else newList.push(action.skinId);
            localStorage.setItem('favorites', JSON.stringify(newList));

            return { ...state, favorites: newList };

        case actionTypes.ON_ERROR: return { ...state, error: action.error };

        case actionTypes.ON_ADD_TO_CART: 
            const exists = state.cart.findIndex(el => el === action.skinId) !== -1;
            if (exists) return { ...state };
            const newArr = [...state.cart, action.skinId];
            sessionStorage.setItem('skins', JSON.stringify(newArr));
            return { ...state, cart: newArr };

        case actionTypes.ON_SET_MEDIA: 
            return { 
                ...state, 
                media: { 
                    ...state.media,
                    [action.bp]: action.value
                }
            } 

        default: return state;
    }
};

export default reducer;