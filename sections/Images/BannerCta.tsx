import type { ImageWidget } from 'apps/admin/widgets.ts';
import Image from "apps/website/components/Image.tsx";

interface BannerCTA {
    srcMobile?: ImageWidget;
    srcDesktop?: ImageWidget;
    alt?: string;
    title?: string;
    buttonText?: string;
    href?: string;
}

interface Props {
   banners?: BannerCTA[];
}

const Banner = (banner: BannerCTA, index: number) => {
    return (
        <div className="relative flex-none md:flex-initial w-[80vw] sm:w-[50vw] md:w-[60vw] lg:w-auto lg:mb-10">
            <Image
                src={banner?.srcDesktop || banner?.srcMobile}
                alt={banner.alt}
                loading="lazy"
                class="w-full h-auto"
            />
            <div className="absolute bottom-0 left-1/2 translate-x-[-50%] pb-5">
                <div className="flex justify-center">
                    <h3 className="text-3xl text-white uppercase">
                        {banner?.title}
                    </h3>
                </div>
                <div className="flex justify-center">
                    {banner?.buttonText && (
                        <a
                            href={banner.href}
                            className="mt-5 bg-white sm:bg-transparent border border-solid border-white text-base text-black sm:text-white px-14 py-2 lg:px-24 uppercase"
                        >
                            {banner.buttonText}
                        </a>
                    )}
                </div>
            </div>
        </div>
    )
}

const BannerCTA = ({
    banners = []
}: Props) => {
    return (
        <>
            <div class="flex container gap-4 overflow-auto">
                {banners?.map((banner, index) => (
                    <Banner {...banner} />
                ))}
            </div>
        </>
    );
};

export default BannerCTA;