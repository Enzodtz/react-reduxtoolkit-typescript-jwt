import { CartType } from "common/types/cart";

function save(cart: CartType) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function load() {
  // @ts-ignore
  return JSON.parse(localStorage.getItem("cart"));
}

const cartService = {
  load,
  save,
};
export default cartService;
