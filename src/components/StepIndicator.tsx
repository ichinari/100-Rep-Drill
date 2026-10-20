type Props = {
  steps: string[];
  // 今のステップ（1 始まり）
  currentStep: number;
};

// 番号の丸とステップ名を並べた表示（完了したステップは ✓）
function StepIndicator({ steps, currentStep }: Props) {
  return (
    <ol className="flex justify-between">
      {steps.map((label, index) => {
        const step = index + 1;
        const isActive = step === currentStep;
        const isDone = step < currentStep;

        return (
          <li
            key={label}
            aria-current={isActive ? "step" : undefined}
            className="flex flex-1 flex-col items-center gap-1.5"
          >
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                isActive
                  ? "bg-violet-600 text-white ring-4 ring-violet-500/20"
                  : isDone
                    ? "bg-violet-500/20 text-violet-300"
                    : "bg-zinc-800 text-zinc-500"
              }`}
            >
              {isDone ? "✓" : step}
            </span>
            <span
              className={`text-xs ${
                isActive ? "font-medium text-zinc-100" : "text-zinc-500"
              }`}
            >
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export default StepIndicator;
