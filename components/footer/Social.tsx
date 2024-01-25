import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";

type Socials = "Discord" | "Pinterest" | "Youtube" | "Spotify" | "Facebook" | "Instagram" | "Linkedin" | "Tiktok" | "Twitter";

export interface SocialItem {
  label: Socials;
  link: string;
}

export const Instagram = () => (
  <svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25">
    <g id="_05.instagram" data-name="05.instagram">
      <circle id="Elipse_180" data-name="Elipse 180" cx="1.998" cy="1.998" r="1.998" transform="translate(10.502 10.502)"/>
      <path id="Caminho_53" data-name="Caminho 53" d="M53.246,45.65H48.135a2.5,2.5,0,0,0-2.5,2.5v5.109a2.5,2.5,0,0,0,2.5,2.5h5.111a2.5,2.5,0,0,0,2.5-2.5V48.144A2.5,2.5,0,0,0,53.246,45.65Zm-2.555,8.32A3.271,3.271,0,1,1,53.96,50.7a3.271,3.271,0,0,1-3.269,3.27Zm3.289-5.733a.809.809,0,1,1,.807-.807A.809.809,0,0,1,53.98,48.237Z" transform="translate(-38.191 -38.199)"/>
      <path id="Caminho_54" data-name="Caminho 54" d="M12.5,0A12.5,12.5,0,1,0,25,12.5,12.5,12.5,0,0,0,12.5,0Zm6.25,15.026a3.727,3.727,0,0,1-3.724,3.724H9.974A3.729,3.729,0,0,1,6.25,15.026V9.974A3.729,3.729,0,0,1,9.974,6.25h5.053A3.729,3.729,0,0,1,18.75,9.974Z"/>
    </g>
  </svg>
);
export const Tiktok = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25">
    <path id="tiktok_1_" data-name="tiktok (1)" d="M12.5,0A12.5,12.5,0,1,0,25,12.5,12.5,12.5,0,0,0,12.5,0Zm6.271,9.564v1.693a5.906,5.906,0,0,1-3.614-1.228l.012,5.21a4.364,4.364,0,0,1-1.309,3.106,4.455,4.455,0,0,1-2.489,1.245,4.588,4.588,0,0,1-.672.049,4.47,4.47,0,0,1-2.74-.926,4.545,4.545,0,0,1-.421-.368,4.38,4.38,0,0,1-.2-6.04A4.469,4.469,0,0,1,10.7,10.8a4.587,4.587,0,0,1,.672.05v2.367a2.107,2.107,0,1,0,1.449,2l0-3.489V5.362h2.331a3.608,3.608,0,0,0,3.61,3.574h.007v.628Z"/>
  </svg>
);
export const Facebook = () => (
  <svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25">
    <g id="_01.facebook" data-name="01.facebook">
      <path id="Caminho_49" data-name="Caminho 49" d="M12.5,0A12.5,12.5,0,1,0,25,12.5,12.5,12.5,0,0,0,12.5,0Zm3.168,11.316-.207,1.742a.329.329,0,0,1-.329.293H13.322v5.164a.234.234,0,0,1-.23.235H11.25a.234.234,0,0,1-.23-.237l.01-5.163H9.66a.329.329,0,0,1-.329-.329v-1.74a.329.329,0,0,1,.329-.329h1.36V9.265A2.716,2.716,0,0,1,13.882,6.25h1.393a.329.329,0,0,1,.329.329V8.044a.329.329,0,0,1-.329.329h-.854c-.924.015-1.1.457-1.1,1.118v1.456h2.026a.329.329,0,0,1,.319.368Z"/>
    </g>
  </svg>
);
export const Pinterest = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25">
    <g id="pinterest_2_" data-name="pinterest (2)" transform="translate(0.08 0.404)">
      <circle id="Elipse_181" data-name="Elipse 181" cx="12.5" cy="12.5" r="12.5" transform="translate(-0.08 -0.404)"/>
      <g id="Grupo_118" data-name="Grupo 118" transform="translate(6.897 5.809)">
        <path id="Caminho_55" data-name="Caminho 55" d="M35.6,35.131a3.956,3.956,0,0,1-1.95-.928c-.381,2-.847,3.918-2.227,4.919-.426-3.023.625-5.294,1.114-7.7-.833-1.4.1-4.222,1.856-3.527,2.161.855-1.871,5.211.836,5.755,2.826.568,3.98-4.9,2.227-6.683-2.532-2.57-7.371-.058-6.776,3.62.145.9,1.074,1.172.371,2.413-1.621-.359-2.1-1.637-2.042-3.341a5.454,5.454,0,0,1,4.92-5.013c3.052-.342,5.917,1.121,6.312,3.992.445,3.24-1.378,6.749-4.641,6.5Z" transform="translate(-29 -24.593)" fill="#f3f3f3"/>
      </g>
    </g>
  </svg>
);
export const Youtube = () => (
  <svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25">
    <g id="_04.youtube" data-name="04.youtube">
      <path id="Caminho_51" data-name="Caminho 51" d="M66.91,61.44l3.944,2.422L66.91,66.286Z" transform="translate(-55.928 -51.362)"/>
      <path id="Caminho_52" data-name="Caminho 52" d="M12.5,0A12.5,12.5,0,1,0,25,12.5,12.5,12.5,0,0,0,12.5,0Zm5.957,15.508a2.224,2.224,0,0,1-1.839,1.342,38.951,38.951,0,0,1-8.237,0,2.224,2.224,0,0,1-1.839-1.342,15.615,15.615,0,0,1,0-6.015A2.21,2.21,0,0,1,8.388,8.151a38.951,38.951,0,0,1,8.237,0,2.221,2.221,0,0,1,1.839,1.342,15.615,15.615,0,0,1-.007,6.015Z"/>
    </g>
  </svg>
);
export const Twitter = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25">
    <g id="Grupo_119" data-name="Grupo 119" transform="translate(-0.228 0.404)">
      <circle id="Elipse_182" data-name="Elipse 182" cx="12.5" cy="12.5" r="12.5" transform="translate(0.228 -0.404)"/>
      <path id="twitter_1_" data-name="twitter (1)" d="M19.435,4.545,23.345,0h-.926L19.024,3.946,16.312,0H13.185l4.1,5.967-4.1,4.766h.927L17.7,6.566l2.863,4.167h3.127L19.435,4.545ZM18.166,6.02l-.415-.594L14.445.7h1.423l2.668,3.816.415.594,3.467,4.96H21L18.166,6.02Z" transform="translate(-5.818 6.77)" fill="#f3f3f3"/>
    </g>
  </svg>
);
export const Spotify = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25">
    <g id="Grupo_120" data-name="Grupo 120" transform="translate(-761.571 -5208)">
      <circle id="Elipse_183" data-name="Elipse 183" cx="12.5" cy="12.5" r="12.5" transform="translate(761.571 5208)"/>
      <g id="Layer_2" data-name="Layer 2" transform="translate(767.071 5213.5)">
        <g id="_62.spotify" data-name="62.spotify" transform="translate(0 0)">
          <circle id="background" cx="7" cy="7" r="7" fill="#f3f3f3"/>
          <g id="icon" transform="translate(3.219 4.412)">
            <path id="Caminho_56" data-name="Caminho 56" d="M50.755,104.228a.384.384,0,0,1-.525.138,5.7,5.7,0,0,0-2.975-.663,7.388,7.388,0,0,0-1.543.2.384.384,0,0,1-.2-.737,8,8,0,0,1,1.7-.233,7.544,7.544,0,0,1,1.64.119,5.537,5.537,0,0,1,1.769.646.383.383,0,0,1,.136.528Z" transform="translate(-44.342 -99.242)"/>
            <path id="Caminho_57" data-name="Caminho 57" d="M47.388,81.155a.454.454,0,0,1-.393.226.448.448,0,0,1-.229-.063,6.689,6.689,0,0,0-3.524-.781,8.721,8.721,0,0,0-1.828.241.455.455,0,0,1-.241-.877,9.427,9.427,0,0,1,2.016-.273,8.8,8.8,0,0,1,1.943.141,6.547,6.547,0,0,1,2.094.765A.455.455,0,0,1,47.388,81.155Z" transform="translate(-40.261 -77.651)"/>
            <path id="Caminho_58" data-name="Caminho 58" d="M40.845,54.777a.557.557,0,0,1-.763.2c-2.841-1.66-6.527-.673-6.561-.663a.558.558,0,1,1-.295-1.076,11.581,11.581,0,0,1,2.466-.332,10.922,10.922,0,0,1,2.382.173,8.047,8.047,0,0,1,2.568.933.558.558,0,0,1,.2.766Z" transform="translate(-32.794 -52.897)"/>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

function LocalIcons(social: Socials) {
  switch (social) {
    case "Instagram": {
      return <Instagram />;
    }
    case "Tiktok": {
      return <Tiktok />;
    }
    case "Facebook": {
      return <Facebook />;
    }
    case "Pinterest": {
      return <Pinterest />;
    }
    case "Youtube": {
      return <Youtube />;
    }
    case "Twitter": {
      return <Twitter />;
    }
    case "Spotify": {
      return <Spotify />;
    }
    default:
      return null;
  }
}

export default function Social(
  { content, vertical = false }: {
    content?: { title?: string; items?: SocialItem[] };
    vertical?: boolean;
  },
) {
  return (
    <div class="bg-gray-200 py-3">
      {content && content.items && content.items.length > 0 && (
        <div class="flex flex-col gap-4 ">
          <ul
            class={`flex gap-4 ${
              vertical ? "lg:flex-col lg:items-start" : "flex-wrap items-center justify-center"
            }`}
          >
            {content.items.map((item) => {
              const LocalIcon = LocalIcons(item.label);
              return (
                <li>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.label} Logo`}
                    class="flex gap-2 items-center"
                  >
                    <span class="block p-1 border rounded-full">
                      {LocalIcon ? LocalIcon : <Icon size={25} id={item.label} />}
                    </span>
                    {vertical && (
                      <div class="text-sm hidden lg:block">{item.label}</div>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
