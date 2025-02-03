import type { ImageWidget } from "apps/admin/widgets.ts";
import PreactMarkdown from "preact-markdown";

interface Props {
  title: string;
  content: Content[];
}

interface Content {
  /** @format textarea */
  text?: string;
  image?: ImageWidget;
}

export default function Institucional({
  title = "Modelo Institucional",
  content = [
    { text: "Lorem ipsum dolor sit amet" },
  ],
}: Props) {
  return (
    <div className="sm:flex container py-6 sm:py-12 sm:gap-8 lg:gap-12">
      {
        /* <div class="collapse collapse-arrow sm:hidden mb-3" >
        <input type="checkbox" class="min-h-[0]" />
        <div class="collapse-title min-h-[0] !p-0 flex gap-2">
          <h2 className="text-base sm:text-xl text-black uppercase py-2">Navegue pelas institucionais</h2>
        </div>
        <div class="collapse-content p-0">
          <ul class="flex flex-col gap-1 pt-2">
            <li className="flex justify-start sm:justify-center sm:border sm:border-solid transition duration-300 ease-out hover:ease-in rounded-none hover:bg-black hover:text-white border-black mb-2 sm:mb-4">
              <a className="text-base py-2 uppercase" href="/quem-somos">Quem Somos</a>
            </li>
            <li className="flex justify-start sm:justify-center sm:border sm:border-solid transition duration-300 ease-out hover:ease-in rounded-none hover:bg-black hover:text-white border-black mb-2 sm:mb-4">
              <a className="text-base py-2 uppercase" href="/quero-revender">Quero Revender</a>
            </li>
            <li className="flex justify-start sm:justify-center sm:border sm:border-solid transition duration-300 ease-out hover:ease-in rounded-none hover:bg-black hover:text-white border-black mb-2 sm:mb-4">
              <a className="text-base py-2 uppercase" href="/nossas-lojas">Onde Encontrar</a>
            </li>
            <li className="flex justify-start sm:justify-center sm:border sm:border-solid transition duration-300 ease-out hover:ease-in rounded-none hover:bg-black hover:text-white border-black mb-2 sm:mb-4">
              <a className="text-base py-2 uppercase" href="/devolucao">Devolução</a>
            </li>
            <li className="flex justify-start sm:justify-center sm:border sm:border-solid transition duration-300 ease-out hover:ease-in rounded-none hover:bg-black hover:text-white border-black mb-2 sm:mb-4">
              <a className="text-base py-2 uppercase" href="/politica-de-privacidade">Politica de Privacidade</a>
            </li>
          </ul>
        </div>
      </div> */
      }
      {
        /* <aside className="sm:w-1/4 hidden sm:block">
        <ul>
            <li className="flex justify-start sm:justify-center sm:border sm:border-solid transition duration-300 ease-out hover:ease-in rounded-none hover:bg-black hover:text-white border-black mb-2 sm:mb-4">
              <a className="text-base py-2 uppercase" href="/quem-somos">Quem Somos</a>
            </li>
            <li className="flex justify-start sm:justify-center sm:border sm:border-solid transition duration-300 ease-out hover:ease-in rounded-none hover:bg-black hover:text-white border-black mb-2 sm:mb-4">
              <a className="text-base py-2 uppercase" href="/quero-revender">Quero Revender</a>
            </li>
            <li className="flex justify-start sm:justify-center sm:border sm:border-solid transition duration-300 ease-out hover:ease-in rounded-none hover:bg-black hover:text-white border-black mb-2 sm:mb-4">
              <a className="text-base py-2 uppercase" href="/nossas-lojas">Onde Encontrar</a>
            </li>
            <li className="flex justify-start sm:justify-center sm:border sm:border-solid transition duration-300 ease-out hover:ease-in rounded-none hover:bg-black hover:text-white border-black mb-2 sm:mb-4">
              <a className="text-base py-2 uppercase" href="/devolucao">Devolução</a>
            </li>
            <li className="flex justify-start sm:justify-center sm:border sm:border-solid transition duration-300 ease-out hover:ease-in rounded-none hover:bg-black hover:text-white border-black mb-2 sm:mb-4">
              <a className="text-base py-2 uppercase" href="/politica-de-privacidade">Politica de Privacidade</a>
            </li>
        </ul>
      </aside> */
      }
      <div className="w-full flex flex-col mt-2 gap-x-2">
        <h1 className="text-base text-left sm:text-xl text-black uppercase">
          {title}
        </h1>
        {content.map((item) => {
          return (
            <>
              <div class="markdown-body">
                <PreactMarkdown>
                  {item.text}
                </PreactMarkdown>
              </div>
              {item.image && <img src={item.image} />}
            </>
          );
        })}
      </div>
    </div>
  );
}
