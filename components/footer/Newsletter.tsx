import { useSignal } from "@preact/signals";
import { invoke } from "$store/runtime.ts";
import type { JSX } from "preact";

export interface Form {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Props {
  content: {
    /** @format textarea */
    description?: string;
    form?: Form;
  };
  layout?: {
    tiled?: boolean;
  };
}

function Newsletter(
  { content, layout = {} }: Props,
) {
  const { tiled = false } = layout;
  const loading = useSignal(false);
  const response = useSignal<unknown>(null);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;

      const name = (e.currentTarget.elements.namedItem("name") as RadioNodeList)
        ?.value;

      const res = await invoke.vtex.actions.masterdata.createDocument({
        data: { email, name },
        acronym: "NL",
      });

      response.value = res;
    } finally {
      loading.value = false;
    }
  };

  return (
    <form
      class="form-control flex items-start flex-col justify-center lg:flex-row lg:gap-4 px-7 sm:px-10 py-7 bg-brand rounded-3xl"
      onSubmit={handleSubmit}
    >
      {response.value !== null
        ? <div class="text-white">Inscrição concluída com sucesso!</div>
        : (
          <>
            <p class="text-start text-lg text-white lg:text-lg lg:mb-0 lg:w-[380px]">
              {content?.description || ""}
            </p>
            <div className="flex flex-wrap lg:w-fit w-newsletter-inputs">
              <div className="flex w-full flex-col justify-center lg:flex-row lg:gap-4">
                <input
                  name="name"
                  class="outline-0 placeholder:text-slate-50 lg:flex-1 input min-w-[250px] w-full lg:w-[240px] input-bordered rounded-3xl placeholder-center text-start border-1 border-solid border-white mt-4 lg:mt-0 text-sm bg-transparent text-white"
                  placeholder={"SEU NOME"}
                />
                <input
                  name="email"
                  class="outline-0 placeholder:text-slate-50 lg:flex-1 input min-w-[250px] w-full lg:w-fit input-bordered rounded-3xl placeholder-center text-start mt-4 lg:mt-0 border-1 border-solid border-white text-sm bg-transparent text-white"
                  placeholder={"SEU EMAIL"}
                />
                <button
                  type="submit"
                  class="btn disabled:loading w-full lg:w-28 mt-4 lg:mt-0 rounded-3xl bg-white border border-transparent hover:border-black"
                  disabled={loading}
                >
                  ASSINAR!
                </button>
              </div>
              <span class="mt-2 text-white w-full text-sm">
                Ao clicar em ASSINAR, você concorda com os{" "}
                <a
                  href="/politicas-de-privacidade"
                  class="font-bold text-white underline"
                >
                  Termos de Privacidade
                </a>{" "}
                e autoriza o uso dos seus dados.
              </span>
            </div>
          </>
        )}
    </form>
  );
}

export default Newsletter;
