import { signal } from "@preact/signals";
import Modal from "$store/components/ui/Modal.tsx";

const openModal = signal(false);

interface Props {
  sizeTable: ImageWidget;
  sizeTableHowTo: ImageWidget;
}
export default function MeasurementChart({ sizeTable, sizeTableHowTo }: Props) {
  const value = openModal.value;

  const openModalHandler = () => openModal.value = true;
  const closeModalHandler = () => openModal.value = false;
  const switchTab = (tab: "chart" | "guide") => activeTab.value = tab;

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
          <div class="flex flex-col gap-3 w-[calc(100%-24px)] max-w-3xl max-h-screen overflow-y-auto absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-white p-3 pb-5 rounded-sm">
            <div class="flex justify-end items-center">
              <button onClick={() => closeModalHandler()}>
                <Icon id="XMark" size={24} strokeWidth={2} />
              </button>
            </div>
            {/* Cabeçalho com abas */}
            <div class="flex border-b border-[#070707] text-sm/4">
              <button
                class={`flex-1 px-3 py-2 font-light rounded-t-lg ${
                  activeTab.value === "chart"
                    ? "bg-[#070707] text-white"
                    : "text-[#353535]"
                }`}
                onClick={() => switchTab("chart")}
              >
                TABELA DE MEDIDAS
              </button>
              <button
                class={`flex-1 px-3 py-2 font-light rounded-t-lg ${
                  activeTab.value === "guide"
                    ? "bg-[#070707] text-white"
                    : "text-[#353535]"
                }`}
                onClick={() => switchTab("guide")}
              >
                COMO SE MEDIR
              </button>
            </div>

            {/* Conteúdo das abas */}
            <div class="flex items-center justify-center">
              {activeTab.value === "chart"
                ? (
                  <div>
                    <Image
                      src={sizeTable
                        ? sizeTable.src
                        : "https://assets.decocache.com/comfortflex/5f4d1b8d-f276-4cda-b20c-6310c87648a3/size-table-comfort.png"}
                      alt={"Medição Pé"}
                      class="h-full w-auto"
                    />
                  </div>
                )
                : (
                  <div>
                    <Image
                      src={sizeTableHowTo
                        ? sizeTableHowTo.src
                        : "https://assets.decocache.com/comfortflex/52aa5177-e06a-46e0-a59f-b3e259b11d68/size-table-guide-comfort.png"}
                      alt={"Medição Pé"}
                      class="h-full w-auto"
                    />
                  </div>
                )}
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}
