import { SendEventOnLoad } from "$store/components/Analytics.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import WishlistButton from "$store/islands/WishlistButton.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductSelector from "./ProductVariantSelector.tsx";
import SellersSelector from "$store/islands/SellersSelector.tsx";
import ShippingSimulation from "$store/islands/ShippingSimulation.tsx";
import AddToCartArea from "$store/islands/AddToCardArea.tsx";
import AddToCartModal from "$store/islands/AddToCartModal.tsx";

interface Props {
  page: ProductDetailsPage | null;
}

function ProductInfo({ page }: Props) {
  const platform = usePlatform();

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const {
    breadcrumbList,
    product,
  } = page;

  const {
    productID,
    offers,
    gtin,
    isVariantOf,
  } = product;

  const description = product.description || isVariantOf?.description;
  const currentOffers = useOffer(offers);
  const {
    price = 0,
    listPrice,
    seller = "1",
    sellerName = "Comfortflex",
    installments,
    availability,
  } = currentOffers;
  const productGroupID = isVariantOf?.productGroupID ?? "";
  const discount = price && listPrice ? listPrice - price : 0;

  return (
    <>
      <AddToCartModal />
      <div class="flex flex-col lg:first-letter:max-w-[500px]">
        {/* Code and name */}
        <div class="mt-4 sm:mt-8">
          <h1>
            <span class="font-medium text-xl capitalize">
              {isVariantOf?.name}
            </span>
          </h1>
          <div>
            {gtin && (
              <span class="text-sm text-[#d1d1d1]">
                Ref.: {gtin}
              </span>
            )}
          </div>
        </div>
        {/* Prices */}
        <div class="flex items-center justify-between mt-4">
          <div class="w-full">
            <div class="flex flex-row gap-2 items-center">
              {(listPrice ?? 0) > price && (
                <span class="line-through text-base-300 text-xs">
                  {formatPrice(listPrice, offers?.priceCurrency)}
                </span>
              )}
              <div class="flex items-center justify-between w-full">
                <span class="text-2xl text-black font-semibold">
                  {formatPrice(price, offers?.priceCurrency)}
                </span>
                <WishlistButton
                  variant="full"
                  productID={productID}
                  productGroupID={productGroupID}
                />
              </div>
            </div>
            <span class="text-sm text-base-300">
              {installments}
            </span>
          </div>
        </div>
        {/* Sku Selector */}
        <div class="mt-4 sm:mt-6">
          <ProductSelector product={product} />
        </div>
        {/* Add to Cart and Favorites button */}
        <div class="mt-4 sm:mt-10 flex flex-col gap-2">
          {availability === "https://schema.org/InStock"
            ? (
              <>
                <AddToCartArea
                  product={product}
                  price={price}
                  discount={discount}
                  seller={seller}
                  sellerName={sellerName}
                />
                {platform === "vtex" && (
                  <>
                    {/* Shipping Simulation */}
                    <div class="mt-8">
                      <ShippingSimulation
                        items={[{
                          id: Number(product.sku),
                          quantity: 1,
                          seller: seller ?? "1",
                        }]}
                      />
                    </div>
                  </>
                )}
              </>
            )
            : <OutOfStock productID={productID} />}
        </div>

        <SellersSelector product={{ ...product }} />
        {/* Description card */}
        <div class="border-t border-gray-300 pt-4 mt-4 sm:mt-6">
          <span class="block text-base uppercase mb-3">
            Detalhes do Produto
          </span>
          <div
            class="text-sm"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>

        <div class="border-t border-gray-300 pt-4 mt-4 sm:mt-6">
          <span class="block text-base uppercase mb-3">
            Ficha Técnica do Produto
          </span>
          <div class="flex flex-row flex-wrap">
            {isVariantOf?.additionalProperty?.map((property) => {
              if (
                [
                  "video-produto",
                  "sellerid",
                  "tamanho",
                  "cor",
                ].includes(property.name?.toLowerCase())
              ) return null;

              return (
                <div class="w-1/2 mt-2">
                  <span class="text-black font-semibold">{property.name}</span>
                  <div class="text-[#919191] text-sm">
                    {property.value}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* Analytics Event */}
        <SendEventOnLoad
          event={{
            name: "view_item",
            params: {
              items: [
                mapProductToAnalyticsItem({
                  product,
                  breadcrumbList,
                  price,
                  listPrice,
                }),
              ],
            },
          }}
        />
      </div>
    </>
  );
}

export default ProductInfo;
