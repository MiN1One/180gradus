import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/actions';

const useEditCart = () => {
  const { cart } = useSelector(s => s);
  const dispatch = useDispatch();

  const inTheCart = useCallback((id) => {
    return cart.findIndex(el => el._id === id) !== -1;
  }, [cart]);

  const editCart = useCallback((skin) => {
    let newList = [...cart];

    if (inTheCart(skin._id)) {
      newList = newList.filter(el => el._id !== skin._id);
    } else {
      newList.push(skin);
    }

    dispatch(actions.setData('cart', newList));
    sessionStorage.setItem('cart', JSON.stringify(newList));

  }, [cart, dispatch, inTheCart]);
  
  return {
    cart,
    inTheCart,
    editCart
  };
}

export default useEditCart;
