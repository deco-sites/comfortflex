import { useUI } from "$store/sdk/useUI.ts";
import { invoke } from "../../runtime.ts";
import { Product } from "apps/commerce/types.ts";
import { useSignal } from "@preact/signals";
import { formatPrice } from "$store/sdk/format.ts";
import { useCallback, useEffect } from "preact/compat";

const LOADING_TIME = 1000;

const formatShippingEstimate = (estimate: string) => {
  const [, time, type] = estimate.split(/(\d+)/);

  if (type === "bd") return `${time} dias úteis`;
  if (type === "d") return `${time} dias`;
  if (type === "h") return `${time} horas`;
};

function getSimulationVariables(simulation: ProductOffer) {
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
  simulations: ProductOffer[],
): ProductOffer[] {
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

interface Props {
  product: Product;
}

interface ProductOffer {
  url?: string,
  name: string,
  price: number,
  seller: string,
  listPrice: number,
  productID: string,
  sellerName: string,
  productGroupID: string,
  slas: SLA[]
}

interface SLA {
  price: number,
  shippingEstimate: string
}

interface SelledCardProps {
  method: ProductOffer,
  product: Product
}

function SellerCard({ method, product }: SelledCardProps) {
  const { displayAddToCartPopup } = useUI();

  const {
    price,
    seller,
    listPrice,
    sellerName,
    slas,
  } = method;

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
      <div class="flex justify-between items-start pb-2 max-[420px]:flex-col max-[420px]:gap-2">
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
        <button 
          class="btn no-animation font-normal uppercase bg-brand text-white hover:bg-brand rounded-3xl"
          onClick={() => {
            displayAddToCartPopup.value = {
              product,
              price,
              discount,
              seller,
            }
          }}
        >
          Adicionar ao carrinho
        </button>
      </div>
      <div class="flex items-baseline text-sm gap-1">
        <span>Vendido por:</span>
        <span class="text-base font-semibold uppercase">{sellerName}</span>
      </div>
    </li>
  );
}

export default function SellersSelector({
  product,
}: Props) {
  const loading = useSignal<boolean>(false);
  const simulateResult = useSignal<ProductOffer[] | null>(null);

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

    const simulations = [];
    // @ts-ignore next-line
    const sellers = offers.filter((offer) => {
      return offer.availability === "https://schema.org/InStock";
    });

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
      const formattedSellers: ProductOffer[] = result.map((simulation) => {
        // @ts-ignore Retorna o vendedor em questão, pego a primeira casa, por que como a simulação tem apenas um vendedor, a primeira e a unica
        const seller = simulation.items[0].seller;
        // @ts-ignore Sellers é uma lista de objetos criado logo acima para fazer a requisição de simulação
        const currentSeller = sellers.find((s) => s.seller === seller);
        // @ts-ignore Dentro do objeto de produto, existe uma propriedade chamada "priceSpecification" que contém todas as opções de preços e parcelamentos
        const listPrice = currentSeller?.priceSpecification.find((p) => p.priceType === "https://schema.org/ListPrice")?.price;
        // Formato um objeto especificamente com os dados necessários, antes estava pegando de 2 ou 3 objetos diferentes, gerando total confusão
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
      simulateResult.value = formattedSellers;
    } finally {
      setTimeout(() => loading.value = false, LOADING_TIME);
    }
  }, []);

  // Inicializa a função, buscando o CEP armazenado no localStorage
  useEffect(() => {
    const zipCode = localStorage.getItem("zipCode");
    const currentProduct = product;
    if (zipCode) getSellers(currentProduct);
  }, [product]);

  if (simulateResult.value === null) return null;
  if (simulateResult.value.length === 0) return null;

  // Elimina os vendedores que não tiverem opções de entrega disponíveis
  const filteredSimulations = simulateResult.value.filter((simulation) => {
    const { slas } = simulation;
    return slas.length > 0;
  });

  // Caso não haja vendedores que tenham opções de entrega disponíveis, retorna null
  if (filteredSimulations.length === 0) return null;

  // Ordena os métodos de entrega usando um algoritmo de ordenação Bubble Sort
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
            {
              methods.map((method) => <SellerCard method={method} product={product} />)
            }
          </>
        )}
    </ul>
  );
}