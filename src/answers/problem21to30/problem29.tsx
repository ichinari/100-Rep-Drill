import { useState, type ChangeEvent } from "react";
import QuestionText from "@components/QuestionText";
import Card from "@components/Card";

const STATUS = {
  success: "成功",
  warning: "警告",
  error: "エラー",
  info: "情報",
} as const;

const SIZES = ["small", "medium", "large"] as const;

type Status = keyof typeof STATUS;
type Size = (typeof SIZES)[number];

const selectClass =
  "cursor-pointer rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 transition-colors hover:border-zinc-500 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/30";
const controlLabelClass = "flex flex-col gap-1.5 text-xs text-zinc-400";

function Problem29() {
  const [status, setStatus] = useState<Status>("info"); // success, warning, error, info
  const [isAnimated, setIsAnimated] = useState(false);
  const [size, setSize] = useState<Size>("medium"); // small, medium, large

  const getStatusIcon = () => {
    // ステータスに応じたアイコンを返す
    switch (status) {
      case "success":
        return "✓"; // チェックマーク
      case "warning":
        return "⚠"; // 警告マーク
      case "error":
        return "✕"; // バツマーク
      case "info":
        return "ℹ"; // 情報マーク
      default:
        return "?"; // 疑問符
    }
  };

  // ステータス変更
  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as Status);
  };

  // サイズ変更
  const handleSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSize(e.target.value as Size);
  };

  // アニメーションの ON / OFF
  const handleAnimationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsAnimated(e.target.checked);
  };

  const badgeClassName = [
    // 共通
    "inline-flex items-center gap-1.5 rounded-full border font-semibold transition-colors",
    // ステータス（色）
    status === "success" && "border-green-500/40 bg-green-500/15 text-green-300",
    status === "warning" && "border-amber-500/40 bg-amber-500/15 text-amber-300",
    status === "error" && "border-red-500/40 bg-red-500/15 text-red-300",
    status === "info" && "border-sky-500/40 bg-sky-500/15 text-sky-300",
    // アニメーション（点滅）
    isAnimated && "animate-pulse",
    // サイズ
    size === "small" && "px-2 py-0.5 text-xs",
    size === "medium" && "px-3 py-1 text-sm",
    size === "large" && "px-4 py-1.5 text-base",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <QuestionText>
        <ol>
          <li>ステータスに応じたバッジコンポーネント</li>
          <li>success/warning/error/info の 4 種類</li>
          <li>各ステータスで色とアイコンを変更</li>
          <li>点滅アニメーション有無の切り替え</li>
          <li>複数の条件でクラス名を組み立て</li>
        </ol>
      </QuestionText>

      <Card title="ステータスバッジ" tag="h2">
        <div className="mx-auto flex w-full max-w-lg flex-col gap-5 text-left">
          {/* 操作パネル */}
          <div className="flex flex-wrap items-end justify-center gap-4 rounded-lg border border-zinc-800 bg-zinc-950/40 px-4 py-3">
            <label className={controlLabelClass}>
              ステータス
              <select className={selectClass} onChange={handleStatusChange}>
                <option value="success">成功</option>
                <option value="warning">警告</option>
                <option value="error">エラー</option>
                <option value="info">情報</option>
              </select>
            </label>

            <label className={controlLabelClass}>
              サイズ
              <select className={selectClass} onChange={handleSizeChange}>
                <option value="small">小</option>
                <option value="medium">中</option>
                <option value="large">大</option>
              </select>
            </label>

            <label className="flex cursor-pointer items-center gap-2 pb-2 text-sm text-zinc-300">
              <input
                type="checkbox"
                className="h-4 w-4 cursor-pointer accent-violet-500"
                onChange={handleAnimationChange}
              />
              アニメーション
            </label>
          </div>

          {/* プレビュー */}
          <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-zinc-800 py-10">
            <span className="text-[10px] font-medium tracking-widest text-zinc-600 uppercase">
              Preview
            </span>
            <div className={badgeClassName}>
              <span className="mr-2">{getStatusIcon()}</span>
              <span>{status.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}

export default Problem29;
