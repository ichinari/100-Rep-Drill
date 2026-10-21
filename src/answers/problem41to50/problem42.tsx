import QuestionText from "@components/QuestionText";
import Card from "@components/Card";
import { useEffect, useState } from "react";

const statLabelClass =
  "text-[10px] font-medium tracking-widest text-zinc-500 uppercase";
const statValueClass = "mt-0.5 truncate text-sm font-semibold tabular-nums";
const kbdClass =
  "rounded border border-zinc-700 border-b-2 bg-zinc-800 px-1.5 py-0.5 font-mono text-[10px] text-zinc-200";

function Problem42() {
  const { innerWidth: initWidth, innerHeight: initHeight } = window;
  const [windowSize, setWindowSize] = useState({
    width: initWidth,
    height: initHeight,
  });
  const [scrollPosition, setScrollPosition] = useState(0);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  useEffect(() => {
    // リサイズイベント
    const handleResize = () => {
      // ウィンドウサイズを更新
      const { innerWidth: width, innerHeight: height } = window;
      setWindowSize({ width, height });
    };

    // スクロールイベント
    const handleScroll = () => {
      // スクロール位置を更新
      const scrollY = window.scrollY;
      setScrollPosition(scrollY);
    };

    // キーボードイベント
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+S で保存処理
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        setLastSaved(new Date().toLocaleString());
      }
    };

    // イベントリスナー登録
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleKeyDown);

    // クリーンアップ
    return () => {
      // 全てのイベントリスナーを削除
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <QuestionText>
        <ol>
          <li>ウィンドウサイズの変更を監視</li>
          <li>スクロール位置を追跡</li>
          <li>
            キーボードショートカット（Ctrl+S）を実装
            <ul>
              <li>最終保存日時を表示</li>
            </ul>
          </li>
          <li>全てのイベントリスナーを適切にクリーンアップ</li>
        </ol>
      </QuestionText>

      <Card title="イベントリスナー管理" tag="h2">
        <div className="mx-auto flex w-full max-w-lg flex-col gap-5 text-left">
          {/* 監視中の値（sm 以上ではスクロール中も見えるようにヘッダー下に固定） */}
          <div className="z-1 flex flex-col gap-3 rounded-lg border border-zinc-800 bg-zinc-900/95 p-3 shadow-lg shadow-black/30 backdrop-blur sm:sticky sm:top-16">
            <dl className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_1fr_auto]">
              <div className="rounded-md bg-zinc-950/60 px-3 py-2">
                <dt className={statLabelClass}>ウィンドウサイズ</dt>
                <dd className={`${statValueClass} text-zinc-100`}>
                  {windowSize.width} × {windowSize.height}
                </dd>
              </div>
              <div className="rounded-md bg-zinc-950/60 px-3 py-2">
                <dt className={statLabelClass}>スクロール位置</dt>
                <dd className={`${statValueClass} text-zinc-100`}>
                  {scrollPosition}px
                </dd>
              </div>
              <div className="rounded-md bg-zinc-950/60 px-3 py-2">
                <dt className={statLabelClass}>最終保存</dt>
                {/* 日時は折り返さず 1 行で表示（列幅は sm:grid-cols-[1fr_1fr_auto] で中身に合わせる） */}
                <dd
                  className={`mt-0.5 text-sm font-semibold whitespace-nowrap tabular-nums ${
                    lastSaved ? "text-zinc-100" : "text-zinc-500"
                  }`}
                >
                  {lastSaved || "未保存"}
                </dd>
              </div>
            </dl>

            <p className="flex items-center justify-center gap-1.5 text-xs text-zinc-400">
              <kbd className={kbdClass}>Ctrl</kbd>
              <span>+</span>
              <kbd className={kbdClass}>S</kbd>
              <span>で保存</span>
            </p>
          </div>

          {/* スクロール確認用の領域（ページをスクロールできる高さを確保） */}
          <div className="flex h-[150vh] flex-col items-center justify-start gap-2 rounded-lg border border-dashed border-zinc-800 pt-10 text-xs text-zinc-500">
            <span aria-hidden className="animate-bounce text-lg">
              ↓
            </span>
            スクロールして位置を確認してください
          </div>
        </div>
      </Card>
    </>
  );
}

export default Problem42;
