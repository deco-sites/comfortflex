import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

interface CupomList {
  icon?: ImageWidget;
  valor?: string;
  cupom?: string;
  obs1: string;
  obs2?: string;
}

interface Props {
  banners?: CupomList[];
}

const WIDTH = 393;
const HEIGHT = 302;

const Banner = ({ icon, valor, cupom, obs1, obs2 }: CupomList) => {

  return (
    <div
      className='cupomList__item relative flex-none md:flex-initial w-[80vw] sm:w-[50vw] md:w-[60vw] lg:w-auto lg:mb-10'
    >
      <div class='flex items-center bg-white w-full rounded'>
        <div class='cupomList__left bg-brand flex items-center pr-10 relative'>
            <Image src={icon} alt={icon} width={32} height={180} />
            <p class='absolute -left-6 h-[25px] -rotate-90 w-[150px]  text-center font-semibold text-xl'>
                {valor}
            </p>
        </div>
        <div class='cupomList__right block bg-white border-l border-dashed pl-2'>
            <div class='flex items-center gap-2 px-2'>
                <p class=' font-bold text-3x' style="color: #7852A3">CUPOM</p>
                <span class='font-semibold  text-sm py-1 px-5 border border-dashed ' style="border: 1px dashed #7852A3">
                    {cupom}
                </span>
            </div>
            <button
                class='cupomList__btn mt-2 mb-1 h-8 text-white text-xs font-semibold flex justify-center items-center'
            >
                Copiar Código
            </button>
            <span class='text-xs text-[#353535] font-semibold block'>
                Copie o código e utilize na página de pagamento
            </span>
            <div class='bg-[#f3f3f3] p-2' style="background: #f3f3f3">
                <p class='text-sm text-[#777777]'>{obs1}</p>
                <p class='text-sm font-bold text-[#777777]'>{obs2}</p>
            </div>
        </div>
    </div>
    </div>
  );
};

const CupomList = ({
  banners = [],
}: Props) => {
  return (
    <div class="bg-brand w-full cupomList">
      <div class="cupomList__title text-center text-base sm:text-xl text-white uppercase">Cupons Black Friday</div>
      <div class="cupomList__content flex container gap-4 overflow-auto bg-brand">
        {banners?.map((banner, index) => <Banner key={index} {...banner} />)}
      </div>
    </div>
  );
};

export default CupomList;
