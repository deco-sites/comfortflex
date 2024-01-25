import type { Platform } from "$store/apps/site.ts";
import { SendEventOnClick } from "$store/components/Analytics.tsx";
import Avatar from "$store/components/ui/Avatar.tsx";
import WishlistButton from "$store/islands/WishlistButton.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import V from "https://esm.sh/v135/deepmerge@4.3.1/esnext/deepmerge.mjs";

// export interface Layout {
//   basics?: {
//     contentAlignment?: "Left" | "Center";
//     oldPriceSize?: "Small" | "Normal";
//     ctaText?: string;
//   };
//   elementsPositions?: {
//     skuSelector?: "Top" | "Bottom";
//     favoriteIcon?: "Top right" | "Top left";
//   };
//   hide?: {
//     productName?: boolean;
//     productDescription?: boolean;
//     allPrices?: boolean;
//     installments?: boolean;
//     skuSelector?: boolean;
//     cta?: boolean;
//   };
//   onMouseOver?: {
//     image?: "Change image" | "Zoom image";
//     card?: "None" | "Move up";
//     showFavoriteIcon?: boolean;
//     showSkuSelector?: boolean;
//     showCardShadow?: boolean;
//     showCta?: boolean;
//   };
// }

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;

  // layout?: Layout;
  platform?: Platform;

  theme?: "dark" | "light";
}

const relative = (url: string) => {
  const link = new URL(url);
  return `${link.pathname}${link.search}`;
};

const WIDTH = 270;
const HEIGHT = 225;

function ProductCard(
  { product, preload, itemListName, platform, theme = "dark", index }: Props,
) {
  const {
    // url,
    productID,
    name,
    image: images,
    offers,
    isVariantOf,
  } = product;

  const variantWithStockURL = isVariantOf?.hasVariant?.find((v) => {
    return v.offers.offers[0].inventoryLevel.value > 0;
  })?.url;

  const url = variantWithStockURL ? variantWithStockURL : product.url;

  const id = `product-card-${productID}`;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const productGroupID = isVariantOf?.productGroupID;
  const description = product.description || isVariantOf?.description;
  const [front, back] = images ?? [];
  const { listPrice, price, installments } = useOffer(offers);
  const possibilities = useVariantPossibilities(hasVariant, product);
  const variants = Object.entries(Object.values(possibilities)[0] ?? {});

  const cta = () => {
    console.log(url);
    return (
      <a
        href={url && relative(url)}
        aria-label="view product"
        class={`block py-2 sm:py-3 bg-black sm:bg-transparent border border-solid rounded-none hover:bg-black sm:hover:bg-transparent uppercase text-sm sm:text-base font-normal text-center text-white sm:text-black ${theme === "dark" ? "border-black text-white sm:text-black" : "border-white text-white sm:text-white"}`}
      >
        Ver produto
      </a>
    )
  };

  return (
    <div
      id={id}
      class="card card-compact group w-full text-start"
      data-deco="view-product"
    >
      <SendEventOnClick
        id={id}
        event={{
          name: "select_item" as const,
          params: {
            item_list_name: itemListName,
            items: [
              mapProductToAnalyticsItem({
                product,
                price,
                listPrice,
                index,
              }),
            ],
          },
        }}
      />
      <figure
        class="relative overflow-hidden"
        style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}
      >
        {/* Wishlist button */}
        <div class="absolute top-2 z-10 left-2 lg:hidden lg:group-hover:block">
          <WishlistButton
            productGroupID={productGroupID}
            productID={productID}
          />
        </div>
        {/* Product Images */}
        <a
          href={url && relative(url)}
          aria-label="view product"
          class="grid grid-cols-1 grid-rows-1 w-full"
        >
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            class="bg-base-100 col-span-full row-span-full w-full"
            sizes="(max-width: 640px) 50vw, 20vw"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
          <Image
            src={back?.url ?? front.url!}
            alt={back?.alternateName ?? front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            class="bg-base-100 col-span-full row-span-full transition-opacity w-full opacity-0 lg:group-hover:opacity-100"
            sizes="(max-width: 640px) 50vw, 20vw"
            loading="lazy"
            decoding="async"
          />
        </a>
      </figure>
      {/* Prices & Name */}
      <div class="flex-auto flex flex-col py-2 gap-3 lg:gap-4">
        <h2
          class={`truncate lg:text-lg text-base-content font-normal ${theme === "light" ? "text-white" : "text-black"}`}
        >
          {isVariantOf?.name}
        </h2>
        <div class="flex flex-col">
          <div
            class="flex items-center gap-x-1"
          >
            <div
              class="line-through text-gray-300 text-sm sm:text-lg"
            >
              {formatPrice(listPrice, offers?.priceCurrency)}
            </div>
            <div class={`text-base sm:text-xl ${theme === "light" ? "text-white" : "text-black"} font-semibold`}>
              {formatPrice(price, offers?.priceCurrency)}
            </div>
          </div>
          {
            !installments ? null : (
              <div class={`${theme === "light" ? "text-gray-300" : "text-gray-600"} text-sm sm:text-base font-medium truncate`}>
                {installments}
              </div>
            )
          }
        </div>
        {cta}
      </div>
    </div>
  );
}

export default ProductCard;
