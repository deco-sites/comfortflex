import type {
  AggregateOffer,
  UnitPriceSpecification,
} from "apps/commerce/types.ts";
import { formatPrice } from "$store/sdk/format.ts";

const bestInstallment = (
  acc: UnitPriceSpecification | null,
  curr: UnitPriceSpecification,
) => {
  if (curr.priceComponentType !== "https://schema.org/Installment") {
    return acc;
  }

  if (!acc) {
    return curr;
  }

  if (acc.price > curr.price) {
    return curr;
  }

  if (acc.price < curr.price) {
    return acc;
  }

  if (
    acc.billingDuration && curr.billingDuration &&
    acc.billingDuration < curr.billingDuration
  ) {
    return curr;
  }

  return acc;
};

const installmentToString = (
  installment: UnitPriceSpecification,
  sellingPrice: number,
) => {
  const { billingDuration, billingIncrement, price } = installment;

  if (!billingDuration || !billingIncrement) {
    return "";
  }

  const withTaxes = sellingPrice < price;

  return `${billingDuration}x de ${formatPrice(billingIncrement)} ${
    withTaxes ? "com juros" : "sem juros"
  }`;
};

export const useOffer = (aggregateOffer?: AggregateOffer) => {
  // @ts-ignore offers is right
  const offer =
    aggregateOffer?.offers.find((o) =>
      o.availability === "https://schema.org/InStock"
    ) || aggregateOffer?.offers[0];

  const listPrice = offer?.priceSpecification.find((spec) =>
    spec.priceType === "https://schema.org/ListPrice"
  );

  const availability = offer?.availability;
  const installment = offer?.priceSpecification.reduce(bestInstallment, null);
  const sellerName = offer?.sellerName;
  const seller = offer?.seller;
  const price = offer?.price;

  return {
    price,
    listPrice: listPrice?.price,
    availability,
    seller,
    sellerName,
    installments: installment && price
      ? installmentToString(installment, price)
      : null,
  };
};
