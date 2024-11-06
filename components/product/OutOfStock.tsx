import { useSignal } from "@preact/signals";
import { invoke } from "$store/runtime.ts";
import type { Product } from "apps/commerce/types.ts";
import type { JSX } from "preact";

export interface Props {
  productID: Product["productID"];
}

function Notify({ productID }: Props) {
  const loading = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const name = (e.currentTarget.elements.namedItem("name") as RadioNodeList)
        ?.value;
      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;

      await invoke.vtex.actions.notifyme({ skuId: productID, name, email });
    } finally {
      loading.value = false;
    }
  };

  return (
    <form class="form-control justify-start gap-2" onSubmit={handleSubmit}>
      <span class="text-base">Este produto está indisponível no momento</span>
      <span class="text-sm">Avise-me quando estiver disponível</span>

      <input placeholder="SEU NOME" class="input input-bordered rounded-3xl" name="name" />
      <input placeholder="SEU E-MAIL" class="input input-bordered rounded-3xl" name="email" />
      <span class="mt-2 text-black w-full text-xs">Ao clicar em ENVIAR, você concorda com os <a href="/politicas-de-privacidade" class="font-bold text-black underline">Termos de Privacidade</a> e autoriza o uso dos seus dados.</span>
      <button class="btn bg-brand text-white disabled:loading rounded-3xl" disabled={loading}>ENVIAR</button>
    </form>
  );
}

export default Notify;
