import { useCart } from "apps/vtex/hooks/useCart.ts";
import Button, { Props as BtnProps } from "./common.tsx";

export interface Props extends Omit<BtnProps, "onAddItem" | "platform"> {
  seller: string;
  text?: string;
}

function AddToCartButton(props: Props) {
  const { addItems } = useCart();
  const onAddItem = () =>
    addItems({
      orderItems: [{
        id: props.productID,
        seller: props.seller,
        quantity: 1,
      }],
    });

  return <Button onAddItem={onAddItem} {...props} />;
}

export default AddToCartButton;
