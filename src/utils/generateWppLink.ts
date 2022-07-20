import { CartType } from "common/types/cart";
import cartTotalValue from "./cartTotalValue";
import displayPrice from "./displayPrice";

const WPP_URL = "https://api.whatsapp.com/send?phone=5511995226333&text=";

export default function generateWppLink(cart: CartType) {
  let message =
    "Olá, Maria Fernanda! \n\nAtravés do seu site, selecionei os seguintes produtos que gostaria de adquirir:\n";
  cart.forEach((item) => {
    message +=
      item.quantity +
      "x " +
      item.product.name +
      " (" +
      displayPrice(item.product.price * item.quantity) +
      ")\n";
  });
  message += "Total: " + cartTotalValue(cart);

  message += "\n\n Obrigado(a)!";
  return WPP_URL + encodeURIComponent(message);
}
