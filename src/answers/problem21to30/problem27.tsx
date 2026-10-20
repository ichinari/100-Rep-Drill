import { useState } from "react";
import QuestionText from "@components/QuestionText";

function Problem27() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <>
      <QuestionText>
        <ol>
          <li>テーマ切り替え（ライト/ダーク）機能を実装</li>
          <li>三項演算子で表示内容とスタイルを切り替え</li>
          <li>
            アイコンとテキストも動的に変更
            <ul>
              <li>
                backgroundColor
                <ul>
                  <li>ダークモード時は #1a1a1a</li>
                  <li>ライトモード時は #ffffff</li>
                </ul>
              </li>
              <li>
                color
                <ul>
                  <li>ダークモード時は #ffffff</li>
                  <li>ライトモード時は #000000</li>
                </ul>
              </li>
            </ul>
          </li>
          <li>背景色、文字色、ボタンスタイルを連動</li>
        </ol>
      </QuestionText>

      <div
        className={`p-4 rounded flex flex-col items-center gap-5 ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}
      >
        <div className="flex gap-4">
          {isDarkMode ? (
            <div className="flex items-center gap-2">
              <span aria-hidden="true">🌙</span>
              <p>ダークモード</p>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span aria-hidden="true">☀️</span>
              <p>ライトモード</p>
            </div>
          )}
        </div>

        <button
          type="button"
          aria-pressed={isDarkMode}
          className={`cursor-pointer rounded-lg border px-5 py-2.5 text-sm font-semibold shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 ${
            isDarkMode
              ? "border-zinc-600 bg-zinc-800 text-white hover:bg-zinc-700"
              : "border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-200"
          }`}
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? "ダークモード" : "ライトモード"}
        </button>
      </div>
    </>
  );
}

export default Problem27;
