import { useState, type MouseEvent } from "react";
import QuestionText from "@components/QuestionText";

function Problem17() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isChangeColor, setIsChangeColor] = useState(false);
  const [counter, setCounter] = useState(0);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    // クリック処理
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
    setCounter((prev) => prev + 1);

    // Shift キーを押しながらクリックしたら背景色を切り替える
    if (e.shiftKey) {
      setIsChangeColor((prev) => !prev);
    }
  };

  const handleContextMenu = (e: MouseEvent<HTMLDivElement>) => {
    // 右クリック処理
    e.preventDefault();
    if (!confirm("カスタムメッセージを表示")) return;
  };

  const positionText = `{x: ${position.x}, y: ${position.y}}`;

  return (
    <>
      <QuestionText>
        <ol>
          <li>クリック位置の座標（clientX, clientY）を表示</li>
          <li>クリック回数をカウントして表示</li>
          <li>Shift キーを押しながらクリックした場合は背景色を変更</li>
          <li>右クリックを防止してカスタムメッセージを表示</li>
          <li>ダブルクリックでカウンターをリセット</li>
        </ol>
      </QuestionText>

      <div
        onClick={handleClick}
        onContextMenu={handleContextMenu}
        className={`flex select-none flex-col items-center gap-5 border border-white p-5 text-black transition-colors ${
          isChangeColor ? "bg-amber-200" : "bg-white"
        }`}
      >
        <p>click position：{positionText}</p>
        <p>click count：{counter}</p>
        <p>if you push shift + click, change bg-color</p>
      </div>
    </>
  );
}

export default Problem17;
