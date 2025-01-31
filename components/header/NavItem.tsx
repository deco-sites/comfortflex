import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { headerHeight } from "./constants.ts";

function NavItem({ item }: { item: SiteNavigationElement }) {
  const { url, name, children } = item;
  const image = item?.image?.[0];

  return (
    <li class="group flex">
      <a href={url} class="flex items-center">
        <span
          style="color: #BC81FF"
          class="group-hover:underline text-[13px] uppercase"
        >
          {name}
        </span>
      </a>

      {children && children.length > 0 &&
        (
          <div
            class="fixed hidden hover:flex group-hover:flex bg-base-100 z-50 items-start justify-center gap-6 border-t border-b-2 border-base-200 w-screen"
            style={{ left: "0px", marginTop: headerHeight }}
          >
            {image?.url && (
              <Image
                class="p-6"
                src={image.url}
                alt={image.alternateName}
                width={300}
                height={332}
                loading="lazy"
              />
            )}
            <ul class="flex items-start justify-center gap-6">
              {children.map((node) => {
                let name = node.name === undefined ? "" : node.name;

                return (
                  <>
                    <li class="p-6">
                      <a class="hover:underline" href={node.url}>
                        <span class="text-[13.5px] uppercase font-semibold">
                          {node.name}
                        </span>
                      </a>

                      <ul
                        class={name.search(/tamanho/i) !== -1
                          ? "flex gap-2 mt-4 flex-wrap"
                          : "flex flex-col gap-1 mt-4"}
                        style={name.search(/tamanho/i) !== -1
                          ? { width: "184px" }
                          : {}}
                      >
                        {node.children?.map((leaf) => {
                          if (leaf.name?.search(/ver tudo/i) !== -1) {
                            return (
                              <li>
                                <a class="underline" href={leaf.url}>
                                  <span class="text-[13.5px] uppercase font-semibold">
                                    {leaf.name}
                                  </span>
                                </a>
                              </li>
                            );
                          }

                          return (
                            <li>
                              <a
                                class={name.search(/tamanho/i) !== -1
                                  ? "flex items-center justify-center rounded-full w-10 h-10 border-solid border-brand bg-brand text-white"
                                  : "hover:underline"}
                                href={leaf.url}
                              >
                                <span
                                  class={name.search(/tamanho/i) !== -1
                                    ? "text-xs"
                                    : "text-[13.5px]"}
                                >
                                  {leaf.name}
                                </span>
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  </>
                );
              })}
            </ul>
          </div>
        )}
    </li>
  );
}

export default NavItem;
