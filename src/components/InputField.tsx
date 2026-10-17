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
  name?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  // 親でフォーカス状態を管理する場合に渡す（省略時は CSS の :focus で表示）
  isFocused?: boolean;
};

function InputField({
  label,
  type = "text",
  isRequired = false,
  name,
  value,
  onChange,
  isFocused,
  ...rest
}: Props) {
  const id = useId();

  const borderClass =
    isFocused === undefined
      ? "border-zinc-700 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30"
      : isFocused
        ? "border-sky-400 ring-2 ring-sky-400/30"
        : "border-zinc-700";

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
        name={name}
        required={isRequired}
        {...rest}
        value={value}
        onChange={onChange}
        className={`rounded-lg border bg-zinc-900 px-5 py-2 text-sm text-zinc-100 transition-colors placeholder:text-zinc-500 focus:outline-none ${borderClass}`}
      />
    </div>
  );
}

export default InputField;
