import { useLayoutEffect, useState } from "preact/hooks";
import Icon from "$store/components/ui/Icon.tsx";

export default function Reseller() {
    const [state, setState] = useState(null);
    const [resellers, setResellers] = useState([]);

    const stateChange = (event) => {
        setState(event.target.value);
    }

    useLayoutEffect(() => {
        const getResellers = async () => {
            const response = await fetch("/api/dataentities/RP/search?_fields=id,states,UF,email,name,phone&_where=(name is not null)", {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/vnd.vtex.ds.v10+json',
                    "REST-Range": "resources=0-1000",
                    "v-cache": "false"
                }
            });
            const data = await response.json();
            setResellers(data);
        }

        getResellers();
    }, []);

    const filterResellers = resellers.filter((reseller) => {
        if (state === null) return true;
        return reseller.states.includes(state);
    });
    
    if (resellers.length > 0) {
        return (
            <div class="container pt-12 pb-8 flex flex-col items-center">
                <h1 class="text-base uppercase text-brand font-semibold text-center">Representantes</h1>
                <p class="text-sm text-[#919191] text-center">Para revender Comfortflex na sua loja, entre em contato com o representante da sua região, aplicando o filtro por Estado abaixo:</p>
                <div class="mt-3 mb-8 border border-brand">
                    <select class="w-min cursor-pointer outline-none uppercase p-3 sm:py-2 sm:px-5 mr-3 sm:mr-4 text-brand rounded-none text-xs sm:text-sm" onChange={stateChange}>
                        <option value="AC">Acre</option>
                        <option value="AL">Alagoas</option>
                        <option value="AP">Amapá</option>
                        <option value="AM">Amazonas</option>
                        <option value="BA">Bahia</option>
                        <option value="CE">Ceará</option>
                        <option value="DF">Distrito Federal</option>
                        <option value="ES">Espírito Santo</option>
                        <option value="GO">Goiás</option>
                        <option value="MA">Maranhão</option>
                        <option value="MT">Mato Grosso</option>
                        <option value="MS">Mato Grosso do Sul</option>
                        <option value="MG">Minas Gerais</option>
                        <option value="PA">Pará</option>
                        <option value="PB">Paraíba</option>
                        <option value="PR">Paraná</option>
                        <option value="PE">Pernambuco</option>
                        <option value="PI">Piauí</option>
                        <option value="RJ">Rio de Janeiro</option>
                        <option value="RN">Rio Grande do Norte</option>
                        <option value="RS">Rio Grande do Sul</option>
                        <option value="RO">Rondônia</option>
                        <option value="RR">Roraima</option>
                        <option value="SC">Santa Catarina</option>
                        <option value="SP">São Paulo</option>
                        <option value="SE">Sergipe</option>
                        <option value="TO">Tocantins</option>
                    </select>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {
                        filterResellers.map((reseller) => {
                            return (
                                <div class="block border border-brand p-5">
                                    <div class="uppercase text-base text-brand font-semibold">{reseller.name}</div>
                                    <small class="block text-xs mb-3 text-brand uppercase">{reseller.states}</small>
                                    <div class="block text-sm text-brand font-medium">
                                        <Icon id="Phone" size={16} strokeWidth={2} class="inline-block mr-2" />
                                        {reseller.email}
                                    </div>
                                    <div class="block text-sm text-brand font-medium">
                                        <Icon id="Message" size={16} strokeWidth={2} class="inline-block mr-2" />
                                        {reseller.phone}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

    return (
        <div class="w-screen h-screen flex items-center justify-center">
            <div class="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-brand"></div>
        </div>
    )
}
