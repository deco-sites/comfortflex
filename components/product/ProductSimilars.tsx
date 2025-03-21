import { invoke } from "../../runtime.ts";
import { useSignal } from "@preact/signals";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useCallback, useEffect } from "preact/compat";
import type { Product } from "apps/commerce/types.ts";

interface Props {
  product: Product;
}

function SimilarSelector({ product }: Props) {
  if (!IS_BROWSER) return null;

  const productSimilars = useSignal<Product[] | null>(null);

  const getSimilars = useCallback(async () => {
    const result = await invoke.vtex.loaders.legacy.relatedProductsLoader({
      crossSelling: "similars",
      id: product.inProductGroupWithID,
    });

    productSimilars.value = result;
  }, []);

  useEffect(() => {
    getSimilars();
  }, []);

  if (productSimilars.value === null) return null;
  if (productSimilars.value.length === 0) return null;

  return (
    <div>
      <span class="block text-base uppercase mb-2">Cores</span>
      <ul class="flex flex-wrap flex-row gap-2">
        {productSimilars.value.map((similar) => {
          const validURL = similar.isVariantOf.hasVariant.find((v) => {
            return v.offers?.offers.find((o) => {
              return o.inventoryLevel?.value > 0;
            });
          })?.url || similar.url;

          return (
            <li class="border border-gray-300 min-w-16">
              <a href={validURL}>
                <img
                  src={similar.image[0].url.replace(
                    /(https:\/\/comfortflex\.vteximg\.com\.br\/arquivos\/ids\/)([0-9]*)(\/.*)/,
                    "$1$2-64-64$3",
                  )}
                  width="64"
                  height="64"
                />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SimilarSelector;
