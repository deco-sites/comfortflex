import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";

export type Item = {
  label: string;
  href: string;
};

export type Section = {
  label: string;
  items: Item[];
};

export default function FooterItems(
  { sections, justify = false }: { sections: Section[]; justify: boolean },
) {
  return (
    <>
      {sections.length > 0 && (
        <>
          {/* Tablet and Desktop view */}
          <ul
            class={`hidden md:flex flex-row gap-6 lg:gap-10 ${
              justify && "lg:justify-between"
            }`}
          >
            {sections.map((section) => (
              <li>
                <div class="flex flex-col gap-2">
                  <span class="font-medium text-lg">
                    {section.label}
                  </span>
                  <ul class={`flex flex-col gap-2 flex-wrap text-sm`}>
                    {section.items?.map((item) => (
                      <li>
                        <a href={item.href}  class={`block py-1 ${item.href ? 'link link-hover' : ''}`}>
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                </div>
              </li>
            ))}
          </ul>

          {/* Mobile view */}
          <ul class="flex flex-col md:hidden divide-y divide-gray-300">
            {sections.map((section) => (
              <li>
                <div class="collapse collapse-arrow py-3 rounded-none">
                  <input type="checkbox" class="min-h-[0]" />
                  <div class="collapse-title min-h-[0] !p-0 flex gap-2">
                    <span class="uppercase mx-6 text-black text-base">
                      {section.label}
                    </span>
                  </div>
                  <div class="collapse-content !pb-0">
                    <ul class="flex flex-col mx-2 mt-3 gap-y-2">
                      {section.items?.map((item) => (
                        <li>
                          <a
                            href={item.href}
                            class="block link link-hover"
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
