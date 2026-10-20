import QuestionText from "@components/QuestionText";
import Card from "@components/Card";
import InputField from "@components/InputField";
import { useEffect, useState } from "react";

function Problem40() {
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [searchCount, setSearchCount] = useState(0);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // 検索処理
  const search = () => {
    setSearchCount((prev) => prev + 1);
    setSearchHistory((prev) => [searchTerm, ...prev]);
  };

  useEffect(() => {
    // デバウンス処理を実装
    // 1. 入力中フラグを立てる
    if (inputValue === searchTerm) return;
    setIsTyping(true);

    // 2. タイマーを設定（500ms）
    const timer = setTimeout(() => {
      setSearchTerm(inputValue);
      setIsTyping(false);
    }, 500);

    // クリーンアップでタイマーをクリア
    return () => clearTimeout(timer);

    // 3. タイマー完了後に検索実行
    // クリーンアップでタイマーをクリア
  }, [inputValue]);

  useEffect(() => {
    // 実際の検索処理
    if (searchTerm) {
      // 検索を実行（シミュレーション）
      // 検索回数を増やす
      search();
    }
  }, [searchTerm]);
  return (
    <>
      <QuestionText>
        <ol>
          <li>検索入力をデバウンス処理（500ms 待機）</li>
          <li>入力中は「入力中...」を表示</li>
          <li>検索実行回数をカウント</li>
          <li>検索履歴を表示</li>
        </ol>
      </QuestionText>

      <Card title="デバウンス検索" tag="h2">
        <div className="mx-auto flex w-full max-w-lg flex-col gap-5 text-left">
          {/* 検索入力 + 入力中インジケーター（高さを固定してガタつきを防ぐ） */}
          <div className="flex flex-col gap-2">
            <InputField
              type="search"
              aria-label="検索キーワード"
              className="w-full"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="検索キーワードを入力..."
            />
            <div className="h-4 text-xs" aria-live="polite">
              {isTyping && (
                <span className="inline-flex items-center gap-1.5 text-violet-300">
                  <span className="flex gap-0.5">
                    <span className="h-1 w-1 animate-bounce rounded-full bg-violet-400 [animation-delay:-0.3s]" />
                    <span className="h-1 w-1 animate-bounce rounded-full bg-violet-400 [animation-delay:-0.15s]" />
                    <span className="h-1 w-1 animate-bounce rounded-full bg-violet-400" />
                  </span>
                  入力中...
                </span>
              )}
            </div>
          </div>

          {/* 検索状況 */}
          <dl className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-zinc-800 bg-zinc-950/40 px-4 py-3">
              <dt className="text-[10px] font-medium tracking-widest text-zinc-500 uppercase">
                検索キーワード
              </dt>
              <dd className="mt-1 truncate text-sm font-semibold text-zinc-100">
                {searchTerm || <span className="text-zinc-600">—</span>}
              </dd>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-950/40 px-4 py-3">
              <dt className="text-[10px] font-medium tracking-widest text-zinc-500 uppercase">
                検索実行回数
              </dt>
              <dd className="mt-1 text-sm font-semibold text-zinc-100 tabular-nums">
                {searchCount} 回
              </dd>
            </div>
          </dl>

          {/* 検索履歴 */}
          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-medium tracking-widest text-zinc-500 uppercase">
              検索履歴
            </h3>
            {searchHistory.length ? (
              <ul className="max-h-48 divide-y divide-zinc-800 overflow-y-auto overscroll-contain rounded-lg border border-zinc-800 scrollbar-thin [scrollbar-color:var(--color-zinc-600)_transparent]">
                {searchHistory.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-300"
                  >
                    <span className="w-5 shrink-0 text-right text-[10px] text-zinc-600 tabular-nums">
                      {index + 1}
                    </span>
                    <span className="truncate">{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="rounded-lg border border-dashed border-zinc-800 py-6 text-center text-xs text-zinc-500">
                まだ検索履歴はありません
              </p>
            )}
          </div>
        </div>
      </Card>
    </>
  );
}

export default Problem40;
