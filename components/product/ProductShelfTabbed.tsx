import { SendEventOnLoad } from "$store/components/Analytics.tsx";
import ProductCard, {
  Layout as cardLayout,
} from "$store/components/product/ProductCard.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Header from "$store/components/ui/SectionHeader.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { Product } from "apps/commerce/types.ts";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";

/** @titleBy title */
interface Tab {
  title: string;
  products: Product[] | null;
}

export interface Props {
  tabs: Tab[];
  title?: string;
  description?: string;
  layout?: {
    headerAlignment?: "center" | "left";
    headerfontSize?: "Normal" | "Large";
  };
  cardLayout?: cardLayout;
  tabIndex?: number;
  id?: string;
}

function TabbedProductShelf({
  tabs,
  title,
  description,
  layout,
  cardLayout,
  tabIndex,
  id: sectionId,
}: Props) {
  const id = useId();
  const platform = usePlatform();
  const ti = typeof tabIndex === "number"
    ? Math.min(Math.max(tabIndex, 0), tabs.length)
    : 0;
  const { products } = tabs[ti];

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div class="w-full container py-8 flex flex-col gap-5 lg:gap-7 lg:py-10">
      <div class="text-center text-base sm:text-xl text-brand font-bold uppercase">{title || ""}</div>
      <div class="flex justify-center">
        <div style="border:solid 1px #BC81FF; border-radius:23px;" class="flex items-center justify-center p-0">
          {tabs.map((tab, index) => (
            <button
              class={`text-base uppercase block h-9 px-5 rounded-3xl ${index === ti ? "bg-brand text-white" : "bg-white text-brand"}`}
              {...usePartialSection({ id: sectionId, props: { tabIndex: index } })}
            >
              {tab.title}
            </button>
          ))}
        </div>
      </div>

      <div
        id={id}
        class="container grid grid-cols-[48px_1fr_48px] px-0 sm:px-9"
      >
        <Slider class="carousel carousel-center sm:carousel-end gap-6 col-span-full row-start-2 row-end-5">
          {products?.map((product, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-[270px] sm:w-[292px] last:pr-6 sm:last:pr-0"
            >
              <ProductCard
                product={product}
                itemListName={title}
                layout={cardLayout}
                platform={platform}
                index={index}
              />
            </Slider.Item>
          ))}
        </Slider>

        <>
          <div class="hidden relative sm:block z-10 col-start-1 row-start-3">
            <Slider.PrevButton class="disabled:hidden absolute left-[-36px] bg-transparent">
              <svg xmlns="http://www.w3.org/2000/svg" width="29.635" height="29.635" viewBox="0 0 29.635 29.635"><path id="fi-rs-angle-circle-left" d="M0,14.818A14.818,14.818,0,1,1,14.818,29.635,14.818,14.818,0,0,1,0,14.818Zm27.166,0A12.348,12.348,0,1,0,14.818,27.166,12.348,12.348,0,0,0,27.166,14.818ZM10.6,16.564l5.821,5.818,1.746-1.746-5.821-5.818,5.77-5.77L16.372,7.3l-5.77,5.77A2.47,2.47,0,0,0,10.6,16.564Z" fill="#bc81ff"></path></svg>
            </Slider.PrevButton>
          </div>
          <div class="hidden relative sm:block z-10 col-start-3 row-start-3">
            <Slider.NextButton class="disabled:hidden absolute right-[-36px] bg-transparent rotate-180">
              <svg xmlns="http://www.w3.org/2000/svg" width="29.635" height="29.635" viewBox="0 0 29.635 29.635"><path id="fi-rs-angle-circle-left" d="M0,14.818A14.818,14.818,0,1,1,14.818,29.635,14.818,14.818,0,0,1,0,14.818Zm27.166,0A12.348,12.348,0,1,0,14.818,27.166,12.348,12.348,0,0,0,27.166,14.818ZM10.6,16.564l5.821,5.818,1.746-1.746-5.821-5.818,5.77-5.77L16.372,7.3l-5.77,5.77A2.47,2.47,0,0,0,10.6,16.564Z" fill="#bc81ff"></path></svg>
            </Slider.NextButton>
          </div>
        </>
        
        <SliderJS rootId={id} />
        <SendEventOnLoad
          event={{
            name: "view_item_list",
            params: {
              item_list_name: title,
              items: products.map((product) =>
                mapProductToAnalyticsItem({
                  product,
                  ...(useOffer(product.offers)),
                })
              ),
            },
          }}
        />
      </div>
    </div>
  );
}

export default TabbedProductShelf;
