import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/actions';

const useEditFavorites = () => {
  const { favorites } = useSelector(s => s);
  const dispatch = useDispatch();

  const isFavorite = useCallback((id) => {
    return favorites.findIndex(el => el._id === id) !== -1;
  }, [favorites]);

  const editFavorites = useCallback((skin) => {
    let newList = [...favorites];

    if (isFavorite(skin._id)) {
      newList = newList.filter(el => el._id !== skin._id);
    } else if (favorites.length < 10) {
      newList.push(skin);
    }

    dispatch(actions.setData('favorites', newList));
    localStorage.setItem('favorites', JSON.stringify(newList));

  }, [favorites, dispatch, isFavorite]);
  
  return {
    favorites,
    isFavorite,
    editFavorites
  };
}

export default useEditFavorites;
