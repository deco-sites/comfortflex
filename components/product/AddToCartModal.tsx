import { useUI } from "$store/sdk/useUI.ts";

import Modal from "$store/components/ui/Modal.tsx";
import AddToCartButtonVTEX from "$store/islands/AddToCartButton/vtex.tsx";

export default function AddToCartModal() {
  const { displayAddToCartPopup } = useUI();

  const {
    value: data,
  } = displayAddToCartPopup;

  if (data === null) return null;

  const {
    product,
    price,
    discount,
    seller,
  } = data;

  const {
    url,
    productID,
    name = "",
    isVariantOf: {
        productGroupID = ""
    },
  } = product;

  console.log("product", product);

  return (
    <Modal
      loading="lazy"
      open={displayAddToCartPopup.value === null ? false : true}
      onClose={() => displayAddToCartPopup.value = null}
    >
      <div class="w-full md:w-auto absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-base-100">
        <div class="flex flex-col items-center gap-y-2 p-4">
            {
                !name ?
                "Tem certeza que deseja adicionar este item ao carrinho?" :
                <>
                    A numeração escolhida foi:
                    <div class="flex items-center justify-center w-11 h-11 border border-brand bg-brand text-white rounded-full">{name}</div>
                </>
            }
            <div class="flex items-center gap-3">
                <button
                  onClick={() => displayAddToCartPopup.value = null}
                >Cancelar</button>
                <AddToCartButtonVTEX
                    url={url || ""}
                    name={name}
                    productID={productID}
                    productGroupID={productGroupID}
                    price={price}
                    discount={discount}
                    seller={seller}
                    text="Sim, continuar"
                />
            </div>
        </div>
      </div>
    </Modal>
  );
}