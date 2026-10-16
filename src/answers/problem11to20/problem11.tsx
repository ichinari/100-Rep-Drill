import { useState } from "react";
import Button from "@/components/Button";
import QuestionText from "@components/QuestionText";

function Problem11() {
  const [count, setCount] = useState(0);

  const handleDecrement = () => {
    setCount((prev) => prev - 1);
  };

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <>
      <QuestionText>
        <ol>
          <li>useState を使ってカウンターを実装</li>
          <li>「+」ボタンで 1 増加、「-」ボタンで 1 減少</li>
          <li>現在の値を表示</li>
          <li>リセットボタンで 0 に戻す</li>
        </ol>
      </QuestionText>

      <div className="flex flex-col items-center gap-5">
        <div>count：{count}</div>

        <div className="flex gap-5">
          <Button
            text="-"
            backgroundColor="#353535"
            onClick={handleDecrement}
          />
          <Button
            text="+"
            backgroundColor="#353535"
            onClick={handleIncrement}
          />
        </div>

        <div>
          <Button
            text="reset"
            backgroundColor="#353535"
            onClick={handleReset}
          />
        </div>
      </div>
    </>
  );
}

export default Problem11;
