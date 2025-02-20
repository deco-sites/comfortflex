import { useId } from "$store/sdk/useId.ts";
import { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  benefits: Benefit[];
}

interface Benefit {
  benefitImgSrc: ImageWidget;
  benefitImgAltText: string;
  benefitTitle: string;
  benefitDescription: string;
  benefitLink?: string;
}

interface BenefitItemProps {
  benefit: Benefit;
  key: string;
}

const BenefitItem = ({ benefit }: BenefitItemProps) => {
  return (
    <a className="order-4 w-full h-full" href={benefit.benefitLink}>
      <div
        style={`border: ${
          benefit.benefitLink ? "1px solid #BC81FF" : "none"
        }; color:#BC81FF; border-radius:23px;`}
        className={`group flex gap-2 py-[1.3rem] px-[2.2rem] lg:p-5  order-3 hover:text-white w-full h-full items-center`}
      >
        <div className="flex items-center">
          <img
            src={benefit.benefitImgSrc}
            alt={benefit.benefitImgAltText}
            className="max-w-full max-h-full object-cover"
          />
        </div>
        <div className="flex-auto flex flex-col gap-1">
          <div className="text-base md:text-lg font-semibold uppercase">
            {benefit.benefitTitle}
          </div>
          <p className="text-xs uppercase">{benefit.benefitDescription}</p>
        </div>
      </div>
    </a>
  );
};

const Benefits = ({ benefits }: Props) => {
  const id = useId();
  return (
    <div
      id={id}
      className={`container grid grid-cols-1 my-5 items-center justify-center gap-3 w-full h-full md:gap-8 md:grid-cols-2 ${
        benefits.length ? `lg:grid-cols-${benefits.length}` : null
      }`}
    >
      {benefits &&
        benefits.map((benefit: Benefit) => (
          <BenefitItem key={benefit.benefitTitle} benefit={benefit} />
        ))}
    </div>
  );
};

export default Benefits;
