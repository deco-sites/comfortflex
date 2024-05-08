import { useUI } from "$store/sdk/useUI.ts";
import type { Product } from "apps/commerce/types.ts";

export interface Props {
  product: Product;
  price: number;
  discount: number;
  seller: string;
  sellerName: string;
}

export default function AddToCardArea({
  product,
  price,
  discount,
  seller,
  sellerName,
}: Props) {
  const { displayAddToCartPopup } = useUI();

  return (
    <>
      <button 
        class="btn no-animation font-normal uppercase bg-brand text-white hover:bg-brand rounded-3xl"
        onClick={() => {
          displayAddToCartPopup.value = {
            product,
            price,
            discount,
            seller,
          }
        }}
      >
        Adicionar ao carrinho
      </button>
      <div>
        Vendido e Entregue por{" "}
        <span class="uppercase underline">{sellerName}</span>
      </div>
      <p class="text-sm">
        ATENÇÃO: O prazo de entrega começa a contar em até 48h úteis após a
        aprovação do pedido.
      </p>
    </>
  );
}