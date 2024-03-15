interface Props {
  variant?: "active" | "disabled" | "default" | "disabled-active" | "default-active";
  content: string;
}

const variants = {
  active: "border border-brand bg-brand text-white rounded-full",
  disabled:
    `border rounded-full border-gray-300 text-brand hover:border-brand relative after:absolute after:left-0 after:top-1/2 after:h-[1px] after:bg-gray-400/65 after:w-full after:block after:-rotate-45 after:content-[""]`,
  default: "border border-gray-300 text-brand hover:border-brand rounded-full",
  "disabled-active": `border border-brand bg-brand text-white rounded-full relative after:absolute after:left-0 after:top-1/2 after:h-[1px] after:bg-white after:w-full after:block after:-rotate-45 after:content-[""]`,
  "default-active": "border border-brand bg-brand text-white rounded-full",
};

function Avatar({ content, variant = "default" }: Props) {
  return (
    <div class="avatar placeholder text-xs">
      <div
        class={`w-11 h-11 ${variants[variant]
          }`}
      >
        <span class="uppercase">
          {content.substring(0, 2)}
        </span>
      </div>
    </div>
  );
}

export default Avatar;
