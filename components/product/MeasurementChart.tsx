import { signal } from "@preact/signals";
import Modal from "$store/components/ui/Modal.tsx";

const openModal = signal(false);

export default function MeasurementChart() {
  const value = openModal.value;

  const openModalHandler = () => openModal.value = true;
  const closeModalHandler = () => openModal.value = false;

  return (
    <>
      <button
        class="text-sm text-black font-semibold underline"
        onClick={openModalHandler}
      >
        Ver tabela de medidas
      </button>
      <div class={!openModal.value ? "hidden" : ""}>
        <Modal
          loading="lazy"
          open={value}
          onClose={closeModalHandler}
        >
          <div class="w-full md:w-auto absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-base-100">
            <img src="https://assets.decocache.com/comfortflex/33b344dc-32f9-4022-acd3-67ee819605f3/Screenshot_204.png" />
          </div>
        </Modal>
      </div>
    </>
  );
}
