import Image from "deco-sites/std/components/Image.tsx";
interface Props {
    text: {
        institucionalText?: string,
        copyrightText?: string,
    }
}

export default function Copyright(props: Props) {
    const { institucionalText, copyrightText } = props.text;
    return (
        <div>
            <div class="lg:container flex flex-col items-center justify-center gap-5 mx-4 my-7 md:flex-row md:mx-auto">
                <Image width="246" height="44" class="h-[44px]" src="https://ramarim.vteximg.com.br/arquivos/grupoRamarim.png" alt="Descrição da imagem" />
                <p class="text-center text-xs md:text-sm md:text-start md:m-0">{institucionalText}</p>
            </div>
            <div class="bg-gray-200 md:mt-5">
                <div class="lg:container py-8 mt-5 md:py-4">
                    <div class="flex flex-col items-center md:max-w-6xl md:flex-row md:gap-6 md:justify-between">
                        <p class="text-center mt-4 md:mt-0 text-gray-600 text-xs">{copyrightText}</p>
                        <div class="flex flex-col items-center gap-3 mt-5 max-w-sm md:items-end md:flex-row md:mt-0">
                            <div class="flex items-center gap-3 text-xs text-gray-600">
                                <p>Created by</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="112.648" height="20.187" viewBox="0 0 112.648 20.187">
                                    <g id="Grupo_55" data-name="Grupo 55" transform="translate(-1205.982 -5426.007)">
                                        <path id="Vector" d="M3.822,7.041A2.327,2.327,0,0,0,6,5.666V2.875A2.368,2.368,0,0,0,3.822,1.459,2.684,2.684,0,0,0,1.358,4.25,2.643,2.643,0,0,0,3.822,7.041ZM5.976.719A.576.576,0,0,1,6.519.148h.252A.582.582,0,0,1,7.315.74V7.7a.568.568,0,0,1-.543.592H6.519A.556.556,0,0,1,6,7.8a3.648,3.648,0,0,1-2.173.7A4.051,4.051,0,0,1,0,4.25,4.048,4.048,0,0,1,3.8,0,3.569,3.569,0,0,1,5.976.719Z" transform="translate(1249.871 5427.069)" fill="#0066e4"/>
                                        <path id="Vector-2" data-name="Vector" d="M3.822,7.041A2.327,2.327,0,0,0,6,5.666V2.875A2.368,2.368,0,0,0,3.822,1.459,2.684,2.684,0,0,0,1.358,4.25,2.643,2.643,0,0,0,3.822,7.041ZM5.976.719A.576.576,0,0,1,6.519.148h.252A.569.569,0,0,1,7.315.74V7.7a.582.582,0,0,1-.543.592H6.519A.556.556,0,0,1,6,7.8a3.648,3.648,0,0,1-2.173.7A4.051,4.051,0,0,1,0,4.25,4.048,4.048,0,0,1,3.8,0,3.569,3.569,0,0,1,5.976.719Z" transform="translate(1249.871 5427.069)" fill="#0066e4"/>
                                        <path id="Vector-3" data-name="Vector" d="M8.027,12.681A4.93,4.93,0,0,0,9.56,12.26a10.351,10.351,0,0,0,2.184-1.574l.693-2.505L12.877,9.8l.441-.333A11.507,11.507,0,0,1,15.585,8.2l-1.7-6.03a1.27,1.27,0,0,0-1.2-.931h-.525a1.251,1.251,0,0,0-1.2.931Zm-.588.022h.147L3.975,1.973A1.268,1.268,0,0,0,2.8,1.108a1.016,1.016,0,0,0-.357.067l-.525.155A1.215,1.215,0,0,0,1.162,2,1.476,1.476,0,0,0,1.1,3.037L4.08,11.861a7.6,7.6,0,0,0,3.359.842ZM19.112,7.272c.5-.044,1.008-.089,1.512-.089a14.6,14.6,0,0,1,1.7.111l1.428-4.279a1.371,1.371,0,0,0-.063-1.042,1.233,1.233,0,0,0-.735-.665l-.525-.155a1.964,1.964,0,0,0-.357-.044,1.248,1.248,0,0,0-1.176.865ZM22.052,0A2.1,2.1,0,0,1,22.7.089l.525.155a2.469,2.469,0,0,1,1.386,1.219,2.508,2.508,0,0,1,.126,1.907L23.374,7.449l-.357,1.042c-.357-.067-.693-.111-1.05-.155-.462-.044-.9-.067-1.365-.067a10.865,10.865,0,0,0-1.89.155,7.391,7.391,0,0,0-1.176.244c-.231.044-.462.133-.693.2-.315.111-.651.244-.966.377a10.471,10.471,0,0,0-1.995,1.108l-.693.532c-.273.222-.525.421-.777.643-.4.333-.756.643-1.155.931a8.8,8.8,0,0,1-1.281.8,5.65,5.65,0,0,1-2.54.554,8.274,8.274,0,0,1-2.876-.554,9.506,9.506,0,0,1-1.281-.576.021.021,0,0,0-.021-.022l-.546-1.618L.133,3.392a2.6,2.6,0,0,1,.1-1.907A2.354,2.354,0,0,1,1.623.288L2.148.133A2.116,2.116,0,0,1,2.8.022a2.318,2.318,0,0,1,2.142,1.6L7.733,9.888,9.98,1.862A2.313,2.313,0,0,1,12.163.133h.525a2.313,2.313,0,0,1,2.184,1.729L16.53,7.826a10.159,10.159,0,0,1,1.407-.377L19.91,1.6A2.318,2.318,0,0,1,22.052,0Z" transform="translate(1205.982 5426.007)" fill="#0066e4"/>
                                        <path id="Vector-4" data-name="Vector" d="M8.027,12.681A4.93,4.93,0,0,0,9.56,12.26a10.351,10.351,0,0,0,2.184-1.574l.693-2.505L12.877,9.8l.441-.333A11.507,11.507,0,0,1,15.585,8.2l-1.7-6.03a1.27,1.27,0,0,0-1.2-.931h-.525a1.251,1.251,0,0,0-1.2.931Zm-.588.022h.147L3.975,1.973A1.268,1.268,0,0,0,2.8,1.108a1.016,1.016,0,0,0-.357.067l-.525.155A1.215,1.215,0,0,0,1.162,2,1.476,1.476,0,0,0,1.1,3.037L4.08,11.861a7.6,7.6,0,0,0,3.359.842ZM19.112,7.272c.5-.044,1.008-.089,1.512-.089a14.6,14.6,0,0,1,1.7.111l1.428-4.279a1.371,1.371,0,0,0-.063-1.042,1.233,1.233,0,0,0-.735-.665l-.525-.155a1.964,1.964,0,0,0-.357-.044,1.248,1.248,0,0,0-1.176.865ZM22.052,0A2.1,2.1,0,0,1,22.7.089l.525.155a2.469,2.469,0,0,1,1.386,1.219,2.508,2.508,0,0,1,.126,1.907L23.374,7.449l-.357,1.042c-.357-.067-.693-.111-1.05-.155-.462-.044-.9-.067-1.365-.067a10.865,10.865,0,0,0-1.89.155,7.391,7.391,0,0,0-1.176.244c-.231.044-.462.133-.693.2-.315.111-.651.244-.966.377a10.471,10.471,0,0,0-1.995,1.108l-.693.532c-.273.222-.525.421-.777.643-.4.333-.756.643-1.155.931a8.8,8.8,0,0,1-1.281.8,5.65,5.65,0,0,1-2.54.554,8.274,8.274,0,0,1-2.876-.554,9.506,9.506,0,0,1-1.281-.576.021.021,0,0,0-.021-.022l-.546-1.618L.133,3.392a2.6,2.6,0,0,1,.1-1.907A2.354,2.354,0,0,1,1.623.288L2.148.133A2.116,2.116,0,0,1,2.8.022a2.318,2.318,0,0,1,2.142,1.6L7.733,9.888,9.98,1.862A2.313,2.313,0,0,1,12.163.133h.525a2.313,2.313,0,0,1,2.184,1.729l1.68,5.964a9.153,9.153,0,0,1,1.386-.377L19.91,1.6A2.318,2.318,0,0,1,22.052,0Z" transform="translate(1205.982 5426.007)" fill="#0066e4"/>
                                        <path id="Vector-5" data-name="Vector" d="M3.23,6.463a8.862,8.862,0,0,1-1.685-.152l.8,2.406a1.205,1.205,0,0,0,1.124.845h.582A1.2,1.2,0,0,0,5.2,8.63l.7-2.6a8.333,8.333,0,0,1-2.668.434Zm9.209-3.273L12.078,1.91a7.266,7.266,0,0,0-1.184.694,15.222,15.222,0,0,0-1.224,1c-.04.043-.08.065-.12.108L10.874,8.63a1.2,1.2,0,0,0,1.144.932H12.6A1.2,1.2,0,0,0,13.723,8.7l2.488-7.63a2.491,2.491,0,0,0-.4-.022,8.771,8.771,0,0,0-2.849.477ZM15.81,0c.241,0,.5,0,.742.022a7.88,7.88,0,0,1,1,.108l-.341,1.019-2.568,7.89A2.183,2.183,0,0,1,12.6,10.6h-.582A2.2,2.2,0,0,1,9.931,8.912L8.708,4.4A10.26,10.26,0,0,1,7.062,5.509L6.139,8.934a2.2,2.2,0,0,1-2.087,1.691H3.471A2.183,2.183,0,0,1,1.425,9.064l-1-3.035L0,4.772a12.022,12.022,0,0,0,1.164.369A8.559,8.559,0,0,0,3.23,5.4a7.053,7.053,0,0,0,3.01-.65c.04-.022.1-.043.14-.065a9.216,9.216,0,0,0,1.083-.65c.321-.238.642-.477.943-.715.221-.2.421-.369.642-.542.06-.065.14-.108.2-.173a10.593,10.593,0,0,1,1.1-.889A9.838,9.838,0,0,1,11.8.87,8.687,8.687,0,0,1,13.382.306,8.3,8.3,0,0,1,15.81,0Z" transform="translate(1210.371 5435.568)" fill="#0066e4"/>
                                        <path id="Vector-6" data-name="Vector" d="M3.23,6.463a8.862,8.862,0,0,1-1.685-.152l.8,2.406a1.225,1.225,0,0,0,1.124.845h.582A1.2,1.2,0,0,0,5.2,8.63l.7-2.6a8.333,8.333,0,0,1-2.668.434Zm9.209-3.273L12.078,1.91a7.266,7.266,0,0,0-1.184.694,15.222,15.222,0,0,0-1.224,1c-.04.043-.08.065-.12.108L10.874,8.63a1.2,1.2,0,0,0,1.144.932H12.6A1.2,1.2,0,0,0,13.723,8.7l2.488-7.63a2.491,2.491,0,0,0-.4-.022,8.771,8.771,0,0,0-2.849.477ZM15.81,0c.241,0,.5,0,.742.022a7.88,7.88,0,0,1,1,.108l-.341,1.019-2.568,7.89A2.183,2.183,0,0,1,12.6,10.6h-.582A2.2,2.2,0,0,1,9.931,8.912L8.708,4.4A10.26,10.26,0,0,1,7.062,5.509L6.139,8.934a2.2,2.2,0,0,1-2.087,1.691H3.471A2.183,2.183,0,0,1,1.425,9.064l-1-3.035L0,4.772a12.022,12.022,0,0,0,1.164.369A8.559,8.559,0,0,0,3.23,5.4a7.053,7.053,0,0,0,3.01-.65c.04-.022.1-.043.14-.065a9.216,9.216,0,0,0,1.083-.65c.321-.238.642-.477.943-.715.221-.2.421-.369.642-.542.06-.065.14-.108.2-.173a10.593,10.593,0,0,1,1.1-.889A9.838,9.838,0,0,1,11.8.87,8.687,8.687,0,0,1,13.382.306,8.3,8.3,0,0,1,15.81,0Z" transform="translate(1210.371 5435.568)" fill="#0066e4"/>
                                        <path id="Vector-7" data-name="Vector" d="M10.793.011a.539.539,0,0,1,.183.021L11.25.1a.6.6,0,0,1,.389.3.56.56,0,0,1,.023.468L8.917,8.1a.608.608,0,0,1-.595.4H8a.614.614,0,0,1-.618-.426L5.852,3.2,4.342,8.074a.656.656,0,0,1-.618.426H3.4a.637.637,0,0,1-.595-.4L.041.862A.56.56,0,0,1,.064.394.657.657,0,0,1,.453.1L.728.032a.626.626,0,0,1,.778.362L3.473,5.542,5.074.479A.656.656,0,0,1,5.692.053h.275a.634.634,0,0,1,.618.426L8.208,5.542,10.175.394a.651.651,0,0,1,.618-.383Z" transform="translate(1238.167 5427.069)" fill="#0066e4"/>
                                        <path id="Vector-8" data-name="Vector" d="M10.793.011a.539.539,0,0,1,.183.021L11.25.1a.6.6,0,0,1,.389.3.56.56,0,0,1,.023.468L8.917,8.1a.608.608,0,0,1-.595.4H8a.614.614,0,0,1-.618-.426L5.852,3.2,4.342,8.074a.656.656,0,0,1-.618.426H3.4a.637.637,0,0,1-.595-.4L.041.862A.56.56,0,0,1,.064.394.657.657,0,0,1,.453.1L.728.032a.626.626,0,0,1,.778.362L3.473,5.542,5.074.479A.656.656,0,0,1,5.692.053h.275a.614.614,0,0,1,.618.426L8.208,5.542,10.175.394a.651.651,0,0,1,.618-.383Z" transform="translate(1238.167 5427.069)" fill="#0066e4"/>
                                        <path id="Vector-9" data-name="Vector" d="M6.565,0a.609.609,0,0,1,.207.042L7,.149a.6.6,0,0,1,.282.34.668.668,0,0,1-.019.467L4.269,8.16A.5.5,0,0,1,3.8,8.5H3.535a.515.515,0,0,1-.471-.34L.053.977A.668.668,0,0,1,.034.51.538.538,0,0,1,.316.17L.542.064a.5.5,0,0,1,.678.3L3.667,6.2,6.095.361A.549.549,0,0,1,6.565,0Z" transform="translate(1258.649 5427.069)" fill="#0066e4"/>
                                        <path id="Vector-10" data-name="Vector" d="M6.565,0a.609.609,0,0,1,.207.042L7,.149a.6.6,0,0,1,.282.34.668.668,0,0,1-.019.467L4.269,8.16A.5.5,0,0,1,3.8,8.5H3.535a.515.515,0,0,1-.471-.34L.053.977A.668.668,0,0,1,.034.51.538.538,0,0,1,.316.17L.542.064a.5.5,0,0,1,.678.3L3.667,6.2,6.095.361A.549.549,0,0,1,6.565,0Z" transform="translate(1258.649 5427.069)" fill="#0066e4"/>
                                        <path id="Vector-11" data-name="Vector" d="M7.185,2.072a.611.611,0,0,1-.154.782l-.212.169a.51.51,0,0,1-.424.085.524.524,0,0,1-.347-.275,2.527,2.527,0,0,0-2.2-1.374A2.67,2.67,0,0,0,1.329,4.25,2.67,2.67,0,0,0,3.852,7.041,2.475,2.475,0,0,0,6.068,5.624a.51.51,0,0,1,.713-.233l.231.127a.606.606,0,0,1,.27.359.559.559,0,0,1-.039.465A3.847,3.847,0,0,1,3.872,8.5,4.074,4.074,0,0,1,0,4.25,4.059,4.059,0,0,1,3.852,0,3.808,3.808,0,0,1,7.185,2.072Z" transform="translate(1239.63 5437.694)" fill="#0066e4"/>
                                        <path id="Vector-12" data-name="Vector" d="M7.185,2.072a.611.611,0,0,1-.154.782l-.212.169a.51.51,0,0,1-.424.085.524.524,0,0,1-.347-.275,2.527,2.527,0,0,0-2.2-1.374A2.67,2.67,0,0,0,1.329,4.25,2.67,2.67,0,0,0,3.852,7.041,2.475,2.475,0,0,0,6.068,5.624a.51.51,0,0,1,.713-.233l.231.127a.606.606,0,0,1,.27.359.559.559,0,0,1-.039.465A3.847,3.847,0,0,1,3.872,8.5,4.074,4.074,0,0,1,0,4.25,4.059,4.059,0,0,1,3.852,0,3.83,3.83,0,0,1,7.185,2.072Z" transform="translate(1239.63 5437.694)" fill="#0066e4"/>
                                        <path id="Vector-13" data-name="Vector" d="M4.389,7.041A2.866,2.866,0,0,0,7.271,4.229,2.835,2.835,0,0,0,4.389,1.438a2.83,2.83,0,0,0-2.86,2.791A2.847,2.847,0,0,0,4.389,7.041ZM8.778,4.25A4.321,4.321,0,0,1,4.389,8.5,4.321,4.321,0,0,1,0,4.25,4.3,4.3,0,0,1,4.367,0,4.327,4.327,0,0,1,8.778,4.25Z" transform="translate(1246.945 5437.694)" fill="#0066e4"/>
                                        <path id="Vector-14" data-name="Vector" d="M4.389,7.041A2.866,2.866,0,0,0,7.271,4.229,2.835,2.835,0,0,0,4.389,1.438a2.83,2.83,0,0,0-2.86,2.791A2.847,2.847,0,0,0,4.389,7.041ZM8.778,4.25A4.321,4.321,0,0,1,4.389,8.5,4.321,4.321,0,0,1,0,4.25,4.3,4.3,0,0,1,4.367,0,4.327,4.327,0,0,1,8.778,4.25Z" transform="translate(1246.945 5437.694)" fill="#0066e4"/>
                                        <path id="Vector-15" data-name="Vector" d="M13.167,3.915V7.894a.589.589,0,0,1-.574.606h-.267a.59.59,0,0,1-.574-.606V3.915c0-1.1-.349-2.4-2.051-2.4a2.32,2.32,0,0,0-2.4,2.4V7.894a.589.589,0,0,1-.574.606H6.46a.59.59,0,0,1-.574-.606V3.915c0-.887-.267-2.4-1.989-2.4A2.446,2.446,0,0,0,1.415,3.071v4.8a.6.6,0,0,1-.574.606H.574A.6.6,0,0,1,0,7.872V.757A.589.589,0,0,1,.574.151H.841a.6.6,0,0,1,.574.606A4.066,4.066,0,0,1,3.9,0,3.077,3.077,0,0,1,6.665,1.427,3.659,3.659,0,0,1,9.7,0c2.153,0,3.466,1.492,3.466,3.915Z" transform="translate(1257.186 5437.694)" fill="#0066e4"/>
                                        <path id="Vector-16" data-name="Vector" d="M13.167,3.915V7.894a.6.6,0,0,1-.574.606h-.267a.59.59,0,0,1-.574-.606V3.915c0-1.1-.349-2.4-2.051-2.4a2.32,2.32,0,0,0-2.4,2.4V7.894a.589.589,0,0,1-.574.606H6.46a.59.59,0,0,1-.574-.606V3.915c0-.887-.267-2.4-1.989-2.4A2.446,2.446,0,0,0,1.415,3.071v4.8a.6.6,0,0,1-.574.606H.574A.6.6,0,0,1,0,7.872V.757A.589.589,0,0,1,.574.151H.841a.6.6,0,0,1,.574.606A4.066,4.066,0,0,1,3.9,0,3.077,3.077,0,0,1,6.665,1.427,3.659,3.659,0,0,1,9.7,0c2.153,0,3.466,1.492,3.466,3.915Z" transform="translate(1257.186 5437.694)" fill="#0066e4"/>
                                        <path id="Vector-17" data-name="Vector" d="M13.167,3.915V7.894a.6.6,0,0,1-.574.606h-.267a.59.59,0,0,1-.574-.606V3.915c0-1.1-.349-2.4-2.051-2.4a2.32,2.32,0,0,0-2.4,2.4V7.894a.589.589,0,0,1-.574.606H6.46a.59.59,0,0,1-.574-.606V3.915c0-.887-.267-2.4-1.989-2.4A2.446,2.446,0,0,0,1.415,3.071v4.8a.6.6,0,0,1-.574.606H.574A.59.59,0,0,1,0,7.872V.757A.589.589,0,0,1,.574.151H.841a.59.59,0,0,1,.574.606A4.066,4.066,0,0,1,3.9,0,3.077,3.077,0,0,1,6.665,1.427,3.659,3.659,0,0,1,9.7,0c2.133,0,3.466,1.492,3.466,3.915Z" transform="translate(1271.815 5437.694)" fill="#0066e4"/>
                                        <path id="Vector-18" data-name="Vector" d="M13.167,3.915V7.894a.6.6,0,0,1-.574.606h-.267a.6.6,0,0,1-.574-.606V3.915c0-1.1-.349-2.4-2.051-2.4a2.32,2.32,0,0,0-2.4,2.4V7.894a.6.6,0,0,1-.574.606H6.46a.59.59,0,0,1-.574-.606V3.915c0-.887-.267-2.4-1.989-2.4A2.446,2.446,0,0,0,1.415,3.071v4.8a.6.6,0,0,1-.574.606H.574A.59.59,0,0,1,0,7.872V.757A.589.589,0,0,1,.574.151H.841a.59.59,0,0,1,.574.606A4.066,4.066,0,0,1,3.9,0,3.077,3.077,0,0,1,6.665,1.427,3.659,3.659,0,0,1,9.7,0c2.133,0,3.466,1.492,3.466,3.915Z" transform="translate(1271.815 5437.694)" fill="#0066e4"/>
                                        <path id="Vector-19" data-name="Vector" d="M5.849,3.252a.681.681,0,0,1-.122.455.46.46,0,0,1-.366.2H5.135a.532.532,0,0,1-.487-.542c-.1-1.193-.7-1.865-1.688-1.865A1.857,1.857,0,0,0,1.2,3.036V7.892A.57.57,0,0,1,.714,8.5H.487A.557.557,0,0,1,0,7.892V.759A.57.57,0,0,1,.487.152H.714A.532.532,0,0,1,1.2.65,2.705,2.705,0,0,1,2.959,0C4.578,0,5.692,1.236,5.849,3.252Z" transform="translate(1295.222 5437.694)" fill="#0066e4"/>
                                        <path id="Vector-20" data-name="Vector" d="M5.849,3.252a.681.681,0,0,1-.122.455.46.46,0,0,1-.366.2H5.135a.532.532,0,0,1-.487-.542c-.1-1.193-.7-1.865-1.688-1.865A1.857,1.857,0,0,0,1.2,3.036V7.892A.57.57,0,0,1,.714,8.5H.487A.557.557,0,0,1,0,7.892V.759A.57.57,0,0,1,.487.152H.714A.532.532,0,0,1,1.2.65,2.705,2.705,0,0,1,2.959,0C4.578,0,5.692,1.236,5.849,3.252Z" transform="translate(1295.222 5437.694)" fill="#0066e4"/>
                                        <path id="Vector-21" data-name="Vector" d="M1.611,3.817H7.19A2.829,2.829,0,0,0,4.378,1.455,2.764,2.764,0,0,0,1.611,3.817Zm7.167.443a3.625,3.625,0,0,1-.023.485.641.641,0,0,1-.635.527H1.747a3.012,3.012,0,0,0,2.79,1.772h.34A3.142,3.142,0,0,0,6.714,6.18a.64.64,0,0,1,.476-.19.658.658,0,0,1,.476.211l.2.211a.569.569,0,0,1,.045.7c-.023.021-.045.063-.068.084A4.683,4.683,0,0,1,5.194,8.457a1.646,1.646,0,0,1-.272.021A4.132,4.132,0,0,1,4.4,8.5V8.479A4.408,4.408,0,0,1,0,4.239,4.29,4.29,0,0,1,4.378,0a4.328,4.328,0,0,1,4.4,4.26Z" transform="translate(1284.982 5437.694)" fill="#0066e4"/>
                                        <path id="Vector-22" data-name="Vector" d="M1.611,3.817H7.19A2.829,2.829,0,0,0,4.378,1.455,2.764,2.764,0,0,0,1.611,3.817Zm7.167.443a3.625,3.625,0,0,1-.023.485.641.641,0,0,1-.635.527H1.747a3.012,3.012,0,0,0,2.79,1.772h.34A3.142,3.142,0,0,0,6.714,6.18a.64.64,0,0,1,.476-.19.752.752,0,0,1,.476.211l.2.211a.569.569,0,0,1,.045.7c-.023.021-.045.063-.068.084A4.683,4.683,0,0,1,5.194,8.457a1.646,1.646,0,0,1-.272.021A4.132,4.132,0,0,1,4.4,8.5V8.479A4.408,4.408,0,0,1,0,4.239,4.29,4.29,0,0,1,4.378,0a4.328,4.328,0,0,1,4.4,4.26Z" transform="translate(1284.982 5437.694)" fill="#0066e4"/>
                                        <path id="Vector-23" data-name="Vector" d="M7.185,2.072a.611.611,0,0,1-.154.782l-.193.169a.51.51,0,0,1-.424.085.524.524,0,0,1-.347-.275,2.527,2.527,0,0,0-2.2-1.374A2.67,2.67,0,0,0,1.348,4.25,2.67,2.67,0,0,0,3.872,7.041,2.475,2.475,0,0,0,6.087,5.624.51.51,0,0,1,6.8,5.392l.212.127a.606.606,0,0,1,.27.359.559.559,0,0,1-.039.465A3.847,3.847,0,0,1,3.872,8.5,4.074,4.074,0,0,1,0,4.25,4.059,4.059,0,0,1,3.852,0,3.808,3.808,0,0,1,7.185,2.072Z" transform="translate(1302.537 5437.694)" fill="#0066e4"/>
                                        <path id="Vector-24" data-name="Vector" d="M7.185,2.072a.611.611,0,0,1-.154.782l-.193.169a.51.51,0,0,1-.424.085.524.524,0,0,1-.347-.275,2.527,2.527,0,0,0-2.2-1.374A2.67,2.67,0,0,0,1.348,4.25,2.67,2.67,0,0,0,3.872,7.041,2.475,2.475,0,0,0,6.087,5.624.51.51,0,0,1,6.8,5.392l.212.127a.606.606,0,0,1,.27.359.559.559,0,0,1-.039.465A3.847,3.847,0,0,1,3.872,8.5,4.074,4.074,0,0,1,0,4.25,4.059,4.059,0,0,1,3.852,0,3.808,3.808,0,0,1,7.185,2.072Z" transform="translate(1302.537 5437.694)" fill="#0066e4"/>
                                        <path id="Vector-25" data-name="Vector" d="M1.342,3.817h4.65A2.53,2.53,0,0,0,3.648,1.455,2.479,2.479,0,0,0,1.342,3.817Zm5.973.443a4.347,4.347,0,0,1-.019.485.572.572,0,0,1-.529.527H1.456A2.528,2.528,0,0,0,3.78,7.044h.284A2.462,2.462,0,0,0,5.595,6.18a.491.491,0,0,1,.4-.19.513.513,0,0,1,.4.211l.17.211a.66.66,0,0,1,.038.7c-.019.021-.038.063-.057.084A3.677,3.677,0,0,1,4.328,8.457a1.15,1.15,0,0,1-.227.021,2.874,2.874,0,0,1-.435.021V8.479A4.069,4.069,0,0,1,0,4.239,3.959,3.959,0,0,1,3.648,0,3.993,3.993,0,0,1,7.315,4.26Z" transform="translate(1311.315 5437.694)" fill="#0066e4"/>
                                        <path id="Vector-26" data-name="Vector" d="M1.342,3.817h4.65A2.53,2.53,0,0,0,3.648,1.455,2.479,2.479,0,0,0,1.342,3.817Zm5.973.443a4.347,4.347,0,0,1-.019.485.572.572,0,0,1-.529.527H1.456A2.528,2.528,0,0,0,3.78,7.044h.284A2.462,2.462,0,0,0,5.595,6.18a.491.491,0,0,1,.4-.19.513.513,0,0,1,.4.211l.17.211a.66.66,0,0,1,.038.7c-.019.021-.038.063-.057.084A3.677,3.677,0,0,1,4.328,8.457a1.15,1.15,0,0,1-.227.021,2.874,2.874,0,0,1-.435.021V8.479A4.069,4.069,0,0,1,0,4.239,3.959,3.959,0,0,1,3.648,0,3.993,3.993,0,0,1,7.315,4.26Z" transform="translate(1311.315 5437.694)" fill="#0066e4"/>
                                        <path id="Vector-27" data-name="Vector" d="M1.611,3.817H7.19A2.829,2.829,0,0,0,4.378,1.455,2.782,2.782,0,0,0,1.611,3.817Zm7.167.443a3.628,3.628,0,0,1-.023.485.641.641,0,0,1-.635.527H1.747a3.012,3.012,0,0,0,2.79,1.772h.34A3.142,3.142,0,0,0,6.714,6.18a.64.64,0,0,1,.476-.19.658.658,0,0,1,.476.211l.2.211a.569.569,0,0,1,.045.7c-.023.021-.045.063-.068.084A4.683,4.683,0,0,1,5.194,8.457a1.646,1.646,0,0,1-.272.021A4.132,4.132,0,0,1,4.4,8.5V8.479A4.408,4.408,0,0,1,0,4.239,4.29,4.29,0,0,1,4.378,0a4.328,4.328,0,0,1,4.4,4.26Z" transform="translate(1265.963 5427.069)" fill="#0066e4"/>
                                        <path id="Vector-28" data-name="Vector" d="M1.611,3.817H7.19A2.829,2.829,0,0,0,4.378,1.455,2.782,2.782,0,0,0,1.611,3.817Zm7.167.443a3.628,3.628,0,0,1-.023.485.641.641,0,0,1-.635.527H1.747a3.012,3.012,0,0,0,2.79,1.772h.34A3.142,3.142,0,0,0,6.714,6.18a.64.64,0,0,1,.476-.19.658.658,0,0,1,.476.211l.2.211a.569.569,0,0,1,.045.7c-.023.021-.045.063-.068.084A4.683,4.683,0,0,1,5.194,8.457a1.646,1.646,0,0,1-.272.021A4.132,4.132,0,0,1,4.4,8.5V8.479A4.408,4.408,0,0,1,0,4.239,4.29,4.29,0,0,1,4.378,0a4.328,4.328,0,0,1,4.4,4.26Z" transform="translate(1265.963 5427.069)" fill="#0066e4"/>
                                    </g>
                                </svg>
                            </div>
                            <div class="flex items-center gap-3 text-xs text-gray-600">
                                <p>Powered by</p>
                                {/* <svg xmlns="http://www.w3.org/2000/svg" width="58.78" height="21.387" viewBox="0 0 58.78 21.387">
                                    <g id="Grupo_56" data-name="Grupo 56" transform="translate(-1133.735 -5426.931)">
                                        <path id="Vector" d="M24.8,2.751,15.444,20.363a1.921,1.921,0,0,1-3.4,0L10,16.486,8.358,19.55a1.249,1.249,0,0,1-2.209,0l-6-11.359A1.156,1.156,0,0,1,0,7.607,1.254,1.254,0,0,1,1.251,6.357H4.669L2.793,2.814A1.913,1.913,0,0,1,4.481,0H23.156A1.88,1.88,0,0,1,24.8,2.751Zm-9.963,4.4a.814.814,0,0,0-.813-.813H5.982a.849.849,0,0,0-.375.1.821.821,0,0,0-.333,1.125l3.981,7.566a.909.909,0,0,0,.354.333.85.85,0,0,0,1.126-.333l4.023-7.607a.589.589,0,0,0,.083-.375ZM43,8.17H40.956v7a.253.253,0,0,1-.25.25H39.121a.253.253,0,0,1-.25-.25v-7H36.808a.266.266,0,0,1-.25-.229V6.711a.231.231,0,0,1,.229-.229h6.149a.25.25,0,0,1,.25.229v1.23c.063.146-.042.229-.188.229Zm6.565,7.191a15.777,15.777,0,0,1-2.418.146c-1.542,0-2.918-.4-2.918-2.584V8.941c0-2.188,1.376-2.564,2.939-2.564a19.242,19.242,0,0,1,2.418.146c.167.021.25.083.25.25V7.9a.253.253,0,0,1-.25.25H47.042c-.563,0-.771.188-.771.813v1.1h3.21a.253.253,0,0,1,.25.25v1.146a.253.253,0,0,1-.25.25h-3.21v1.271c0,.625.208.813.771.813h2.543a.253.253,0,0,1,.25.25v1.125a.312.312,0,0,1-.271.188Zm9.067.042H56.713a.311.311,0,0,1-.313-.188l-1.667-2.626-1.5,2.564c-.083.146-.167.25-.292.25H51.169c-.125,0-.188-.063-.188-.146,0-.021.021-.063.021-.083l2.605-4.335L50.981,6.711a.077.077,0,0,1-.021-.063.156.156,0,0,1,.188-.146h1.938c.125,0,.229.125.292.229L54.92,9.171,56.4,6.732c.063-.1.167-.229.292-.229h1.772a.2.2,0,0,1,.188.146c0,.021-.021.042-.021.063L56,10.859l2.73,4.314a.3.3,0,0,1,.042.125c.021.063-.042.1-.146.1ZM35.412,6.524h.042a.192.192,0,0,1,.146.229s-2.084,7.378-2.126,7.482a1.874,1.874,0,0,1-1.855,1.292,1.834,1.834,0,0,1-1.855-1.313c-.021-.083-2.147-7.482-2.147-7.482V6.69A.187.187,0,0,1,27.8,6.5h1.709a.183.183,0,0,1,.188.146l1.751,6.461c.021.146.063.188.167.188s.146-.063.167-.188l1.751-6.461a.2.2,0,0,1,.188-.146Z" transform="translate(1133.735 5426.931)" fill="#f71a63"/>
                                        <path id="Vector-2" data-name="Vector" d="M24.8,2.751,15.444,20.363a1.921,1.921,0,0,1-3.4,0L10,16.486,8.358,19.55a1.249,1.249,0,0,1-2.209,0l-6-11.359A1.156,1.156,0,0,1,0,7.607,1.254,1.254,0,0,1,1.251,6.357H4.669L2.793,2.814A1.913,1.913,0,0,1,4.481,0H23.156A1.88,1.88,0,0,1,24.8,2.751Zm-9.963,4.4a.814.814,0,0,0-.813-.813H5.982a.849.849,0,0,0-.375.1.821.821,0,0,0-.333,1.125l3.981,7.566a.909.909,0,0,0,.354.333.85.85,0,0,0,1.126-.333l4.023-7.607a.589.589,0,0,0,.083-.375Z" transform="translate(1133.735 5426.931)" fill="#f71a63"/>
                                    </g>
                                </svg> */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="49" height="20" viewBox="0 0 49 20" fill="none">
                                    <path d="M29.6499 20C27.3536 20 25.8721 19.2593 24.835 18.4444C24.6128 18.5926 24.4647 18.7407 24.1684 18.8889C22.1684 19.9259 19.9462 20 19.1313 20C15.8721 20 14.1684 18.5926 13.3536 17.4074C13.2795 17.3333 13.2054 17.1852 13.1313 17.1111C11.6499 18.8889 9.72393 20 6.83504 20C4.31652 20 2.24245 19.037 1.05726 17.3333C-0.202 15.4815 -0.350148 12.963 0.686889 10.2963C2.0943 6.74074 5.27948 4.59259 9.20541 4.59259C9.27948 4.59259 9.27948 4.59259 9.35356 4.59259C9.35356 4.51852 9.35356 4.37037 9.35356 4.2963C9.27948 3.03704 10.0943 1.92593 11.2795 1.55556L14.761 0.222222C15.1313 0.0740741 15.5017 0 15.8721 0C16.9832 0 18.0202 0.592593 18.5387 1.62963L20.0202 4.66667C20.4647 4.59259 20.9091 4.59259 21.3536 4.59259C23.5017 4.59259 25.2054 5.33333 26.3165 6.66667C28.0202 5.33333 30.1684 4.59259 32.5387 4.59259C33.798 4.59259 34.9832 4.81481 35.8721 5.25926C36.1684 5.40741 36.4647 5.55556 36.6869 5.77778C38.0202 5.03704 39.5758 4.59259 41.2795 4.59259C43.7239 4.59259 45.798 5.55556 46.9832 7.25926C48.2424 9.03704 48.4647 11.4815 47.6499 13.9259C46.3165 17.6296 42.9091 20 38.9091 20C37.2054 20 35.6499 19.5556 34.4647 18.6667C34.2425 18.8889 33.9461 19.1111 33.6499 19.1852C32.5387 19.7037 31.1313 19.9259 29.7239 20H29.6499Z" fill="#113032"/>
                                    <path d="M39.3536 15.1111C37.724 15.1111 37.5018 13.5556 37.9462 12C38.3166 10.7407 39.2796 9.48148 40.687 9.48148C42.3907 9.48148 42.5388 11.1852 42.0203 12.6667C41.724 13.9259 40.7611 15.1111 39.3536 15.1111ZM38.9092 17.4074C41.724 17.4074 44.1685 15.8518 45.2055 13.037C46.2425 10.0741 45.0573 7.18518 41.2796 7.18518C38.2425 7.18518 35.8722 9.11111 34.9833 11.6296C34.0203 14.4444 35.0573 17.4074 38.9092 17.4074ZM29.6499 17.4074C30.7611 17.4074 31.8722 17.1852 32.687 16.8148C32.9833 16.0741 32.9833 15.3333 32.761 14.5926C32.2425 14.8148 31.4277 15.037 30.687 15.037C28.5388 15.037 28.3907 13.4815 28.8351 12.1481C29.3536 10.7407 30.6129 9.55555 32.6129 9.55555C33.1314 9.55555 33.6499 9.62963 33.9462 9.85185C34.4648 9.11111 34.8351 8.37037 34.9092 7.62963C34.4648 7.40741 33.6499 7.25926 32.6129 7.25926C29.2796 7.25926 26.687 9.18518 25.7981 11.8518C24.8351 14.2963 25.5018 17.4074 29.6499 17.4074ZM18.2425 11.3333C18.8351 10.0741 19.724 9.33333 20.8351 9.33333C21.8722 9.33333 22.0203 9.92592 21.8722 10.3704C21.6499 10.963 20.8351 11.3333 18.2425 11.3333ZM19.2055 17.4074C20.3166 17.4074 21.7981 17.1852 23.0573 16.5926C23.2796 15.9259 23.2796 15.1852 22.9833 14.4444C22.1685 14.8148 21.0573 15.1111 20.0203 15.1111C18.5388 15.1111 17.724 14.5926 17.724 13.4074C21.7981 13.4815 23.9462 12.7407 24.687 10.963C25.3536 9.11111 24.1685 7.25926 21.3536 7.25926C18.3166 7.25926 16.0944 9.4074 15.2055 11.7778C14.3907 14.2222 14.9092 17.4074 19.2055 17.4074ZM6.9092 17.4074C9.72401 17.4074 11.3536 16.1481 13.2055 12.1481C14.2425 10 15.0573 7.85185 16.0944 5.7037L17.2796 6.07407C17.5759 6.14815 17.7981 6 17.6499 5.7037L16.2425 2.74074C16.0203 2.59259 15.7981 2.59259 15.6499 2.59259L12.0944 3.92592C11.7981 4 11.7981 4.29629 12.0944 4.37037L13.2055 4.81481C12.3166 6.81481 11.2796 9.77778 10.3907 11.6296C9.42772 13.7037 8.9092 15.1852 7.27957 15.1852C5.64994 15.1852 5.35364 13.9259 6.02031 12.0741C6.83512 9.92592 8.16846 9.33333 9.72401 9.77778C10.1685 9.18518 10.4648 8.29629 10.6129 7.48148C10.1685 7.33333 9.64994 7.33333 9.20549 7.33333C6.68698 7.33333 4.24253 8.59259 3.20549 11.3333C1.87216 14.6667 3.13142 17.4074 6.9092 17.4074Z" fill="#02F67C"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}