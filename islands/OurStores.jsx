import Icon from '$store/components/ui/Icon.tsx';
import { useEffect, useState } from "preact/hooks";
import { loadAPI, getStores, setMarkers } from './utils/Map.js';

{/* Wave: AIzaSyC8TmZz-SznMxNzvKXa7a-xxlPCp6o0Gf0 */ }
{/* Ramarim: AIzaSyD12UMsFvd4BALbyBUem2hH2w3Iqc28_ro */ }

const zoom = 9;
const apiKey = "AIzaSyD12UMsFvd4BALbyBUem2hH2w3Iqc28_ro";
const mapSelector = '#map';

let map = null;
let bounds = {};
let allStores = [];

const digitalStores = [
    {
        href: "https://www.galvaocalcados.com.br/feminino/calcados/tenis?loja=1034143&categoria=53&brands%5B%5D=RAMARIM",
        src: "https://ramarim.vteximg.com.br/arquivos/ids/158338/Logo-Galvao.png?v=637836429464330000",
    }, {
        href: "https://www.beckercalcados.com.br/ramarim",
        src: "https://ramarim.vteximg.com.br/arquivos/ids/158339/Becker-Calçados.png?v=637836429847100000",
    }, {
        href: "https://www.dafiti.com.br/ramarim/?wmc=br.ramarim&utm_medium=br&utm_source=ramarim",
        src: "https://ramarim.vteximg.com.br/arquivos/ids/158340/Logo-Dafiti.png?v=637836430106830000",
    }, {
        href: "https://www.marisa.com.br/feminino/c/calcados?q=%3AnewOnStore%3Abrand%3Aramarim&page=2",
        src: "https://ramarim.vteximg.com.br/arquivos/ids/158341/marisa.png?v=637837193197130000",
    }, {
        href: "https://www.anita.com.br/feminino?busca=&ordenacao=&filtro=Marcas%3ARamarim1",
        src: "https://ramarim.vteximg.com.br/arquivos/ids/158342/anita.png?v=637837193652100000",
    }, {
        href: "https://www.belinhacalcados.com.br/produtos?busca=ramarim",
        src: "https://ramarim.vteximg.com.br/arquivos/ids/158343/Loja Belinha.png?v=637837194630430000",
    }, {
        href: "https://www.katy.com.br/Ramarim",
        src: "https://ramarim.vteximg.com.br/arquivos/ids/158344/katy-calcados.png?v=637837195033000000",
    }, {
        href: "https://www.lojaspaguemenos.com.br/loja/busca.php?loja=701238&palavra_busca=ramarim",
        src: "https://ramarim.vteximg.com.br/arquivos/ids/158345/pague-menos.png?v=637837195462330000",
    }, {
        href: "https://www.morgamodas.com.br/loja/busca.php?loja=612431&palavra_busca=ramarim",
        src: "https://ramarim.vteximg.com.br/arquivos/ids/158346/MOrga-modas.png?v=637837195855930000",
    }, {
        href: "https://www.mundialcalcados.com.br/feminino/ramarim?&O=OrderByReleaseDateDESC",
        src: "https://ramarim.vteximg.com.br/arquivos/ids/158347/mundial.png?v=637837196797530000",
    }, {
        href: "https://www.mundodasbotas.com.br/ramarim",
        src: "https://ramarim.vteximg.com.br/arquivos/ids/158348/mundo-das-botas.png?v=637837199539800000",
    }, {
        href: "https://www.passarela.com.br/calcados/Ramarim?map=c,b,specificationFilter_88&O=OrderByReleaseDateDESC",
        src: "https://ramarim.vteximg.com.br/arquivos/ids/158350/passarela.png?v=637837200707630000",
    }, {
        href: "https://www.pittol.com.br/ramarim",
        src: "https://ramarim.vteximg.com.br/arquivos/ids/158351/pitol.png?v=637837227072300000",
    }, {
        href: "https://www.territoriodamoda.com.br/calcados-femininos?loja=711343&categoria=361&brands%5B%5D=Ramarim",
        src: "https://ramarim.vteximg.com.br/arquivos/ids/158352/territorio-da-moda.png?v=637837228089470000",
    }, {
        href: "https://www.zariff.com.br/ramarim",
        src: "https://ramarim.vteximg.com.br/arquivos/ids/158353/zariff.png?v=637837235498170000",
    }, {
        href: "https://www.zattini.com.br/ramarim",
        src: "https://ramarim.vteximg.com.br/arquivos/ids/158354/zattini.png?v=637837235930530000",
    }, {
        href: "https://www.deckercalcados.com.br/ramarim",
        src: "https://ramarim.vteximg.com.br/arquivos/ids/163908/decker (1).png?v=638158869509130000",
    }, {
        href: "https://www.lojaviasurf.com.br/ramarim",
        src: "https://ramarim.vteximg.com.br/arquivos/ids/160006/Loja Via Surf.png?v=637949793616700000",
    }, {
        href: "https://www.b2online.com.br/buscar?search=ramarim&description=true",
        src: "https://ramarim.vteximg.com.br/arquivos/ids/161984/Design sem nome (19).png?v=638036882498370000",
    }, {
        href: "https://www.margilcalcados.com.br/ramarim",
        src: "https://ramarim.vteximg.com.br/arquivos/ids/163498/logotipo-desconto-margil-calcados.jpg?v=638137844319870000",
    }
]

function OurDigitalStores() {
    return (
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {
                digitalStores.map(store => (
                    <div class="flex items-center justify-center border border-[#d1d1d1] p-5">
                        <a href={store.href} target="_blank">
                            <img width="100" height="100" src={store.src} />
                        </a>
                    </div>
                ))
            }
        </div>
    );
}

function init() {
    loadAPI(apiKey)
        .then(async () => {
            const element = document.querySelector(mapSelector);
            map = new google.maps.Map(element, {
                apiKey,
                center: {
                    lat: -23.55123000411924,
                    lng: -46.634156992041035
                },
                mapSelector,
                setPinIcon: "https://ramarim.vteximg.com.br/arquivos/ramarim_pin.png",
                zoom
            });
            const stores = await getStores();
            console.log("stores", stores);
            setMarkers(stores, map);
        });
}

export default function OurStores() {
    const [tabs, setTabs] = useState(1);
    const [stores, setStores] = useState([]);

    useEffect(() => {
        init();
    }, []);

    useEffect(async () => {
        const data = await getStores(map);
        allStores = data;
        setStores(data);
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        const input = e.target.querySelector('input');
        const address = input.value;
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address }, function (results, status) {
            console.log(results[0])
            if (status === "OK") {
                bounds = new google.maps.Circle({
                    map,
                    fillOpacity: 0,
                    strokeOpacity: 0,
                    fillColor: '#fff',
                    strokeColor: '#000',
                    center: {
                        lat: results[0].geometry.location.lat(),
                        lng: results[0].geometry.location.lng()
                    },
                    radius: 50 * 1000,
                });

                const storesIntoBounds = [];

                allStores.forEach((store, i) => {
                    if (bounds.getBounds().contains({
                        lat: parseFloat(allStores[i].latitude),
                        lng: parseFloat(allStores[i].longitude)
                    })) {
                        storesIntoBounds.push(store);
                    }
                });

                setStores(storesIntoBounds);

                const originLocation = results[0].geometry.location;
                map.setCenter(originLocation);
                map.setZoom(9);
            }
        });
    }

    return (
        <div class="container py-8">
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full pb-8 mb-8 border-b border-[#d1d1d1] gap-3 sm:gap-0">
                <h1 class="uppercase text-base text-black">Onde Encontrar</h1>
                <div class="join">
                    <button class={`py-2 px-3 rounded-none border border-black text-sm font-light uppercase ${tabs === 1 ? "bg-white text-black" : "bg-black text-white"}`} onClick={() => setTabs(1)}>Lojas Físicas</button>
                    <button class={`py-2 px-3 rounded-none border border-black text-sm font-light uppercase ${tabs === 2 ? "bg-white text-black" : "bg-black text-white"}`} onClick={() => setTabs(2)}>Lojas Virtuais</button>
                </div>
            </div>
            <div class={tabs === 1 ? "block" : "hidden"}>
                <div>
                    <h2 class="text-base font-semibold text-black mb-2">Lojas Físicas</h2>
                    <p class="text-sm font-light text-[#919191]">Informe uma localização (por exemplo: cep, endereço, cidade ou uf) para encontrar lojas próximas a você.</p>
                    <form class="py-5 join" onSubmit={submitHandler}>
                        <input class="border border-black py-2 px-3 rounded-none" type="text" />
                        <button class="border border-black bg-black text-white py-2 px-3 rounded-none uppercase font-extralight text-sm" type="submit">Pesquisar</button>
                    </form>
                </div>
                <div id="map" style={{ height: "500px" }}></div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-5">
                    {
                        stores.map(store => (
                            <div class="block border border-[#d1d1d1] p-5">
                                <h2 class="uppercase text-base text-black font-semibold mb-2">{store.name}</h2>
                                <p class="block text-sm mb-1 text-[#919191]">{store.address}</p>
                                <p class="block text-sm mb-1 text-[#919191]">CEP {store.cep.replace(/(\d{5})?(\d{3})/, "$1-$2")}</p>
                                <p class="block text-sm mb-2 text-[#919191]">{store.city} - {store.UF}</p>
                                <div class="block text-sm text-black font-medium">
                                    <Icon id="Phone" size={16} strokeWidth={2} class="inline-block mr-2" />
                                    {store.phone}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div class={tabs === 2 ? "block" : "hidden"}>
                <OurDigitalStores />
            </div>
        </div>
    );
}