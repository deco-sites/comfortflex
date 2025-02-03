import { useId } from "../../sdk/useId.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

interface Props {
  /**
   * @title Insira o titulo para a pitch bar
   */
  title: string;
  /**
   * @title Insira a validade da promoção
   */
  text: string;
  /**
   * @title Insira o link do botão
   */
  link: string;
}

export default function ({ title, text, link }: Props) {
  const id = useId();

  return (
    <div id={id} class="bg-black fixed w-full z-50">
      <div class="pitchbar mx-auto flex items-center justify-between text-xs font-semibold">
        <p class="pitchbar__item pitchbar__text text-left uppercase text-white">
          {title ? title : "Ofertas Black Friday até 50% de desconto"}
          <span class="block text-xs text-white normal-case">
            {text ? text : "Ofertas validas até XX/XX/XXXX"}
          </span>
        </p>
        <a
          class="pitchbar__btn w-[127px] h-8 bg-white text-xs font-semibold flex justify-center items-center"
          href={link}
        >
          VER OFERTAS
        </a>
      </div>
    </div>
  );
}
