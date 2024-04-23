import Image from "apps/website/components/Image.tsx";
import { useId } from "$store/sdk/useId.ts";
import { asset } from "$fresh/runtime.ts";

const InstallmentBenefit = () => {
  return (
    <div className={`flex gap-2 p-5 order-1`}>
      <div className="flex items-center">
        <Image
          src={asset("./image/card.svg")}
          alt={"Até 6x sem juros"}
          className="max-w-full max-h-full object-cover"
        />
      </div>
      <div style="color:#BC81FF;" className="flex-auto flex flex-col gap-1">
        <div className="text-base md:text-lg font-semibold uppercase">ATÉ 6X</div>
        <p className="text-xs uppercase">SEM JUROS!</p>
      </div>
    </div>
  )
}

const DevolutionBenefit = () => {
  return (
    <div style="color:#BC81FF;" className={`flex gap-2 p-5 order-last md:order-2`}>
      <div className="flex items-center">
        <Image
          src={asset("./image/box.svg")}
          alt={"Primeira devolução é por nossa conta"}
          className="max-w-full max-h-full object-cover"
        />
      </div>
      <div style="color:#BC81FF;" className="flex-auto flex flex-col gap-1">
        <div className="text-base md:text-lg font-semibold  uppercase">1° DEVOLUÇÃO</div>
        <p className="text-xs  uppercase">É POR NOSSA CONTA!</p>
      </div>
    </div>
  )
}

const MarketplaceBenefit = () => {
  return (
    <a className="order-3" href='/quero-revender'>
    <div style="border: 1px solid #BC81FF; color:#BC81FF; border-radius:23px;"
      className={`group flex gap-2 py-[1.3rem] px-[2.2rem] lg:p-5  order-3 hover:text-white`}>
      <div className="flex items-center">
        <Image
          src={asset("./image/store.svg")}
          alt={"VENDA NA COMFORTFLEX, FAÇA PARTE DO NOSSO MARKETPLACE!"}
          className="max-w-full max-h-full object-cover"
        />
      </div>
      <div className="flex-auto flex flex-col gap-1 ">
        <div className="text-base md:text-lg font-semibold uppercase">VENDA NA COMFORTFLEX</div>
        <p className="text-xs uppercase">FAÇA PARTE DO NOSSO MARKETPLACE!</p>
      </div>
    </div>
    </a>
  )
}

const StoreBenefit = () => {
  return (
    <a className='order-4' href="/nossas-lojas">
    <div style="border: 1px solid #BC81FF; color:#BC81FF; border-radius:23px;"
      className={`group flex gap-2 py-[1.3rem] px-[2.2rem] lg:p-5  order-3 hover:text-white`}>
      <div className="flex items-center">
        <Image
          src={asset("./image/pin.svg")}
          alt={"PERTO DE VOCÊ, ENCONTRE O VENDEDOR NA SUA CIDADE!"}
          className="max-w-full max-h-full object-cover"
        />
      </div>
      <div className="flex-auto flex flex-col gap-1">
        <div className="text-base md:text-lg font-semibold uppercase">PERTO DE VOCÊ</div>
        <p className="text-xs uppercase">ENCONTRE O VENDEDOR NA SUA CIDADE!</p>
      </div>
    </div>
    </a>
  )
}

const Benefits = () => {
  const id = useId();
  return (
    <div id={id} className="container flex flex-col my-5 items-center justify-center gap-3 md:flex-row md:gap-11">
      <InstallmentBenefit />
      <DevolutionBenefit />
      <MarketplaceBenefit />
      <StoreBenefit />
    </div>
  );
};

export default Benefits;
