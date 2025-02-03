import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "deco-sites/std/components/Image.tsx";

interface Props {
  srcMobile?: ImageWidget;
  srcDesktop?: ImageWidget;
  alt?: string;
  href?: string;
  // title?: string;
  // subTitle?: string;
  // buttonText?: string;
  // href?: string;
  // hiddenText: boolean
}
const Infocard = ({
  srcMobile = {},
  srcDesktop = {},
  alt = "Outlet Comfortflex",
  href = "",
}: Props) => {
  return (
    <div className="container">
      {/* <div> */}
      <a href={href}>
        <Image src={srcDesktop} class="hidden sm:block" alt={alt} />
        <Image src={srcMobile} class="block sm:hidden" alt={alt} />
      </a>
      {
        /* <div className="flex flex-row-reverse md:ml-24 h-[344px] md:h-[500px]">
                    {!hiddenText &&
                        <div className="mt-32 mr-8 md:mt-[170px] md:mr-[200px]">
                            <div className=" md:w-1/4">
                                <h3 className="text-[40px] font-bold text-white ">{title}</h3>
                                <h4 className="text-[40px] font-extralight text-white mb-4 mt-[-15px]">{subTitle}</h4>
                                <a className="mt-5 bg-transparent border border-solid border-white text-base text-white px-14 py-2 md:px-[20px]" href={href}>{buttonText}</a>
                            </div>
                            <div className="md:w-4/5"></div>
                        </div>
                    }
                </div> */
      }
      {/* </div> */}
    </div>
  );
};

export default Infocard;
