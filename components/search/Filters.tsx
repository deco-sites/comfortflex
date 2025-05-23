import Avatar from "$store/components/ui/Avatar.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { parseRange } from "apps/commerce/utils/filters.ts";

interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem(
  { url, selected, label, quantity }: FilterToggleValue,
) {
  return (
    <a href={url} class="flex items-center gap-2 py-1" rel="nofollow">
      <div
        aria-checked={selected}
        class="checkbox rounded-none w-4 h-4 pointer-events-none"
      />
      <span class="text-xs">{label}</span>
      {/* {quantity > 0 && <span class="text-sm text-base-300">({quantity})</span>} */}
    </a>
  );
}

function FilterValues({ key, values }: FilterToggle) {
  const flexDirection = key === "tamanho" || key === "cor"
    ? "flex-row"
    : "flex-col";

  return (
    <ul class={`flex flex-wrap gap-2 ${flexDirection}`}>
      {values.map((item) => {
        const { url, selected, value, quantity } = item;

        if (key === "tamanho") {
          return (
            <a href={url}>
              <Avatar
                content={value}
                variant={selected ? "active" : "default"}
              />
            </a>
          );
        }

        if (key === "price") {
          const range = parseRange(item.value);

          return range && (
            <ValueItem
              {...item}
              label={`${formatPrice(range.from)} - ${formatPrice(range.to)}`}
            />
          );
        }

        return <ValueItem {...item} />;
      })}
    </ul>
  );
}

function Filters({ filters }: Props) {
  return (
    <ul class="flex flex-col gap-6 py-4 p-0 sm:p-4 sm:pl-0">
      {filters
        .filter(isToggle)
        .map((filter) => (
          <div className="collapse collapse-arrow pb-4 border-b border-solid border-gray-300 rounded-none pl-4 sm:pl-0">
            <input type="checkbox" className="min-h-[0]" />
            <div class="collapse-title min-h-[0] !p-0 flex gap-2 divide-y divide-black">
              <span className="uppercase text-sm">{filter.label}</span>
            </div>
            <div className="collapse-content px-0 !pb-0">
              <li class="mt-4 flex flex-col gap-4 collapse collapse-arrow rounded-none">
                <FilterValues {...filter} />
              </li>
            </div>
          </div>
        ))}
    </ul>
  );
}

export default Filters;
