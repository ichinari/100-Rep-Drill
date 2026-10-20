import { useEffect, useRef, useState } from "react";
import QuestionText from "@components/QuestionText";
import Card from "@components/Card";

// 表示モードとボタンの表示名
const VIEW_MODES = {
  card: "カード",
  list: "リスト",
  grid: "グリッド",
} as const;

type ViewMode = keyof typeof VIEW_MODES; // "card" | "list" | "grid"
type Status = "idle" | "loading" | "error";

// 擬似的な読み込み時間（ms）
const LOADING_DELAY = 800;

const itemTitleClass = "text-sm font-semibold text-zinc-100";
const itemDescriptionClass = "text-xs text-zinc-400";
// 表示時のフェードイン（Tailwind v4 の starting: バリアント）
const fadeInClass =
  "transition duration-300 ease-out starting:translate-y-1 starting:opacity-0";

function Problem30() {
  const [viewMode, setViewMode] = useState<ViewMode>("card");
  const [status, setStatus] = useState<Status>("idle");
  const [shouldFail, setShouldFail] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // アンマウント時にタイマーを破棄
  useEffect(() => () => clearTimeout(timerRef.current), []);

  // 擬似ロード（連打時は前のタイマーを破棄）
  const load = () => {
    clearTimeout(timerRef.current);
    setStatus("loading");
    timerRef.current = setTimeout(() => {
      setStatus(shouldFail ? "error" : "idle");
    }, LOADING_DELAY);
  };

  const handleModeChange = (mode: ViewMode) => {
    if (mode === viewMode && status === "idle") return;
    setViewMode(mode);
    load();
  };

  const items = [
    { id: 1, title: "アイテム1", description: "説明1" },
    { id: 2, title: "アイテム2", description: "説明2" },
    { id: 3, title: "アイテム3", description: "説明3" },
  ];

  const renderContent = () => {
    // ローディング表示
    if (status === "loading") {
      return (
        <div
          role="status"
          className={`flex flex-col items-center gap-4 rounded-lg border border-zinc-800 bg-zinc-950/40 px-4 py-8 ${fadeInClass}`}
        >
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-700 border-t-violet-500" />
          <span className="text-xs text-zinc-400">
            {VIEW_MODES[viewMode]}表示を読み込み中…
          </span>
          <div className="flex w-full flex-col gap-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="h-8 animate-pulse rounded-md bg-zinc-800/60"
              />
            ))}
          </div>
        </div>
      );
    }

    // エラー表示
    if (status === "error") {
      return (
        <div
          role="alert"
          className={`flex flex-col items-center gap-3 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-8 text-center ${fadeInClass}`}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/20 text-lg font-bold text-red-300">
            ✕
          </span>
          <p className="text-sm font-semibold text-red-300">
            読み込みに失敗しました
          </p>
          <p className="text-xs text-zinc-400">
            {VIEW_MODES[viewMode]}表示のデータを取得できませんでした。
          </p>
          <button
            type="button"
            className="mt-1 cursor-pointer rounded-md border border-red-500/40 px-4 py-1.5 text-xs font-medium text-red-300 transition-colors hover:bg-red-500/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
            onClick={load}
          >
            再試行
          </button>
        </div>
      );
    }

    // 各モードの表示を条件分岐
    switch (viewMode) {
      case "card":
        return (
          <div className={`flex flex-col gap-3 ${fadeInClass}`}>
            {items.map((item) => (
              <div
                key={item.id}
                className="rounded-lg border border-zinc-800 bg-zinc-950/40 px-4 py-3 shadow-sm shadow-black/20 transition-colors hover:border-zinc-600"
              >
                <h3 className={itemTitleClass}>{item.title}</h3>
                <p className={`mt-1 ${itemDescriptionClass}`}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        );
      case "list":
        return (
          <ul
            className={`divide-y divide-zinc-800 rounded-lg border border-zinc-800 ${fadeInClass}`}
          >
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-4 px-4 py-2.5 transition-colors hover:bg-zinc-800/40"
              >
                <h3 className={itemTitleClass}>{item.title}</h3>
                <p className={itemDescriptionClass}>{item.description}</p>
              </li>
            ))}
          </ul>
        );
      case "grid":
        return (
          <div
            className={`grid grid-cols-2 gap-3 sm:grid-cols-3 ${fadeInClass}`}
          >
            {items.map((item) => (
              <div
                key={item.id}
                className="flex aspect-square flex-col items-center justify-center gap-1 rounded-lg border border-zinc-800 bg-zinc-950/40 transition-colors hover:border-zinc-600"
              >
                <h3 className={itemTitleClass}>{item.title}</h3>
                <p className={itemDescriptionClass}>{item.description}</p>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <QuestionText>
        <ol>
          <li>選択された表示モード（card/list/grid）でレイアウト変更</li>
          <li>同じデータを異なる形式で表示</li>
          <li>各モードで異なるコンポーネントを使用</li>
        </ol>
      </QuestionText>

      <Card title="表示モード切り替え" tag="h2">
        <div className="mx-auto flex w-full max-w-lg flex-col gap-5 text-left">
          {/* モード切り替え（セグメントボタン） */}
          <div className="mx-auto inline-flex rounded-lg border border-zinc-800 bg-zinc-950/40 p-1">
            {(Object.keys(VIEW_MODES) as ViewMode[]).map((mode) => (
              <button
                key={mode}
                type="button"
                aria-pressed={viewMode === mode}
                className={`cursor-pointer rounded-md px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 ${
                  viewMode === mode
                    ? "bg-violet-600 text-white shadow-sm"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
                }`}
                onClick={() => handleModeChange(mode)}
              >
                {VIEW_MODES[mode]}
              </button>
            ))}
          </div>

          {/* エラー発生のシミュレーション */}
          <label className="mx-auto flex cursor-pointer items-center gap-2 text-xs text-zinc-400">
            <input
              type="checkbox"
              className="h-4 w-4 cursor-pointer accent-red-500"
              checked={shouldFail}
              onChange={(e) => setShouldFail(e.target.checked)}
            />
            切り替え時にエラーを発生させる
          </label>

          {/* 表示エリア */}
          <div aria-busy={status === "loading"}>{renderContent()}</div>
        </div>
      </Card>
    </>
  );
}

export default Problem30;
