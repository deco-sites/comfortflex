import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Filters from "$store/components/search/Filters.tsx";
import Sort from "$store/components/search/Sort.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import { useSignal } from "@preact/signals";
import type { ProductListingPage } from "apps/commerce/types.ts";

export type Props =
  & Pick<
    ProductListingPage,
    | "filters"
    | "breadcrumb"
    | "sortOptions"
    | "productsFound"
    | "Pagination"
    | "pageInfo"
  >
  & {
    displayFilter?: boolean;
  };

function SearchControls(
  {
    filters,
    breadcrumb,
    displayFilter,
    sortOptions,
    productsFound,
    Pagination,
    pageInfo,
  }: Props,
) {
  const open = useSignal(false);

  const {
    records = 0,
  } = pageInfo;

  return (
    <Drawer
      loading="lazy"
      open={open.value}
      onClose={() => open.value = false}
      aside={
        <>
          <div class="bg-base-100 flex flex-col h-full sm:divide-y overflow-y-hidden">
            <div class="flex justify-between items-center">
              <h1 class="px-4 py-3">
                <span class="hidden sm:block font-medium text-2xl">
                  Filtrar
                </span>
                <span class="block sm:hidden font-light text-2xl uppercase">
                  Filtros
                </span>
              </h1>
              <Button
                class="btn btn-ghost hover:bg-transparent"
                onClick={() => open.value = false}
              >
                <Icon id="XMark" size={24} strokeWidth={2} />
              </Button>
            </div>
            <div class="flex-grow overflow-auto">
              <Filters filters={filters} />
            </div>
            <div>
            </div>
          </div>
        </>
      }
    >
      <div style="height: 144px"></div>
      <div
        class="border-b border-[#D1D1D1] mb-4 sm:mb-7 w-full bg-white fixed z-30 sm:pt-5"
        style="top:90px"
      >
        <div class="container box-border">
          <div class="flex flex-col justify-between sm:gap-4 sm:flex-row sm:items-end sm:h-auto">
            <div class="flex flex-col ml-0 items-start sm:p-0 mb-7">
              <Breadcrumb itemListElement={breadcrumb?.itemListElement} />
              <div
                style="color: #BC81FF"
                class="hidden sm:block mt-5 uppercase text-base font-bold"
              >
                Filtros
              </div>
            </div>

            <div class="flex items-center gap-x-5 mb-7">
              {records > 0
                ? (
                  <div class="hidden sm:block font-medium text-sm">
                    {records === 1 ? `1 Produto` : `${records} Produtos`}
                  </div>
                )
                : null}
              <div class="flex flex-row items-center justify-between sm:gap-4 sm:border-none w-full ">
                <Button
                  style="border: 2px solid #BC81FF; border-radius: 23px;"
                  class={displayFilter
                    ? "btn-ghost"
                    : "bg-brand text-white uppercase sm:hidden font-normal h-10 border-0 text-xs"}
                  onClick={() => {
                    open.value = true;
                  }}
                >
                  FILTROS
                </Button>
                {records > 0
                  ? (
                    <div class="block sm:hidden font-medium text-xs text-black">
                      {records === 1 ? `1 Produto` : `${records} Produtos`}
                    </div>
                  )
                  : null}
                {sortOptions.length > 0 && <Sort sortOptions={sortOptions} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
}

export default SearchControls;
