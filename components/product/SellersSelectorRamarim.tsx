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

function getSimulationVariables(simulation: {
  slas: {
    price: number;
    shippingEstimate: string;
  }[];
}) {
  const { slas } = simulation;

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
    if (currSimulation.price <= pivotSimulation.price) leftArr.push(simulations[index]);
    else rightArr.push(simulations[index]);
  }

  return [...orderMethods(leftArr), pivot, ...orderMethods(rightArr)];
}

function SellerCard({
  index,
  methods,
}) {
  console.log("methods", methods);

  let price = 0;
  let listPrice = 0;

  const {
    url,
    name,
    productID,
    productGroupID,
    seller,
    sellerName,
    slas
  } = methods[index];

  if (slas.length === 0) return null;

  let shippingPrice = 0;
  let shippingEstimate = "";

  if (slas.length > 1) {
    const sla = slas.reduce((prev, curr) => {
      if (prev.price < curr.price) return prev;
      return curr;
    });

    price = sla.price;
    listPrice = sla.listPrice;
    shippingPrice = sla.price;
    shippingEstimate = sla.shippingEstimate;
  } else {
    price = slas[0].price;
    listPrice = slas[0].listPrice;
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
            <span
              class={`text-xl font-semibold ${
                shippingPrice === 0 ? "text-[#16b90b]" : "text-white"
              }`}
            >
              {shippingPrice === 0 ? "Grátis" : (
                formatPrice(shippingPrice / 100, "BRL", "pt-BR")
              )}
            </span>
          </div>
          <span class="text-xs text-[#919191]">
            Em até {formatShippingEstimate(shippingEstimate)}
          </span>
        </div>
        <AddToCartButtonVTEX
          url={url || ""}
          name={name}
          productID={productID}
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
}

export default function SellersSelector({
  product,
}: Props) {
  const loading = useSignal<boolean>(false);
  const productOffers = useSignal<[] | null>(null);
  const simulateResult = useSignal(null);
  const {
    url,
    sku,
    name = "",
    isVariantOf,
  } = product;

  const productGroupID = isVariantOf?.productGroupID ?? "";

  const getSellers = useCallback(async (currentProduct: Product) => {
    loading.value = true;

    const {
      url: productURL,
      name: productName = "",
      productID: id,
      inProductGroupWithID: productGroupID = "",
      offers: {
        // @ts-ignore next-line
        offers,
      }
    } = currentProduct;

    console.log("currentProduct", currentProduct);

    const simulations = [];
    // @ts-ignore next-line
    const sellers = offers.filter((offer) => {
      return offer.availability === "https://schema.org/InStock";
    });

    console.log("sellers", sellers);

    const postalCode = localStorage.getItem("zipCode");

    if (!postalCode) return;

    for (const index in sellers) {
      simulations.push(invoke.vtex.actions.cart.simulation({
        items: [{
          // @ts-ignore next-line
          id,
          seller: sellers[index].seller,
          quantity: 1,
        }],
        postalCode,
        country: "BRA",
      }));
    }

    try {
      const result = await Promise.all(simulations);
      const formattedSellers = result.map((simulation) => {
        const seller = simulation.items[0].seller;
        const currentSeller = sellers.find((s) => s.seller === seller);
        const listPrice = currentSeller?.priceSpecification.find((p) => p.priceType === "https://schema.org/ListPrice")?.price;
        return {
          url: productURL,
          name: productName,
          productID: id,
          productGroupID: productGroupID,
          seller,
          price: currentSeller?.price || 0,
          listPrice,
          sellerName: currentSeller?.sellerName || seller,
          slas: simulation.logisticsInfo[0].slas
        }
      });
      console.log("formattedSellers", formattedSellers);
      simulateResult.value = formattedSellers;
    } finally {
      setTimeout(() => loading.value = false, LOADING_TIME);
    }
  }, []);

  useEffect(() => {
    const zipCode = localStorage.getItem("zipCode");
    const currentProduct = product;
    if (zipCode) getSellers(currentProduct);
  }, [product]);

  if (simulateResult.value === null) return null;
  if (simulateResult.value.length === 0) return null;

  console.log("simulateResult", simulateResult.value);
  const filteredSimulations = simulateResult.value.filter((simulation) => {
    console.log("simulation", simulation);
    const { slas } = simulation;
    return slas.length > 0;
  });
  console.log("filteredSimulations", filteredSimulations);

  if (filteredSimulations.length === 0) return null;

  const methods = orderMethods(filteredSimulations);

  console.log("methods", methods);

  return (
    <ul class="flex flex-col gap-4 p-4 mt-4 bg-black text-white">
      <span class="block uppercase">Outras ofertas de vendedores Ramarim</span>
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
                    index={index}
                    methods={methods}
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
                              index={index}
                              methods={methods}
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