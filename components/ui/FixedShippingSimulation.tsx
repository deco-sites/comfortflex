import { useLayoutEffect, useState } from "preact/hooks";
import Icon from "$store/components/ui/Icon.tsx";
import Modal from "$store/components/ui/Modal.tsx";

const zipCodeMask = (value: string) => {
  if (!value) return "";
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d{5})(\d)/, "$1-$2");
  return value;
};

export default function FixedShippingSimulation({
  context = "body",
}) {
  const [zipCode, setZipCode] = useState(null);
  const [displayPopup, setDisplayPopup] = useState(false);

  const handleZipCode = (event) => {
    let input = event.target;
    input.value = zipCodeMask(input.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const input = event.target.querySelector("input");
    const enteredZipCode = input.value;
    if (enteredZipCode.length === 9) {
      localStorage.setItem("zipCode", enteredZipCode);
      window.location.reload();
    }
  }

  useLayoutEffect(() => {
    const zipCode = localStorage.getItem("zipCode");
    if (zipCode) setZipCode(zipCode);
    else setZipCode("");
  }, []);

  const classContent = context === "header" ? "flex flex-row items-center justify-center gap-2 sm:gap-3 bg-[#f3f3f3] p-1 sm:py-2" : "container flex flex-col sm:flex-row items-center justify-center gap-3 border-b border-gray-300 py-2"

  if (zipCode === null) return null;
  return (
    <>
      <div class={classContent}>
        {
          zipCode ? (
            <>
              <p class="text-sm text-black text-center">
                Exibindo ofertas para <strong class="underline cursor-pointer" onClick={() => setDisplayPopup(true)}>{zipCode}</strong>
              </p>
            </>
          ) : (
            <>
              <p class={`text-xs sm:text-sm text-black text-left sm:text-center ${context === "header" ? "text-left sm:text-center" : "text-center"}`}>
                Calcule o CEP para encontrar mais ofertas de Vendedores Comfortflex.
              </p>
              <button
                class="block bg-brand text-white text-xs uppercase py-2 px-2 sm:px-3 rounded-3xl "
                style={{ minWidth: "96px" }}
                onClick={() => setDisplayPopup(true)}
              >
                Inserir CEP
              </button> 
            </>
          )
        }
      </div>
      <Modal
        loading="lazy"
        open={displayPopup}
        onClose={() => setDisplayPopup(false)}
      >
        <div class="absolute top-1/2 translate-y-[-50%] p-8 bg-base-100 container max-w-xl">
          <div class="flex flex-col gap-y-2 items-center">
            <div class="text-sm text-black">
              Digite seu CEP para visualizar ofertas para sua região
            </div>
            <form onSubmit={submitHandler} class="join">
              <input
                class="outline-none px-3 rounded-3xl h-10 border border-brand text-sm text-black"
                type="text"
                maxLength={9}
                required
                placeholder="Insira seu CEP"
                onKeyUp={handleZipCode}
              />
              <button type="submit" class="outline-none px-3 rounded-3xl h-10 border border-brand bg-brand text-white uppercase text-xs">
                Buscar
              </button>
            </form>
            <a
              class="text-xs underline text-black"
              target="_blank"
              href="https://buscacepinter.correios.com.br/app/endereco/index.php"
            >
              NÃO SEI MEU CEP
            </a>
          </div>
        </div>
      </Modal>
    </>
  );
}
