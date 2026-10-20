import QuestionText from "@components/QuestionText";
import Card from "@components/Card";
import InputField from "@components/InputField";
import { useEffect, useState } from "react";

function Problem38() {
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  const [area, setArea] = useState(0);
  const [aspectRatio, setAspectRatio] = useState("正方形");
  const [sizeHistory, setSizeHistory] = useState<string[]>([]);

  useEffect(() => {
    // 幅と高さの変更を監視
    // 1. 面積を計算
    calcArea(width, height);

    // 2. アスペクト比を判定
    calcAspectRatio(width, height);

    // 3. 履歴に追加（最新5件）
    addSizeHistory(width, height, width * height, aspectRatio);
  }, [width, height]);

  const calcArea = (width: number, height: number) => {
    const result = width * height;
    setArea(result);
  };

  const calcAspectRatio = (width: number, height: number) => {
    if (width === height) {
      setAspectRatio("正方形");
    } else if (width > height) {
      setAspectRatio("横長");
    } else {
      setAspectRatio("縦長");
    }
  };

  const addSizeHistory = (
    width: number,
    height: number,
    area: number,
    aspectRatio: string,
  ) => {
    setSizeHistory((prev) => {
      const newHistory = [
        `幅: ${width}, 高さ: ${height}, 面積: ${area}, 形状: ${aspectRatio}`,
        ...prev,
      ];
      return newHistory.slice(0, 5);
    });
  };

  return (
    <>
      <QuestionText>
        <ol>
          <li>幅と高さの入力フィールドを監視</li>
          <li>面積を自動計算</li>
          <li>アスペクト比を判定（正方形/横長/縦長）</li>
          <li>サイズ変更履歴を記録（最新 5 件）</li>
        </ol>
      </QuestionText>

      <Card title="寸法計算機" tag="h2">
        <div className="mx-auto flex w-full max-w-lg flex-col gap-5 text-left">
          {/* 幅・高さの入力 */}
          <div className="grid grid-cols-2 gap-4">
            <InputField
              type="number"
              label="幅"
              min="0"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
            />
            <InputField
              type="number"
              label="高さ"
              min="0"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
            />
          </div>

          <div>
            <p>面積: {area}</p>
            <p>形状: {aspectRatio}</p>
          </div>

          <div className="flex flex-col items-center gap-2.5 border border-gray-300 p-4 max-h-40">
            <h3>変更履歴（最新5件）</h3>
            {/* 見出しは固定し、リストだけを縦スクロール */}
            <ul className="min-h-0 w-full flex-1 overflow-y-auto overscroll-contain text-center [scrollbar-color:var(--color-zinc-600)_transparent] scrollbar-thin">
              {sizeHistory.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </>
  );
}

export default Problem38;
