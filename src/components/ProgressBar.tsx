type Props = {
  value: number;
  max: number;
  size?: "sm" | "md";
};

const SIZE_CLASS = {
  sm: "h-1.5",
  md: "h-2",
};

// グラデーションの進捗バー（value / max の割合で伸びる）
function ProgressBar({ value, max, size = "md" }: Props) {
  const percent = max > 0 ? Math.min((value / max) * 100, 100) : 0;

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      className={`overflow-hidden rounded-full bg-zinc-800 ${SIZE_CLASS[size]}`}
    >
      <div
        className="h-full rounded-full bg-linear-to-r from-indigo-500 via-violet-500 to-sky-400 transition-[width] duration-500"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

export default ProgressBar;
