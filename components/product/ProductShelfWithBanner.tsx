import { SendEventOnLoad } from "$store/components/Analytics.tsx";
import ProductCard, {
    Layout as cardLayout,
} from "$store/components/product/ProductCard.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";
import Header from "$store/components/ui/SectionHeader.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { Product } from "apps/commerce/types.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";

export interface Props {
    products: Product[] | null;
    title?: string;
    description?: string;
    layout?: {
        headerAlignment?: "center" | "left";
        headerfontSize?: "Normal" | "Large";
    };
    cardLayout?: cardLayout;
    banner: ImageWidget;
    link: string;
    buttonText: string;
}

function ProductShelfWithBanner({
    products,
    title,
    description,
    layout,
    cardLayout,
    banner,
    link = "#",
    buttonText = "Ver todos os produtos"
}: Props) {
    const id = useId();
    const platform = usePlatform();

    if (!products || products.length === 0) {
        return null;
    }

    return (
        <div className="relative">
            <div class="w-full lg:bg-black flex flex-col gap-8 lg:gap-16 mt-7 pt-0 lg:pb-0 lg:mb-28">
                <div className="md:pt-16 text-center text-base sm:text-xl text-black lg:text-white">{title || ""}</div>
                <div class="flex flex-col md:flex-row items-center gap-8 container bg-black lg:bg-transparent mt-[50px] lg:mt-0 pb-9 lg:pb-0">
                    <Image
                        src={banner}
                        class="block w-[80vw] lg:w-[calc(40% - 16px)] relative mt-[-50px] lg:mt-0 lg:mb-[-50px] h-[calc(100% + 50px)] object-cover object-center"
                    />
                    <div
                        id={id}
                        class="container w-full lg:w-[calc(60% - 16px)] grid grid-cols-[48px_1fr_48px] px-0 sm:px-9"
                    >
                        <Slider class="carousel carousel-center sm:carousel-end gap-6 col-span-full row-start-2 row-end-5">
                            {products?.map((product, index) => (
                                <Slider.Item
                                    index={index}
                                    class="carousel-item w-[270px] sm:w-[292px] last:pr-6 sm:last:pr-0"
                                >
                                    <ProductCard
                                        product={product}
                                        itemListName={title}
                                        layout={cardLayout}
                                        platform={platform}
                                        theme="light"
                                        index={index}
                                    />
                                </Slider.Item>
                            ))}
                        </Slider>

                        <>
                            <div class="hidden relative sm:block z-10 col-start-1 row-start-3">
                                <Slider.PrevButton class="disabled:hidden border-none absolute left-[-36px] bg-transparent rotate-180">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="29.635" height="29.635" viewBox="0 0 29.635 29.635">
                                        <path id="fi-rs-angle-circle-right" d="M29.635,14.818A14.818,14.818,0,1,1,14.818,0,14.818,14.818,0,0,1,29.635,14.818Zm-27.166,0A12.348,12.348,0,1,0,14.818,2.47,12.348,12.348,0,0,0,2.47,14.818Zm16.564-1.746L13.212,7.253,11.47,9l5.817,5.818-5.77,5.77,1.746,1.746,5.77-5.77a2.47,2.47,0,0,0,0-3.492Z" fill="#fff"/>
                                    </svg>
                                </Slider.PrevButton>
                            </div>
                            <div class="hidden relative sm:block z-10 col-start-3 row-start-3">
                                <Slider.NextButton class="disabled:hidden border-none absolute right-[-36px] bg-transparent">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="29.635" height="29.635" viewBox="0 0 29.635 29.635">
                                        <path id="fi-rs-angle-circle-right" d="M29.635,14.818A14.818,14.818,0,1,1,14.818,0,14.818,14.818,0,0,1,29.635,14.818Zm-27.166,0A12.348,12.348,0,1,0,14.818,2.47,12.348,12.348,0,0,0,2.47,14.818Zm16.564-1.746L13.212,7.253,11.47,9l5.817,5.818-5.77,5.77,1.746,1.746,5.77-5.77a2.47,2.47,0,0,0,0-3.492Z" fill="#fff"/>
                                    </svg>
                                </Slider.NextButton>
                            </div>
                        </>
                        <SliderJS rootId={id} />
                        <SendEventOnLoad
                            event={{
                                name: "view_item_list",
                                params: {
                                    item_list_name: title,
                                    items: products.map((product) =>
                                        mapProductToAnalyticsItem({
                                            product,
                                            ...(useOffer(product.offers)),
                                        })
                                    ),
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
            <a href={link} className="block w-fit py-3 lg:py-2 px-7 bg-black lg:bg-white text-white lg:text-black text-sm mt-4 mx-auto lg:m-0 uppercase lg:border lg:border-black lg:absolute lg:left-[73%] lg:-bottom-[50px] lg:-translate-x-[50%]">{buttonText}</a>
        </div>
    );
}

export default ProductShelfWithBanner;
