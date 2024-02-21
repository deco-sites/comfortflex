import { useMemo } from "preact/hooks";
import { useId } from "$store/sdk/useId.ts";
import Image from "apps/website/components/Image.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Image {
  image: ImageWidget;
  altText: string;
}

export interface Props {
  title?: string;
  description?: string;
  images?: Image[];
  layout?: {
    headerAlignment?: "center" | "left";
  };
}

const IMAGES = [
  {
    altText: "deco",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/fe7cd8ba-c954-45d6-9282-ee7d8ca8e3c7",
  },
  {
    altText: "deco",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/637e8601-6b86-4979-aa97-68013a2a60fd",
  },
];

function Logos(props: Props) {
  const {
    title,
    description,
    images,
    layout,
  } = props;

  const id = useId();

  const list = useMemo(
    () =>
      images && images.length > 0
        ? images
        : Array(20).fill(null).map((_, i) => IMAGES[i % 2]),
    [],
  );

  return (
    <div class="container mt-10 mb-20">
      <div class="flex flex-col gap-1">
        <div class="text-center text-base sm:text-xl text-black uppercase">
          {title || ""}
        </div>
        <div class="text-center text-base text-neutral uppercase">
          {description || ""}
        </div>
      </div>
      <div id={id} class="relative px-10 mt-4">
        <Slider class="carousel carousel-center w-full col-span-full row-span-full gap-8">
          {list.map((element, index) => (
            <Slider.Item index={index} class="carousel-item max-w-[110px]">
              <Image
                width={110}
                height={110}
                src={element.image}
                alt={element.altText || ""}
              />
            </Slider.Item>
          ))}
        </Slider>
        <Slider.PrevButton class="disabled:hidden absolute top-1/2 translate-y-[-50%] left-0 bg-transparent">
          <svg xmlns="http://www.w3.org/2000/svg" width="29.635" height="29.635" viewBox="0 0 29.635 29.635">
            <path id="fi-rs-angle-circle-left" d="M0,14.818A14.818,14.818,0,1,1,14.818,29.635,14.818,14.818,0,0,1,0,14.818Zm27.166,0A12.348,12.348,0,1,0,14.818,27.166,12.348,12.348,0,0,0,27.166,14.818ZM10.6,16.564l5.821,5.818,1.746-1.746-5.821-5.818,5.77-5.77L16.372,7.3l-5.77,5.77A2.47,2.47,0,0,0,10.6,16.564Z" />
          </svg>
        </Slider.PrevButton>
        <Slider.NextButton class="disabled:hidden absolute top-1/2 translate-y-[-50%] right-0 bg-transparent">
          <svg xmlns="http://www.w3.org/2000/svg" width="29.635" height="29.635" viewBox="0 0 29.635 29.635">
            <path id="fi-rs-angle-circle-right" d="M29.635,14.818A14.818,14.818,0,1,1,14.818,0,14.818,14.818,0,0,1,29.635,14.818Zm-27.166,0A12.348,12.348,0,1,0,14.818,2.47,12.348,12.348,0,0,0,2.47,14.818Zm16.564-1.746L13.212,7.253,11.47,9l5.817,5.818-5.77,5.77,1.746,1.746,5.77-5.77a2.47,2.47,0,0,0,0-3.492Z" />
          </svg>
        </Slider.NextButton>
        <SliderJS rootId={id} />
      </div >
    </div>
  );
}

export default Logos;