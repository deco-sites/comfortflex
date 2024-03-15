import Avatar from "$store/components/ui/Avatar.tsx";
import ProductSimilars from "$store/islands/ProductSimilars.tsx";
import MeasurementChart from "$store/islands/MeasurementChart.tsx";
import type { Product } from "apps/commerce/types.ts";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";

interface Props {
  product: Product;
}

function VariantSelector({ product }: Props) {
  const { url, isVariantOf } = product;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const possibilities = useVariantPossibilities(hasVariant, product);

  return (
    <ul class="flex flex-col gap-4">
      <ProductSimilars product={{...product}} />
      {Object.keys(possibilities).map((name) => {
        if (name.toLowerCase() !== "tamanho") return null;

        return (
          <li class="flex flex-col">
            <div class="flex items-center justify-between mb-3">
              <span class="text-base uppercase">{name}</span>
              <MeasurementChart />
            </div>
            <ul class="flex flex-row gap-3 flex-wrap">
              {Object.entries(possibilities[name]).map((possibilitie, index) => {
                const [value, link] = possibilitie;
                const partial = usePartialSection({ href: link });

                const variant = product.isVariantOf?.hasVariant[index];
                const hasStock = variant?.offers?.offers.find((offer) => {
                  if (!offer.inventoryLevel) return false;
                  if (!offer.inventoryLevel.value) return false;
                  return offer.inventoryLevel.value > 0;
                });
  
                return (
                  <li>
                    <button {...partial}>
                      <Avatar
                        content={value}
                        variant={
                          link === url ?
                            hasStock ? "default-active" : "disabled-active" 
                              : hasStock ? "default" : "disabled"
                        }
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </li>
        )
      })}
    </ul>
  );
}

export default VariantSelector;
