import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import QuestionText from "@components/QuestionText";
import Card from "@components/Card";

const TARGET_KEY = {
  ENTER: "Enter",
  ESCAPE: "Escape",
  KEY_Z: "z",
  SPACE: " ",
};

type Task = {
  id: string;
  text: string;
};

function Problem19() {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState<Task[]>([]);
  const [keyPressCount, setKeyPressCount] = useState({
    Enter: 0,
    Escape: 0,
    Space: 0,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // キーを押した瞬間（Enter / Escape / Ctrl+Z / Space など全キー）
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const targetKey = e.key;
    const isDownControlKey = e.ctrlKey;
    switch (targetKey) {
      case TARGET_KEY.ENTER:
        // enter
        // 未入力（空白のみも含む）は追加しない
        if (!inputValue.trim()) break;

        setItems((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            text: inputValue,
          },
        ]);

        setInputValue("");

        setKeyPressCount((prev) => ({
          ...prev,
          Enter: prev.Enter + 1,
        }));
        break;
      case TARGET_KEY.ESCAPE:
        // escape
        setInputValue("");

        setKeyPressCount((prev) => ({
          ...prev,
          Escape: prev.Escape + 1,
        }));
        break;
      case TARGET_KEY.SPACE:
        // space
        setKeyPressCount((prev) => ({
          ...prev,
          Space: prev.Space + 1,
        }));
        break;
      case TARGET_KEY.KEY_Z:
        if (!isDownControlKey) break;
        // ctrl + z
        e.preventDefault(); // ブラウザ標準の「元に戻す」を止める
        setItems((prev) => prev.slice(0, -1));
        break;
      default:
        break;
    }
  };

  return (
    <>
      <QuestionText>
        <ol>
          <li>タスク管理機能の実装</li>
          <li>入力フィールドで Enter キーを押すとリストに追加</li>
          <li>Escape キーで入力をクリア</li>
          <li>Ctrl+Z で最後の項目を削除（Undo 機能）</li>
          <li>
            特定のキーが押された回数をカウント
            <ul>
              <li>Enter</li>
              <li>Escape</li>
              <li>Space</li>
            </ul>
          </li>
        </ol>
      </QuestionText>

      <Card title="Task Manager" tag="h2">
        <div className="flex flex-col items-center gap-5">
          <div className="flex w-full max-w-md flex-col gap-1.5">
            <input
              type="text"
              aria-label="new Task"
              placeholder="タスクを入力して Enter"
              className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
              value={inputValue}
              maxLength={100}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            <p className="text-xs text-zinc-500">
              Enter：追加 ／ Esc：クリア ／ Ctrl+Z：最後の項目を削除
            </p>
          </div>

          <div className="w-full max-w-md text-left">
            <h3 className="mb-3 flex items-center justify-between text-sm font-semibold text-zinc-100">
              Task List
              <span className="text-xs font-normal text-zinc-500">
                {items.length} 件
              </span>
            </h3>
            <ul className="flex flex-col gap-2">
              {!items.length ? (
                <li className="rounded-lg border border-dashed border-zinc-800 py-6 text-center text-zinc-500">
                  タスクはありません
                </li>
              ) : (
                items.map((item, index) => (
                  <li
                    key={item.id}
                    className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950/40 px-4 py-2"
                  >
                    <span className="text-xs text-zinc-500 tabular-nums">
                      {index + 1}
                    </span>
                    <span className="break-all text-zinc-200">{item.text}</span>
                  </li>
                ))
              )}
            </ul>
          </div>

          <div className="w-full max-w-md text-left">
            <h3 className="mb-3 text-sm font-semibold text-zinc-100">
              Key Counter
            </h3>
            <dl className="grid grid-cols-3 gap-3">
              {Object.entries(keyPressCount).map(([key, count]) => (
                <div
                  key={key}
                  className="flex flex-col items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-4"
                >
                  <dt>
                    <kbd className="rounded-md border border-zinc-700 border-b-2 bg-zinc-800 px-2 py-0.5 font-mono text-xs text-zinc-300">
                      {key}
                    </kbd>
                  </dt>
                  <dd className="text-2xl font-bold text-zinc-100 tabular-nums">
                    {count}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Card>
    </>
  );
}

export default Problem19;
