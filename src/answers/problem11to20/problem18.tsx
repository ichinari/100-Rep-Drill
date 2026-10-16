import { useRef, useState, type MouseEvent } from "react";
import QuestionText from "@components/QuestionText";

const INIT_BOX_POSITION = { x: 50, y: 50 };

function Problem18() {
  const offsetRef = useRef({ x: 0, y: 0 });

  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [boxPos, setBoxPos] = useState(INIT_BOX_POSITION);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault(); // 文字選択などブラウザ標準の動きを止める

    const rect = e.currentTarget.getBoundingClientRect(); // ボックスの画面上の位置
    offsetRef.current = {
      x: e.clientX - rect.left, // マウスの位置 − ボックスの左端
      y: e.clientY - rect.top, // マウスの位置 − ボックスの上端
    };

    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect(); // コンテナの画面上の位置と大きさ
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    setMousePos({ x: Math.round(mouseX), y: Math.round(mouseY) });

    if (!isDragging) return;

    const newX = mouseX - offsetRef.current.x;
    const newY = mouseY - offsetRef.current.y;

    const BOX_SIZE = 200; // w-50 / h-50 = 200px
    const maxX = rect.width - BOX_SIZE;
    const maxY = rect.height - BOX_SIZE;

    setBoxPos({
      x: Math.round(Math.min(Math.max(newX, 0), maxX)),
      y: Math.round(Math.min(Math.max(newY, 0), maxY)),
    });
  };

  // コンテナの外にマウスが出たら、ドラッグを終えてボックスを初期位置に戻す
  const handleContainerMouseLeave = () => {
    setIsDragging(false);
    setBoxPos(INIT_BOX_POSITION);
  };

  return (
    <>
      <QuestionText>
        <ol>
          <li>
            コンテナ用の div 要素を容易し、その中にボックス用の div
            要素を用意する。
          </li>
          <li>ボックスにマウスを乗せると色が変わる（hover 効果）</li>
          <li>div 要素内でマウスの動きに応じて座標を追跡表示</li>
          <li>
            ドラッグでボックスを移動できること
            <ul>
              <li>ボックスの移動はコンテナ内であること</li>
            </ul>
          </li>
          <li>マウスが離れたら元の位置に戻る</li>
        </ol>
      </QuestionText>

      <div className="flex flex-col gap-5 mb-5">
        <p>Mouse Position : {`x=${mousePos.x}, y=${mousePos.y}`}</p>
        <p>Box Position : {`x=${boxPos.x}, y=${boxPos.y}`}</p>
        <p>
          Init Box Position :{" "}
          {`x=${INIT_BOX_POSITION.x}, y=${INIT_BOX_POSITION.y}`}
        </p>
      </div>

      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleContainerMouseLeave}
        className="border border-white w-full h-150 relative"
      >
        <div
          onMouseDown={handleMouseDown}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ left: boxPos.x, top: boxPos.y }}
          className={`w-50 h-50 absolute flex justify-center items-center rounded-lg border font-semibold transition-colors ${
            isHovered
              ? "border-gray-200 bg-gray-300 text-gray-900"
              : "border-gray-500 bg-gray-600 text-white"
          }`}
        >
          ドラック可能
        </div>
      </div>
    </>
  );
}

export default Problem18;
