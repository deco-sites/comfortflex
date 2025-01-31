import Image from "apps/website/components/Image.tsx";
import WishlistButton from "$store/islands/WishlistButton.tsx";

import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { SendEventOnClick } from "$store/components/Analytics.tsx";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";

import type { Product } from "apps/commerce/types.ts";
import type { Platform } from "$store/apps/site.ts";

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
    productID,
    image: images,
    offers,
    isVariantOf,
  } = product;

  const validOffer = isVariantOf?.hasVariant?.find((v) => {
    // @ts-ignore offers is right
    return v.offers.offers[0].availability === "https://schema.org/InStock";
  }) || product;

  const url = validOffer.url ? validOffer.url : product.url;

  const id = `product-card-${productID}`;
  const productGroupID = isVariantOf?.productGroupID;
  const [front, back] = images ?? [];

  const currentOffer = useOffer(validOffer.offers);
  const {
    price,
    listPrice,
    installments,
  } = currentOffer;

  const cta = () => {
    return (
      <a
        href={url && relative(url)}
        aria-label="view product"
        class={`block py-2 sm:py-3 bg-black sm:bg-transparent border border-solid rounded-none hover:bg-black sm:hover:bg-transparent uppercase text-sm sm:text-base font-normal text-center text-white sm:text-black ${
          theme === "dark"
            ? "border-black text-white sm:text-black"
            : "border-white text-white sm:text-white"
        }`}
      >
        Ver produto
      </a>
    );
  };

  return (
    <div
      id={id}
      class="card card-compact group w-full text-start relative"
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
      {(listPrice && price) && (
        <>
          {(listPrice > price) && (
            <span
              class="absolute top-0 right-0 bg-brand rounded-full text-white py-1 px-3 text-xs sm:text-sm mt-2 mr-2"
              style={{ zIndex: 1 }}
            >
              {parseInt(`${((listPrice - price) / listPrice) * 100}`)}%
            </span>
          )}
        </>
      )}
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
            preload
            loading="eager"
            fetchPriority="low"
            decoding="async"
          />
          <Image
            src={back?.url ?? front.url!}
            alt={back?.alternateName ?? front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            class="bg-base-100 col-span-full row-span-full transition-opacity w-full opacity-0 lg:group-hover:opacity-100"
            sizes="(max-width: 640px) 50vw, 20vw"
            preload
            loading="eager"
            fetchPriority="low"
            decoding="async"
          />
        </a>
      </figure>
      {/* Prices & Name */}
      <div class="flex-auto flex flex-col py-2 gap-3 lg:gap-4">
        <h2
          class={`lg:text-lg text-base-content font-normal ${
            theme === "light" ? "text-white" : "text-black"
          }`}
        >
          {isVariantOf?.name}
        </h2>
        <div class="flex flex-col">
          <div class="flex items-center gap-x-1">
            {listPrice > price &&
              (
                <div class="line-through text-gray-300 text-sm sm:text-lg">
                  {formatPrice(listPrice, offers?.priceCurrency)}
                </div>
              )}
            <div
              class={`text-brand sm:text-xl ${
                theme === "light" ? "text-white" : "text-black"
              } font-semibold`}
            >
              {formatPrice(price, offers?.priceCurrency)}
            </div>
          </div>
          {!installments ? null : (
            <div
              class={`${
                theme === "light" ? "text-gray-300" : "text-gray-600"
              } text-sm sm:text-base font-medium truncate`}
            >
              {installments}
            </div>
          )}
        </div>
        {cta}
      </div>
    </div>
  );
}

export default ProductCard;
