import { invoke } from "../../runtime.ts";
import { Product } from "apps/commerce/types.ts";
import { useSignal } from "@preact/signals";
import { formatPrice } from "$store/sdk/format.ts";
import { useCallback, useEffect } from "preact/compat";
import AddToCartButtonVTEX from "$store/islands/AddToCartButton/vtex.tsx";
import type { SimulationOrderForm } from "apps/vtex/utils/types.ts";

const LOADING_TIME = 1000;

const formatShippingEstimate = (estimate: string) => {
  const [, time, type] = estimate.split(/(\d+)/);

  if (type === "bd") return `${time} dias úteis`;
  if (type === "d") return `${time} dias`;
  if (type === "h") return `${time} horas`;
};

function getSimulationVariables(simulation: SimulationOrderForm) {
  const {
    purchaseConditions: {
      itemPurchaseConditions: [{
        slas,
      }],
    },
  } = simulation;

  let price = 0;
  let estimate = "";

  if (slas.length > 1) {
    const sla = slas.reduce((prev, curr) => {
      if (prev.price < curr.price) return prev;
      return curr;
    });

    price = sla.price;
    estimate = sla.shippingEstimate;
  } else {
    price = slas[0].price;
    estimate = slas[0].shippingEstimate;
  }

  const days = parseInt(estimate.replace(/[^0-9]+/, ""));

  return { price, days };
}

function orderMethods(
  simulations: SimulationOrderForm[],
): SimulationOrderForm[] {
  if (simulations.length <= 1) return simulations;

  const pivot = simulations[0];
  const leftArr = [];
  const rightArr = [];

  for (let index = 1; index < simulations.length; index++) {
    const currSimulation = getSimulationVariables(simulations[index]);
    const pivotSimulation = getSimulationVariables(pivot);
    if (
      currSimulation.price <= pivotSimulation.price &&
      currSimulation.days <= pivotSimulation.days
    ) leftArr.push(simulations[index]);
    else rightArr.push(simulations[index]);
  }

  return [...orderMethods(leftArr), pivot, ...orderMethods(rightArr)];
}

function SellerCard({
  productName: name,
  productUrl: url,
  productGroupID,
  method,
  offer,
  sku,
}) {
  const {
    purchaseConditions: {
      itemPurchaseConditions: [{
        id,
        price,
        listPrice,
        seller,
        slas,
      }],
    },
  } = method;

  const { sellerName } = offer;

  if (slas.length === 0) return null;

  let shippingPrice = 0;
  let shippingEstimate = "";

  if (slas.length > 1) {
    const sla = slas.reduce((prev, curr) => {
      if (prev.price < curr.price) return prev;
      return curr;
    });

    shippingPrice = sla.price;
    shippingEstimate = sla.shippingEstimate;
  } else {
    shippingPrice = slas[0].price;
    shippingEstimate = slas[0].shippingEstimate;
  }

  const discount = price && listPrice ? listPrice - price : 0;

  return (
    <li class="block border-b border-white last:border-none pb-3">
      <div class="flex justify-between items-start pb-2">
        <div class="flex flex-col gap-1">
          <div class="flex items-baseline text-base font-semibold gap-1">
            Frete:
            <span class="text-xl font-semibold text-white uppercase">
              {shippingPrice === 0 ? "Grátis" : (
                formatPrice(shippingPrice / 100, "BRL", "pt-BR")
              )}
            </span>
          </div>
          <span class="text-xs text-[#fbf7ff]">
            Em até {formatShippingEstimate(shippingEstimate)}
          </span>
        </div>
        <AddToCartButtonVTEX
          url={url || ""}
          name={name}
          productID={sku}
          productGroupID={productGroupID}
          price={price}
          discount={discount}
          seller={seller}
        />
      </div>
      <div class="flex items-baseline text-sm gap-1">
        <span>Vendido por:</span>
        <span class="text-base font-semibold uppercase">{sellerName}</span>
      </div>
    </li>
  );
}

interface Props {
  product: Product;
  currentSeller: string;
}

let sellers = [];
export default function SellersSelector({
  product,
  currentSeller,
}: Props) {
  const loading = useSignal<boolean>(false);
  const simulateResult = useSignal<SimulationOrderForm[] | null>(null);
  const {
    url,
    sku,
    name = "",
    isVariantOf,
  } = product;

  const productGroupID = isVariantOf?.productGroupID ?? "";

  const getSellers = useCallback(async () => {
    loading.value = true;
    const simulations = [];
    sellers = product.offers.offers.filter((offer) => {
      return offer.inventoryLevel.value > 0;
    });

    for (const index in sellers) {
      simulations.push(invoke.vtex.actions.cart.simulation({
        items: [{
          id: product.productID,
          seller: sellers[index].seller,
          quantity: 1,
        }],
        postalCode: "12942500",
        country: "BRA",
      }));
    }

    try {
      const result = await Promise.all(simulations);
      simulateResult.value = result;
    } finally {
      setTimeout(() => loading.value = false, LOADING_TIME);
    }
  }, []);

  useEffect(() => {
    const zipCode = localStorage.getItem("zipCode");
    const shippingCode = localStorage.getItem("shippingCode");

    if (zipCode) {
      getSellers();
    }
    if (shippingCode) {
      getSellers();
    }
  }, [product]);

  if (simulateResult.value === null) return null;
  if (simulateResult.value.length === 0) return null;

  const filteredSimulations = simulateResult.value.filter((simulation) => {
    const {
      purchaseConditions: {
        itemPurchaseConditions: [{
          slas,
        }],
      },
    } = simulation;

    return slas.length > 0;
  });

  if (filteredSimulations.length === 0) return null;

  const methods = orderMethods(filteredSimulations);

  return (
    <ul class="flex flex-col gap-4 p-4 mt-4 bg-brand text-white rounded-3xl">
      <span class="block uppercase">
        Outras ofertas de vendedores Comfortflex
      </span>
      {loading.value
        ? (
          <div class="w-full flex items-center justify-center h-16">
            <span class="loading loading-ring" />
          </div>
        )
        : (
          <>
            {methods.map((method, index) => {
              if (index < 2) {
                return (
                  <SellerCard
                    method={method}
                    productUrl={url}
                    productName={name}
                    productGroupID={productGroupID}
                    sku={sku}
                    offer={sellers[index]}
                  />
                );
              }
              return null;
            })}
            {methods.length > 2
              ? (
                <div class="collapse collapse-arrow rounded-none">
                  <input type="checkbox" class="min-h-[0]" />
                  <div class="collapse-title min-h-[0] !p-0 flex gap-2 underline mb-4">
                    <span class="uppercase underline">Ver mais ofertas</span>
                  </div>
                  <div class="collapse-content !p-0">
                    <ul class="flex flex-col gap-4">
                      {methods.map((method, index) => {
                        if (index >= 2) {
                          return (
                            <SellerCard
                              method={method}
                              productUrl={url}
                              productName={name}
                              productGroupID={productGroupID}
                              sku={sku}
                              offer={sellers[index]}
                            />
                          );
                        }
                        return null;
                      })}
                    </ul>
                  </div>
                </div>
              )
              : null}
          </>
        )}
    </ul>
  );
}
