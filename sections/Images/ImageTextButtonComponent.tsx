import type { ImageWidget } from 'apps/admin/widgets.ts';

interface ImageTextButtonProps {
    isMobile: ImageWidget;
    isDesktop: ImageWidget;
    alt?: string;
    title: string;
    text?: string;
    link: string;
    buttonText: string;
}

const ImageTextButtonComponent = ({
    isDesktop,
    isMobile,
    alt,
    title,
    text,
    link,
    buttonText,
}: ImageTextButtonProps) => {
    return (
        <div className="container lg:bg-transparent min-[430px]:flex lg:block min-[430px]:items-stretch min-[430px]:px-[15px] min-[430px]:py-7 lg:px-[30px] lg:py-0 relative mb-10">
            <img
                src={isDesktop}
                alt={alt}
                width={834}
                height={666}
                className="hidden object-cover object-center min-[430px]:block w-1/2 lg:w-full lg:max-w-[80%] h-auto rounded-3xl"
            />
            <img
                src={isMobile}
                alt={alt}
                width={834}
                height={666}
                className="block min-[430px]:hidden w-full h-auto rounded-3xl"
            />
            <div className="flex flex-col items-start w-[90%] m-auto relative -mt-[150px] min-[430px]:mt-0 p-[38px] min-[430px]:p-7 lg:absolute lg:translate-y-[-50%] lg:top-1/2 lg:right-0 min-[430px]:w-1/2 lg:w-2/4 lg:px-[68px] lg:py-[63px] bg-brand rounded-3xl lg:mr-[30px] lg:mt-0">
                <h2 className="text-white text-xl leading-tight min-[430px]:text-2xl lg:leading-normal lg:text-[40px] mb-5 lg:mb-5">{title}</h2>
                <p className="text-xs text-white min-[430px]:text-sm lg:text-xl">{text}</p>
                <a href={link} className="flex items-center gap-x-2 text-sm min-[430px]:text-base text-white py-3 px-8 border border-solid border-white rounded-3xl mt-7 lg:mt-[35px]" style={{ lineHeight: "1.2" }}>
                    {buttonText}
                    <svg id="_01_align_center" data-name="01 align center" xmlns="http://www.w3.org/2000/svg" width="6.532" height="12.027" viewBox="0 0 6.532 12.027">
                        <path id="Caminho_26" data-name="Caminho 26" d="M10.665,17.32,9.4,16.052l4.742-4.746L9.4,6.561l1.269-1.268,4.739,4.746a1.793,1.793,0,0,1,0,2.536Z" transform="translate(-9.4 -5.293)" fill="#fff"/>
                    </svg>
                </a>
            </div>
        </div>
    );
};

export default ImageTextButtonComponent;
