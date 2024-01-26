import Button from "$store/components/ui/Button.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { useState } from "preact/hooks";
import { useCart } from "apps/vtex/hooks/useCart.ts";

export interface Props {
  /** @description: sku name */
  name: string;
  productID: string;
  productGroupID: string;
  price: number;
  discount: number;
  url: string;
  seller: string;
  onAddItem: () => Promise<void>;
}

export async function addToCart({
  price,
  name,
  discount,
  productID,
  url,
  onAddItem,
}: Props) {
  await onAddItem();

  sendEvent({
    name: "add_to_cart",
    params: {
      items: [{
        quantity: 1,
        price,
        item_url: url,
        item_name: name,
        discount: discount,
        item_id: productID,
        item_variant: name,
      }],
    },
  });
}

const useAddToCart = ({
  price,
  name,
  discount,
  productGroupID,
  productID,
  url,
  seller,
  onAddItem,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const { displayCart, displaySellerPopup } = useUI();

  const onClick = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const product = {
      price,
      name,
      discount,
      productGroupID,
      productID,
      url,
      seller,
      onAddItem,
    };

    try {
      setLoading(true);

      const { cart } = useCart();

      const findSeller = cart.value?.sellers.find((s) => {
        return s.id === seller;
      });

      if (findSeller || cart.value?.items.length === 0) {
        await addToCart(product);

        displayCart.value = true;
      } else {
        displaySellerPopup.value = product;
      }
    } finally {
      setLoading(false);
    }
  };

  return { onClick, loading };
};

export default function AddToCartButton(props: Props) {
  const btnProps = useAddToCart(props);

  return (
    <Button
      {...btnProps}
      data-deco="add-to-cart"
      style="border: 1px solid #BC81FF; color: #BC81FF"
      class="font-normal uppercase 
    bg-white hover:bg-white rounded-3xl"
    >
      Adicionar à Sacola
    </Button>
  );
}
