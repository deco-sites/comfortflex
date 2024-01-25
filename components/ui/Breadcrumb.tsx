import type { BreadcrumbList } from "apps/commerce/types.ts";

interface Props {
  itemListElement: BreadcrumbList["itemListElement"];
}

function Breadcrumb({ itemListElement = [] }: Props) {
  const items = [{ name: "Home", item: "/" }, ...itemListElement];

  return (
    <div class="breadcrumbs">
      {
        items.length > 1 ? (
          <ul>
            {items
              .filter(({ name, item }) => name && item)
              .map(({ name, item }) => {
                if (name === "Home") {
                  return (
                    <li class="text-sm text-[#919191]">
                      <a class="flex items-center gap-x-2" href={item}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14.413" height="14.414" viewBox="0 0 14.413 14.414">
                          <path id="fi-rs-house-chimney" d="M13.722,4.611,13.2,4.2h.013v-3h-1.2V3.273L8.317.382a1.8,1.8,0,0,0-2.22,0L.691,4.611A1.792,1.792,0,0,0,0,6.03v8.382H5.4v-5.4a.6.6,0,0,1,.6-.6h2.4a.6.6,0,0,1,.6.6v5.4h5.4V6.03a1.792,1.792,0,0,0-.691-1.419Zm-.51,8.6h-3v-4.2a1.8,1.8,0,0,0-1.8-1.8h-2.4a1.8,1.8,0,0,0-1.8,1.8v4.2h-3V6.03a.6.6,0,0,1,.231-.473l5.4-4.23a.6.6,0,0,1,.74,0l5.4,4.23a.6.6,0,0,1,.231.473v7.181Z" transform="translate(0 0.002)" fill="#919191"/>
                        </svg>
                        Home
                      </a>
                    </li>
                  );
                }
                return (
                  <li class="text-sm text-[#919191]">
                    <a href={item}>{name}</a>
                  </li>
                )
              })}
          </ul>
        ) : null
      }
    </div>
  );
}

export default Breadcrumb;
