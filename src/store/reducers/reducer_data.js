import actionTypes from '../actions/actionTypes';

const initialState = {
    favorites: JSON.parse(localStorage.getItem('favorites')) || [],
    cart: JSON.parse(sessionStorage.getItem('cart')) || [],
    media: {
        mid: false,
        sm: false
    },
    categories: null,
    data: null,
    popular: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ON_ADD_TO_FAVORITES:
            let newList = [...state.favorites];
            const existing = state.favorites.length && state.favorites.find(el => el._id === action.skin._id);    
            if (existing) newList = newList.filter(el => el !== existing);
            else if (state.favorites.length < 10) newList.push(action.skin);
            localStorage.setItem('favorites', JSON.stringify(newList));
            return { ...state, favorites: newList };

        case actionTypes.ON_ERROR: return { ...state, error: action.error };

        case actionTypes.ON_ADD_TO_CART: 
            const exists = state.cart.findIndex(el => el._id === action.skin._id) !== -1;
            if (exists) return { ...state };
            const newArr = [...state.cart, action.skin];
            sessionStorage.setItem('cart', JSON.stringify(newArr));
            return { ...state, cart: newArr };

        case actionTypes.ON_REMOVE_FROM_CART:
            const freshArr = state.cart.filter(el => el._id !== action.skinId);
            sessionStorage.setItem('cart', JSON.stringify(freshArr));
            return { ...state, cart: freshArr };

        case actionTypes.ON_SET_MEDIA: 
            return { 
                ...state, 
                media: {
                    ...state.media,
                    [action.bp]: action.value
                }
            }

        case actionTypes.ON_SET_DATA: 
            return { ...state, [action.name]: action.value }

        // case actionTypes.ON_CREATE_NOTIFICATION:
        //     if (state.notificationQue.length === 5) return { ...state };
        //     const messages = [...state.notificationQue, action.message];
        //     return { ...state, notificationQue: messages };

        default: return state;
    }
};

export default reducer;