import {
  useId,
  useState,
  type ChangeEvent,
  type ComponentProps,
  type ReactNode,
} from "react";

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
  // テキスト入力: エラーメッセージ / チェックボックス: 規約などの本文
  children?: ReactNode;
  // エラーメッセージ（チェックボックスではこちらを使う）
  error?: ReactNode;
  // 省略時（空文字含む）はラベルを表示しない（必要なら aria-label を渡す）
  label?: string;
  type?: InputType;
  placeholder?: string;
  isRequired?: boolean;
  name?: string;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  // 親でフォーカス状態を管理する場合に渡す（省略時は CSS の :focus で表示）
  isFocused?: boolean;
  // 外枠の幅などを指定する（省略時は w-full max-w-sm）
  className?: string;
};

function InputField({
  children,
  error,
  label,
  type = "text",
  isRequired = false,
  name,
  value,
  onChange,
  isFocused,
  className = "w-full max-w-sm",
  ...rest
}: Props) {
  const id = useId();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && isPasswordVisible ? "text" : type;

  const borderClass =
    isFocused === undefined
      ? "border-zinc-700 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30"
      : isFocused
        ? "border-sky-400 ring-2 ring-sky-400/30"
        : "border-zinc-700";

  const requiredBadge = isRequired && (
    <span className="rounded bg-red-600 px-1.5 py-0.5 text-[10px] leading-none font-semibold text-white">
      必須
    </span>
  );

  const renderError = (message: ReactNode) =>
    message && <p className="text-xs text-red-400">{message}</p>;

  // スライダー（価格の上限など）はラベルの下にトラックだけを表示する
  if (type === "range") {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        {label && (
          <label
            htmlFor={id}
            className="flex items-center gap-2 text-sm font-medium text-zinc-300 tabular-nums"
          >
            {label}
            {requiredBadge}
          </label>
        )}
        <input
          id={id}
          type="range"
          name={name}
          required={isRequired}
          {...rest}
          value={value}
          onChange={onChange}
          className="h-2 w-full cursor-pointer accent-violet-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-500"
        />
        {renderError(error ?? children)}
      </div>
    );
  }

  // チェックボックス（利用規約の同意など）は本文と同意欄を一体の枠で表示する
  if (type === "checkbox") {
    return (
      <div className={`flex flex-col gap-1.5 ${className}`}>
        <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/60 text-left">
          {children && (
            <div className="max-h-32 overflow-y-auto border-b border-zinc-800 p-4 text-xs leading-relaxed text-zinc-400">
              {children}
            </div>
          )}
          <label
            htmlFor={id}
            className="flex cursor-pointer items-center gap-2.5 px-4 py-3 text-sm text-zinc-300 transition-colors hover:bg-zinc-800/40"
          >
            <input
              id={id}
              type="checkbox"
              name={name}
              required={isRequired}
              {...rest}
              onChange={onChange}
              className="h-4 w-4 shrink-0 cursor-pointer accent-violet-500"
            />
            {label && (
              <span className="flex flex-1 items-center gap-2">
                {label}
                {requiredBadge}
              </span>
            )}
          </label>
        </div>
        {renderError(error)}
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="flex items-center gap-2 text-sm font-medium text-zinc-300"
        >
          {label}
          {requiredBadge}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          type={inputType}
          name={name}
          required={isRequired}
          {...rest}
          value={value}
          onChange={onChange}
          className={`w-full rounded-lg border bg-zinc-900 px-5 py-2 text-sm text-zinc-100 transition-colors placeholder:text-zinc-500 focus:outline-none ${
            isPassword ? "pr-11" : ""
          } ${borderClass}`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setIsPasswordVisible((prev) => !prev)}
            aria-label={
              isPasswordVisible ? "パスワードを隠す" : "パスワードを表示"
            }
            aria-pressed={isPasswordVisible}
            className="absolute inset-y-0 right-0 flex w-10 cursor-pointer items-center justify-center rounded-r-lg text-zinc-500 transition-colors hover:text-zinc-200 focus-visible:text-zinc-200 focus-visible:outline-none"
          >
            {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>
      {renderError(error ?? children)}
    </div>
  );
}

const iconProps = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

// 目のアイコン（非表示中に表示し、押すとパスワードを表示する）
function EyeIcon() {
  return (
    <svg {...iconProps}>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

// 斜線入りの目のアイコン（表示中に表示し、押すとパスワードを隠す）
function EyeOffIcon() {
  return (
    <svg {...iconProps}>
      <path d="M10.7 5.1A10.9 10.9 0 0 1 12 5c6.5 0 10 7 10 7a17.6 17.6 0 0 1-2.2 3.2" />
      <path d="M6.6 6.6C3.9 8.4 2 12 2 12s3.5 7 10 7a10.4 10.4 0 0 0 5.4-1.6" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
      <path d="m2 2 20 20" />
    </svg>
  );
}

export default InputField;
