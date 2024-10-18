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

      const name =
        (e.currentTarget.elements.namedItem("name") as RadioNodeList)?.value;

      const res = await invoke.vtex.actions.masterdata.createDocument({ data: { email, name }, acronym: "NL" });

      response.value = res;
    } finally {
      loading.value = false;
    }
  };

  return (
    <form
      class="form-control flex items-center flex-col justify-center lg:flex-row lg:gap-4 px-7 sm:px-10 py-7 bg-brand rounded-3xl"
      onSubmit={handleSubmit}
    >
      {
        response.value !== null ? (
          <div class="text-white">Incrição concluída com sucesso!</div>
        ) : (
          <>
            <p class="text-center sm:py-4 sm:px-2 text-lg text-white lg:text-lg lg:mb-0 lg:text-start lg:w-[380px]">{content?.description || ""}</p>
            <input
              name="name"
              class="outline-0 placeholder:text-slate-50 lg:flex-none input min-w-[250px] w-2/3 lg:w-[240px] input-bordered rounded-3xl placeholder-center text-center border-1 border-solid border-white mt-4 lg:mt-0 text-sm bg-transparent text-white"
              placeholder={"SEU NOME"}
            />
            <input
              name="email"
              class="outline-0 placeholder:text-slate-50 lg:flex-1 input min-w-[250px] w-2/3 lg:w-fit input-bordered rounded-3xl placeholder-center text-center mt-4 lg:mt-0 border-1 border-solid border-white text-sm bg-transparent text-white"
              placeholder={"SEU EMAIL"}
            />
            <button
              type="submit"
              class="btn disabled:loading w-[120px] lg:w-28 mt-4 lg:mt-0 rounded-3xl bg-white"
              disabled={loading}
            >ASSINAR!</button>
          </>
        )
      }
    </form>
  );
}

export default Newsletter;
