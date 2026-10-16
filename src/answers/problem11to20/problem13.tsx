import { useState } from "react";
import QuestionText from "@components/QuestionText";

function Problem13() {
  const [status, setStatus] = useState(true);

  const toggleStatus = () => {
    setStatus((prev) => !prev);
  };

  const displayStatus = status ? "アクティブ" : "非アクティブ";

  return (
    <>
      <QuestionText>
        <ol>
          <li>ON/OFF を切り替えるトグルスイッチを実装</li>
          <li>状態に応じてボタンのテキストと背景色を変更</li>
          <li>ON の時は緑、OFF の時は赤の背景色</li>
          <li>
            状態を表すアイコンやテキストも表示
            <ul>
              <li>ON の時はアクティブ</li>
              <li>OFF の時は非アクティブと表示</li>
            </ul>
          </li>
        </ol>
      </QuestionText>

      <div className="flex flex-col items-center gap-5">
        <button
          type="button"
          role="switch"
          aria-checked={status}
          onClick={toggleStatus}
          className={`relative inline-flex h-9 w-20 items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 ${
            status ? "bg-green-600" : "bg-red-600"
          }`}
        >
          <span
            className={`absolute text-xs font-bold text-white transition-all ${
              status ? "left-3" : "right-3"
            }`}
          >
            {status ? "ON" : "OFF"}
          </span>
          <span
            className={`inline-block h-7 w-7 rounded-full bg-white shadow transition-transform ${
              status ? "translate-x-12" : "translate-x-1"
            }`}
          />
        </button>

        <p className="flex items-center gap-2 text-sm text-zinc-400">
          現在の状態：
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset transition-colors ${
              status
                ? "bg-green-500/10 text-green-300 ring-green-500/30"
                : "bg-red-500/10 text-red-300 ring-red-500/30"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                status ? "bg-green-400" : "bg-red-400"
              }`}
            />
            {displayStatus}
          </span>
        </p>
      </div>
    </>
  );
}

export default Problem13;
