import QuestionText from "@components/QuestionText";
import Card from "@components/Card";
import InputField from "@components/InputField";
import { useState, useEffect } from "react";
import useDebounce from "@hooks/useDebounce";

const valueLabelClass =
  "text-[10px] font-medium tracking-widest text-zinc-500 uppercase";
const valueClass = "mt-1 min-h-5 truncate text-sm font-semibold text-zinc-100";

function Problem50() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  useEffect(() => {
    if (debouncedSearchTerm) {
      console.log("Searching for:", debouncedSearchTerm);
      // ここでAPI呼び出しなど
    }
  }, [debouncedSearchTerm]);

  // 入力値がまだデバウンス後の値に反映されていない間は待機中として表示する
  const isWaiting = searchTerm !== debouncedSearchTerm;

  return (
    <>
      <QuestionText>
        <ol>
          <li>useDebounceフックを作成</li>
          <li>指定時間経過後に値が更新される</li>
          <li>連続入力時は前のタイマーをキャンセル</li>
        </ol>
      </QuestionText>

      <Card title="デバウンス機能のカスタムフック" tag="h2">
        <div className="mx-auto flex w-full max-w-lg flex-col gap-5 text-left">
          <InputField
            type="search"
            aria-label="検索キーワード"
            className="w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
          />

          {/* 入力値とデバウンス後の値の比較 */}
          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="min-w-0 rounded-lg border border-zinc-800 bg-zinc-950/40 px-4 py-3">
              <dt className={valueLabelClass}>Input value</dt>
              <dd className={valueClass}>
                {searchTerm || <span className="text-zinc-600">—</span>}
              </dd>
            </div>
            <div
              className={`min-w-0 rounded-lg border px-4 py-3 transition-colors ${
                isWaiting
                  ? "border-amber-500/40 bg-amber-500/5"
                  : "border-violet-500/40 bg-violet-500/5"
              }`}
            >
              <dt className="flex items-center justify-between gap-2">
                <span className={valueLabelClass}>Debounced value</span>
                {isWaiting && (
                  <span className="animate-pulse text-[10px] text-amber-300">
                    待機中...
                  </span>
                )}
              </dt>
              <dd className={valueClass}>
                {debouncedSearchTerm || (
                  <span className="text-zinc-600">—</span>
                )}
              </dd>
            </div>
          </dl>
        </div>
      </Card>
    </>
  );
}

export default Problem50;
