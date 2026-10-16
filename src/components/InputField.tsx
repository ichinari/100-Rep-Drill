import { useId, type ChangeEvent, type ComponentProps } from "react";

type InputType =
  | "button"
  | "checkbox"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "radio"
  | "range"
  | "reset"
  | "search"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week";

type Props = Omit<ComponentProps<"input">, "type" | "required"> & {
  label: string;
  type?: InputType;
  placeholder?: string;
  isRequired?: boolean;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

function InputField({
  label,
  type = "text",
  isRequired = false,
  value,
  onChange,
  ...rest
}: Props) {
  const id = useId();

  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      <label
        htmlFor={id}
        className="flex items-center gap-2 text-sm font-medium text-zinc-300"
      >
        {label}
        {isRequired && (
          <span className="rounded bg-red-600 px-1.5 py-0.5 text-[10px] leading-none font-semibold text-white">
            必須
          </span>
        )}
      </label>
      <input
        id={id}
        type={type}
        required={isRequired}
        {...rest}
        value={value}
        onChange={onChange}
        className="rounded-lg border border-zinc-700 bg-zinc-900 px-5 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
      />
    </div>
  );
}

export default InputField;
