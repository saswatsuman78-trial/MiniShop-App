export const calculateDiscountedPrice = (
  price: number,
  discountPercentage: number
) => {
  return (
    price -
    (price * discountPercentage) /
      100
  );
};

export const formatPrice = (
  price: number
) => {
  return `$${price.toFixed(2)}`;
};