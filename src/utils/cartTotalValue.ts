import { CartType } from "common/types/cart";

export default function cartTotalValue(cart: CartType) {
  let value = 0;
  cart.forEach((item) => {
    value += item.quantity * item.product.price;
  });
  return value;
}
