import Icon from "$store/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";

export default function SearchButton() {
  const { displaySearchDrawer, displaySearchPopup } = useUI();

  return (
    <>
      <button
        style="color:#BC81FF"
        class="hidden lg:flex items-center text-xs lg:text-sm gap-x-1 fill-white lg:fill-brand text-white"
        onClick={() => {
          displaySearchPopup.value = !displaySearchPopup.value;
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18.677"
          height="18.677"
          viewBox="0 0 18.677 18.677"
        >
          <path
            id="Caminho_29"
            data-name="Caminho 29"
            d="M18.645,17.546l-4.867-4.867a7.784,7.784,0,1,0-1.1,1.1l4.867,4.867ZM7.764,13.982a6.217,6.217,0,1,1,6.217-6.217,6.217,6.217,0,0,1-6.217,6.217Z"
            transform="translate(0.032 0.032)"
            fill="#bc81ff"
          />
        </svg>

        Buscar
      </button>
      <button
        class="lg:hidden flex items-center text-xs gap-x-1 fill-white lg:fill-black text-white lg:text-black"
        onClick={() => {
          displaySearchDrawer.value = !displaySearchDrawer.value;
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18.677"
          height="18.677"
          viewBox="0 0 18.677 18.677"
        >
          <path
            id="Caminho_29"
            data-name="Caminho 29"
            d="M18.645,17.546l-4.867-4.867a7.784,7.784,0,1,0-1.1,1.1l4.867,4.867ZM7.764,13.982a6.217,6.217,0,1,1,6.217-6.217,6.217,6.217,0,0,1-6.217,6.217Z"
            transform="translate(0.032 0.032)"
            fill="#fff"
          />
        </svg>

        Buscar
      </button>
    </>
  );
}
