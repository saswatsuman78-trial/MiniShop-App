import { RootState } from '../index';

export const selectCartItems = (
  state: RootState
) => state.cart.items;

export const selectCartCount = (
  state: RootState
) =>
  state.cart.items.reduce(
    (count, item) =>
      count + item.quantity,
    0
  );

export const selectCartTotal = (
  state: RootState
) =>
  state.cart.items.reduce(
    (total, item) =>
      total +
      item.discountedPrice *
        item.quantity,
    0
  );