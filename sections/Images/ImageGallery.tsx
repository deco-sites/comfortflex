import { Picture, Source } from "apps/website/components/Picture.tsx";
import Header from "$store/components/ui/SectionHeader.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

/**
 * @titleBy alt
 */
export interface Banner {
  srcMobile: ImageWidget;
  srcDesktop?: ImageWidget;
  /**
   * @description Image alt text
   */
  alt: string;
  /**
   * @description Adicione um link
   */
  href: string;
}

export type BorderRadius =
  | "none"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "full";

export interface Props {
  title?: string;
  description?: string;
  /**
   * @maxItems 4
   * @minItems 4
   */
  banners?: Banner[];
  layout?: {
    /**
     * @description Aplique borda a sua imagem
     */
    borderRadius?: {
      /** @default none */
      mobile?: BorderRadius;
      /** @default none */
      desktop?: BorderRadius;
    };
    headerAlignment?: "center" | "left";
    mobile?: "Asymmetric" | "Symmetrical";
    desktop?: "Asymmetric" | "Symmetrical";
  };
}

const RADIUS: Record<string, Record<BorderRadius, string>> = {
  mobile: {
    "none": "rounded-none",
    "sm": "rounded-sm",
    "md": "rounded-md",
    "lg": "rounded-lg",
    "xl": "rounded-xl",
    "2xl": "rounded-2xl",
    "3xl": "rounded-3xl",
    "full": "rounded-full",
  },
  desktop: {
    "none": "sm:rounded-none",
    "sm": "sm:rounded-sm",
    "md": "sm:rounded-md",
    "lg": "sm:rounded-lg",
    "xl": "sm:rounded-xl",
    "2xl": "sm:rounded-2xl",
    "3xl": "sm:rounded-3xl",
    "full": "sm:rounded-full",
  },
};

const DEFAULT_PROPS: Props = {
  "banners": [
    {
      "srcMobile":
        "https://decoims.com/comfortflex/4d5b1277-fb21-46d2-8780-b035050abca7/b00140565292e994.jpg",
      "srcDesktop":
        "https://decoims.com/comfortflex/4d5b1277-fb21-46d2-8780-b035050abca7/b00140565292e994.jpg",
      "alt": "Fashion",
      "href": "/",
    },
    {
      "alt": "Fashion",
      "href": "/",
      "srcMobile":
        "https://decoims.com/comfortflex/c9633af5-9a23-46d7-aeb4-977b97cb7709/5a74f902da0bc031.jpg",
      "srcDesktop":
        "https://decoims.com/comfortflex/c9633af5-9a23-46d7-aeb4-977b97cb7709/5a74f902da0bc031.jpg",
    },
    {
      "srcMobile":
        "https://decoims.com/comfortflex/9846862a-25d3-47aa-909d-afa1385dfa48/22f0a68a97a32230.jpg",
      "srcDesktop":
        "https://decoims.com/comfortflex/9846862a-25d3-47aa-909d-afa1385dfa48/22f0a68a97a32230.jpg",
      "href": "/",
      "alt": "Fashion",
    },
    {
      "srcMobile":
        "https://decoims.com/comfortflex/0f00b3cb-8001-48af-8fea-3d4b293448e2/aa22385caef90351.jpg",
      "srcDesktop":
        "https://decoims.com/comfortflex/0f00b3cb-8001-48af-8fea-3d4b293448e2/aa22385caef90351.jpg",
      "alt": "Fashion",
      "href": "/",
    },
  ],
  "layout": {
    "borderRadius": {
      "mobile": "3xl",
      "desktop": "2xl",
    },
    "headerAlignment": "center",
    "mobile": "Asymmetric",
    "desktop": "Asymmetric",
  },
};

function Banner(
  props: Banner & {
    borderRadius?: {
      /** @default none */
      mobile?: BorderRadius;
      /** @default none */
      desktop?: BorderRadius;
    };
  },
) {
  const { borderRadius, srcMobile, srcDesktop, alt } = props;
  const radiusDesktop = RADIUS.desktop[borderRadius?.desktop ?? "none"];
  const radiusMobile = RADIUS.mobile[borderRadius?.desktop ?? "none"];

  return (
    <a
      href={props.href}
      class={`overflow-hidden ${radiusDesktop} ${radiusMobile}`}
    >
      <Picture>
        <Source
          width={190}
          height={190}
          media="(max-width: 767px)"
          src={srcMobile}
        />
        <Source
          width={640}
          height={420}
          media="(min-width: 768px)"
          src={srcDesktop || srcMobile}
        />
        <img
          class="w-full h-full object-cover"
          src={srcMobile}
          alt={alt}
          decoding="async"
          loading="lazy"
        />
      </Picture>
    </a>
  );
}

export default function Gallery(props: Props) {
  const { title, description, banners, layout } = {
    ...DEFAULT_PROPS,
    ...props,
  };

  const mobileItemLayout = (index: number) =>
    layout?.mobile === "Symmetrical"
      ? "row-span-3"
      : index === 0 || index === 3
      ? "row-span-3"
      : "row-span-2";

  const desktopItemLayout = (index: number) =>
    layout?.desktop === "Symmetrical"
      ? "sm:row-span-3"
      : index === 0 || index === 3
      ? "sm:row-span-3"
      : "sm:row-span-2";

  return (
    <section class="container px-4 py-8 flex flex-col gap-8 lg:gap-10 lg:py-10 lg:px-0">
      <Header
        title={title}
        description={description}
        alignment={layout?.headerAlignment || "center"}
      />
      <ul class="grid grid-flow-col grid-cols-2 grid-rows-6 gap-4 list-none">
        {banners?.map((banner, index) => (
          <li class={`${mobileItemLayout(index)} ${desktopItemLayout(index)}`}>
            <Banner {...banner} borderRadius={props.layout?.borderRadius} />
          </li>
        ))}
      </ul>
    </section>
  );
}
