import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";

import Button from "$store/components/ui/Button.tsx";

function ShippingSimulation() {
  const postalCode = useSignal("");

  // Recuperar o CEP armazenado localmente quando o componente é montado e quando o valor do CEP no localStorage muda
  useEffect(() => {
    const savedPostalCode = localStorage.getItem("zipCode");
    if (savedPostalCode) {
      postalCode.value = savedPostalCode;
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const savedPostalCode = localStorage.getItem("zipCode");
      if (savedPostalCode !== postalCode.value) {
        postalCode.value = savedPostalCode || "";
      }
    };

    globalThis.addEventListener("storage", handleStorageChange);

    return () => {
      globalThis.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleSubmit = (event: Event) => {
    event.preventDefault();
    localStorage.setItem("zipCode", postalCode.value);
    window.location.reload();
  };

  return (
    <div class="flex flex-col gap-2">
      <div class="flex flex-col">
        <span>Calcular frete</span>
        <span>
          Informe seu CEP para consultar os prazos de entrega
        </span>
      </div>

      <form
        class="join"
        onSubmit={handleSubmit}
      >
        <input
          as="input"
          type="text"
          class="input input-bordered join-item"
          placeholder="Seu cep aqui"
          value={postalCode.value}
          maxLength={8}
          size={8}
          onChange={(e: { currentTarget: { value: string } }) => {
            postalCode.value = e.currentTarget.value;
          }}
        />
        <Button type="submit" class="join-item">
          Calcular
        </Button>
      </form>
    </div>
  );
}

export default ShippingSimulation;
