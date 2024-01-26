import { useUI } from "$store/sdk/useUI.ts";
import { useCart } from "apps/vtex/hooks/useCart.ts";
import { Props, addToCart } from "./AddToCartButton/common.tsx";

const clearCart = async (props: Props) => {
  const { cart, removeAllItems } = useCart();
  const { orderFormId } = cart.value;
  const { displayCart, displaySellerPopup } = useUI();
  if (!orderFormId) return;
  await removeAllItems(orderFormId);
  await addToCart(props);
  displaySellerPopup.value = null;
  displayCart.value = true;
};

export default function SellerPopup() {
  const { displaySellerPopup } = useUI();

  const product = displaySellerPopup.value;

  return (
    <div
      className={`${
        displaySellerPopup.value !== null ? "flex" : "hidden"
      } fixed w-full h-full top-0 left-0 items-center justify-center z-50`}
      style={{
        backgroundColor: "rgba(0, 0, 0, .4)",
      }}
    >
      {displaySellerPopup.value !== null && (
        <div className="w-[80vw] sm:w-[680px] h-auto bg-white flex flex-col items-center justify-center p-4 rounded-lg">
          <span className="text-base font-medium mb-4 text-black text-center sm:text-left">
            Estamos passando por ajustes para melhor atender nossos
            clientes.<br />Neste momento, você pode comprar produtos somente de um
            vendedor!
          </span>
          <div className="flex flex-col sm:flex-row w-full items-center justify-center sm:justify-between gap-4 sm:gap-0">
            <button
              className="bg-white text-brand border border-brand uppercase text-sm font-medium py-2 px-4 rounded-full"
              onClick={() => displaySellerPopup.value = null}
            >
              Continuar com meu carrinho atual
            </button>
            <button
              className="bg-brand text-white border border-brand uppercase text-sm font-medium py-2 px-4 rounded-full"
              onClick={() => clearCart(product)}
            >
              Comprar apenas do novo vendedor
            </button>
          </div>
        </div>
      )}
    </div>
  );
}