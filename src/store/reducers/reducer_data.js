import actionTypes from '../actions/actionTypes';

const initialState = {
    // favorites: localStorage.getItem('favorites') || []
    favorites: localStorage.getItem('favorites') || []
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
        default:
    }
};

export default reducer;