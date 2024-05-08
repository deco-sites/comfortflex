import Button from "$store/components/ui/Button.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { useState } from "preact/hooks";

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
  text?: string;
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
  const { displayCart, displayAddToCartPopup } = useUI();

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
    }

    try {
      setLoading(true);

      await addToCart(product);

      displayCart.value = true;
      displayAddToCartPopup.value = null;
    } finally {
      setLoading(false);
    }
  };

  return { onClick, loading };
};

export default function AddToCartButton(props: Props) {
  const {
    text = "Adicionar à Sacola",
  } = props;

  const btnProps = useAddToCart(props);

  return (
    <Button {...btnProps} data-deco="add-to-cart" class="font-normal uppercase 
    bg-brand text-white hover:bg-brand rounded-3xl">
      {text}
    </Button>
  );
}
