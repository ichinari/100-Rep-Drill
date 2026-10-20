import QuestionText from "@components/QuestionText";
import Card from "@components/Card";
import Button from "@components/Button";
import { useEffect, useRef, useState } from "react";

function Problem37() {
  const [count, setCount] = useState(0);
  const [changeCount, setChangeCount] = useState(0);
  const [history, setHistory] = useState<number[]>([]);
  // 直前の count（初回表示や StrictMode の 2 回実行を変更として数えないため）
  const prevCountRef = useRef(count);

  useEffect(() => {
    // countの変更を監視
    if (prevCountRef.current === count) return;
    prevCountRef.current = count;

    // 1. 変更回数を増やす
    setChangeCount((prev) => prev + 1);
    // 2. 履歴に追加
    setHistory((prev) => [...prev, count]);
    // 3. 5の倍数チェック（0 は除く）
    if (count !== 0 && count % 5 === 0) {
      alert(`カウントが 5 の倍数（${count}）になりました`);
    }
  }, [count]);

  return (
    <>
      <QuestionText>
        <ol>
          <li>カウンターの値を監視</li>
          <li>カウンターが変更されるたびに履歴に追加</li>
          <li>変更回数をカウント</li>
          <li>カウントが 5 の倍数になったらアラート表示</li>
        </ol>
      </QuestionText>

      <Card title="状態変更の監視" tag="h2">
        <div className="mx-auto flex w-full max-w-lg flex-col gap-5 justify-center">
          <p>カウント: {count}</p>
          <p>変更回数: {changeCount}</p>

          <div className="flex justify-center gap-3">
            <Button
              text="-1"
              size="small"
              backgroundColor="#7d7d7e"
              onClick={() => setCount(count - 1)}
            />
            <Button
              text="+1"
              size="small"
              backgroundColor="#7c3aed"
              onClick={() => setCount(count + 1)}
            />
            <Button
              text="+5"
              size="small"
              backgroundColor="#7c3aed"
              onClick={() => setCount(count + 5)}
            />
          </div>

          <div>
            <h3>履歴:</h3>
            <ul>
              {history.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </>
  );
}

export default Problem37;
