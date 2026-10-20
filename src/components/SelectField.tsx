import {
  useId,
  type ChangeEvent,
  type ComponentProps,
  type ReactNode,
} from "react";

type Option = {
  value: string;
  label: string;
};

type Props = Omit<ComponentProps<"select">, "required" | "children"> & {
  // エラーメッセージ
  error?: ReactNode;
  // 省略時（空文字含む）はラベルを表示しない（必要なら aria-label を渡す）
  label?: string;
  options: Option[];
  isRequired?: boolean;
  name?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
};

// ラベル付きのセレクトボックス（InputField と同じ見た目・使い方）
function SelectField({
  error,
  label,
  options,
  isRequired = false,
  name,
  value,
  onChange,
  ...rest
}: Props) {
  const id = useId();

  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      {label && (
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
      )}
      <select
        id={id}
        name={name}
        required={isRequired}
        {...rest}
        value={value}
        onChange={onChange}
        className="w-full cursor-pointer rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 transition-colors hover:border-zinc-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 focus:outline-none disabled:cursor-not-allowed disabled:opacity-40"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

export default SelectField;
