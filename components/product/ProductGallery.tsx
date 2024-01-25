import ProductCard, {
  Layout as CardLayout,
} from "$store/components/product/ProductCard.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { Product } from "apps/commerce/types.ts";

export interface Columns {
  mobile?: 1 | 2;
  desktop?: 2 | 3 | 4 | 5;
}

export interface Props {
  products: Product[] | null;
  offset: number;
  pagination?: any;
  layout?: {
    card?: CardLayout;
    columns?: Columns;
  };
}

const MOBILE_COLUMNS = {
  1: "grid-cols-1",
  2: "grid-cols-2",
};

const DESKTOP_COLUMNS = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
  5: "sm:grid-cols-5",
};

function ProductGallery({ products, layout, offset, pagination }: Props) {
  const platform = usePlatform();
  const mobile = MOBILE_COLUMNS[layout?.columns?.mobile ?? 2];
  const desktop = DESKTOP_COLUMNS[layout?.columns?.desktop ?? 3];

  return (
    <div class="w-full flex flex-col items-center gap-y-5 sm:gap-y-8 mb-8 sm:mb-0">
      {/* {pagination} */}
      <div
        class={`grid grid-cols-2 gap-4 items-center md:grid-cols-3 lg:grid-cols-3 sm:gap-10`}
      >
        {products?.map((product, index) => (
          <ProductCard
            product={product}
            preload={index === 0}
            index={offset + index}
            layout={layout?.card}
            platform={platform}
          />
        ))}
      </div>
      {pagination}
    </div>
  );
}

export default ProductGallery;
