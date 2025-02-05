import Image from "apps/website/components/Image.tsx";
import { useId } from "$store/sdk/useId.ts";
import { asset } from "$fresh/runtime.ts";

const InstallmentBenefit = () => {
  return (
    <div
      style="border: 1px solid #BC81FF; "
      className={`flex gap-2 p-5 order-1 bf-benefits__item`}
    >
      <div className="flex items-center bf-benefits__img">
        <Image
          src={asset("./image/card.svg")}
          alt={"Até 6x sem juros"}
          className="max-w-full max-h-full object-cover"
        />
      </div>
      <div style="color:#BC81FF;" className="flex-auto flex flex-col gap-1">
        <div className="text-base md:text-lg font-semibold uppercase">
          ATÉ 6X
        </div>
        <p className="text-xs uppercase">SEM JUROS!</p>
      </div>
    </div>
  );
};

const DevolutionBenefit = () => {
  return (
    <div
      style="border: 1px solid #BC81FF; color:#BC81FF;"
      className={`flex gap-2 p-5 order-last md:order-2 bf-benefits__item`}
    >
      <div className="flex items-center bf-benefits__img">
        <Image
          src={asset("./image/box.svg")}
          alt={"Primeira devolução é por nossa conta"}
          className="max-w-full max-h-full object-cover"
        />
      </div>
      <div style="color:#BC81FF;" className="flex-auto flex flex-col gap-1">
        <div className="text-base md:text-lg font-semibold  uppercase">
          1° DEVOLUÇÃO
        </div>
        <p className="text-xs  uppercase">É POR NOSSA CONTA!</p>
      </div>
    </div>
  );
};

const MarketplaceBenefit = () => {
  return (
    <a
      style="border: 1px solid #BC81FF; color:#BC81FF;"
      className="order-3 bf-benefits__item"
      href="/black-friday"
    >
      <div
        className={`group flex gap-2 py-[1.3rem] px-[2.2rem] lg:p-5  order-3`}
      >
        <div className="flex items-center bf-benefits__img">
          <Image
            src={asset("./image/icon-discount.png")}
            alt={"APROVEITE NOSSOS descontos BLACK FRIDAY"}
            className="max-w-full max-h-full object-cover"
          />
        </div>
        <div className="flex-auto flex flex-col gap-1 ">
          <div className="text-xs uppercase">APROVEITE NOSSOS</div>
          <p className="text-base md:text-lg font-semibold uppercase">
            descontos BLACK FRIDAY
          </p>
        </div>
      </div>
    </a>
  );
};

const StoreBenefit = () => {
  return (
    <a
      style="border: 1px solid #BC81FF; color:#BC81FF;"
      className="order-4 bf-benefits__item"
      href="/black-friday"
    >
      <div
        className={`group flex gap-2 py-[1.3rem] px-[2.2rem] lg:p-5  order-3`}
      >
        <div className="flex items-center bf-benefits__img">
          <Image
            src={asset("./image/icon-gift.png")}
            alt={"Antecipe suas compras de natal com a nossa black friday"}
            className="max-w-full max-h-full object-cover"
          />
        </div>
        <div className="flex-auto flex flex-col gap-1">
          <div className="text-xs uppercase">
            ANTECIPE SUAS COMPRAS DE NATAL
          </div>
          <p className="text-base md:text-lg font-semibold uppercase">
            COM A nossa Black Friday
          </p>
        </div>
      </div>
    </a>
  );
};

const Benefits = () => {
  const id = useId();
  return (
    <div
      id={id}
      className="p-5 max-w-full	overflow-hidden"
    >
      <div className="lg:container flex overflow-auto my-5 items-center lg:justify-center gap-3 md:flex-row md:gap-10">
        <InstallmentBenefit />
        <DevolutionBenefit />
        <MarketplaceBenefit />
        <StoreBenefit />
      </div>
    </div>
  );
};

export default Benefits;
