import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

interface BannerCTA {
  srcMobile?: ImageWidget;
  srcDesktop?: ImageWidget;
  alt?: string;
  title?: string;
  buttonText?: string;
  href?: string;
  theme?: "white" | "brand";
}

interface Props {
  banners?: BannerCTA[];
}

const Banner = ({ theme = "white", ...banner }: BannerCTA) => {
  const isWhiteTheme = theme === "brand";

  return (
    <div
      className={`relative flex-none md:flex-initial w-[80vw] sm:w-[50vw] md:w-[60vw] lg:w-auto lg:mb-10 ${
        isWhiteTheme ? "border-white" : "border-brand"
      }`}
    >
      <a href={banner.href}>
        <Image
          src={banner?.srcDesktop || banner?.srcMobile}
          alt={banner.alt}
          loading="lazy"
          class="w-full h-auto rounded-3xl"
        />
      </a>
      <div className="absolute bottom-0 left-1/2 translate-x-[-50%] pb-5">
        <div className="flex justify-center">
          <h3
            className={`text-3xl uppercase font-bold Nunito  ${
              isWhiteTheme ? "text-brand" : "text-white"
            }`}
          >
            {banner?.title}
          </h3>
        </div>
        <div className="flex justify-center">
          {banner?.buttonText && (
            <a
              href={banner.href}
              className={`mt-5 rounded-3xl Nunito ${
                isWhiteTheme
                  ? "bg-transparent text-brand"
                  : "bg-transparent text-white"
              } border border-solid ${
                isWhiteTheme ? "border-brand" : "border-white"
              } text-base px-14 py-2 lg:px-24 uppercase`}
            >
              {banner.buttonText}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const BannerCTA = ({
  banners = [],
}: Props) => {
  return (
    <>
      <div class="flex container gap-4 overflow-auto">
        {banners?.map((banner, index) => <Banner {...banner} />)}
      </div>
    </>
  );
};

export default BannerCTA;
