import { useId } from '../../sdk/useId.ts'

/**
 * @titleBy matcher
 */
interface SEO {
    /**
     * @description Coloque a URL do departamento ex: /feminino, /feminino/inverno
     */
    matcher: string
    /**
     * @title Texto
     */
    /**
     * @format html
     */
    text: string
}

interface Props {
    section: SEO[]
}

export default function (props: ReturnType<typeof loader>) {
    if (!props || !Object.keys(props).length) return null

    const id = useId()

    const { text } = props

    return (
        <div class="container flex flex-row gap-x-8">
            <div class="hidden sm:block w-min min-w-[300px]"></div>
            <div
                id='seo'
                class='flex flex-col lg:flex-row gap-x-10 gap-y-6 max-w-[96px] w-[95%] mx-auto mb-6 lg:mb-10'
            >
                <input type='checkbox' id={id} class='hidden peer' />

                <div class='flex flex-col gap-3 flex-1 group'>
                    <div
                        dangerouslySetInnerHTML={{ __html: text }}
                        class='prose-like max-h-[96px] overflow-hidden peer-checked:group-[]:max-h-none'
                    />

                    <label
                        for={id}
                        class='text-[#BC81FF] text-sm font-normal text-center underline underline-offset-2 cursor-pointer'
                    >
                        <span class='block peer-checked:group-[]:hidden text-center'>Ver mais</span>
                        <span class='hidden peer-checked:group-[]:block text-center'>Ver menos</span>
                    </label>
                </div>
            </div>
        </div>
    )
}

export const loader = ({ section: s }: Props, req: Request) => {
    return (s ?? []).find(({ matcher }) => new URLPattern({ pathname: matcher }).test(req.url))
}
