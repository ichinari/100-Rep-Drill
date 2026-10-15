import type { CSSProperties } from "react";
import QuestionText from "@components/QuestionText";

function problem4() {
  const boxStyle: CSSProperties = {
    backgroundColor: "#f0f0f0",
    padding: "20px",
    border: "2px solid #333",
    borderRadius: "8px",
    color: "#000",
  };
  return (
    <>
      <QuestionText>
        <ol>
          <li>
            ボックスコンポーネントを作成し、以下のスタイルを適用：
            <ul>
              <li>背景色: #f0f0f0</li>
              <li>パディング: 20px</li>
              <li>ボーダー: 2px solid #333</li>
              <li>角丸: 8px</li>
            </ul>
          </li>
          <li>インラインスタイルと className の両方を試す</li>
        </ol>
      </QuestionText>

      <div className="flex flex-col gap-5">
        <div style={boxStyle}>インラインスタイルのボックス</div>
        <div className="border border-amber-300 bg-amber-300 rounded-md p-4 text-black">
          CSSクラスのボックス
        </div>
      </div>
    </>
  );
}

export default problem4;
