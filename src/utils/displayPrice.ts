export default function displayPrice(price: number) {
  return (
    "R$ " +
    price.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
    })
  );
}
