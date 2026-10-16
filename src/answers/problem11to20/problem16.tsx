import { useState } from "react";
import QuestionText from "@components/QuestionText";
import Card from "@components/Card";
import Button from "@/components/Button";

function Problem16() {
  const [lastClicked, setLastClicked] = useState("なし");

  const handleClick = (type: string = "first"): void => {
    const clickedButtonName =
      type === "second"
        ? "button-2"
        : type === "third"
          ? "button-3"
          : "button-1";

    setLastClicked(clickedButtonName);
  };

  const title = `最後に押したボタン：${lastClicked}`;

  return (
    <>
      <QuestionText>
        <ol>
          <li>3 つの異なるボタンを作成</li>
          <li>それぞれクリックしたときに異なるアラートを表示</li>
          <li>イベントハンドラーは関数として定義</li>
          <li>最後にクリックしたボタンの名前を画面に表示</li>
        </ol>
      </QuestionText>

      <Card tag="h3" title={title}>
        <div className="flex justify-center gap-5">
          <Button
            text="button-1"
            backgroundColor="#626262"
            onClick={() => handleClick("first")}
          />
          <Button
            text="button-2"
            backgroundColor="#626262"
            onClick={() => handleClick("second")}
          />
          <Button
            text="button-3"
            backgroundColor="#626262"
            onClick={() => handleClick("third")}
          />
        </div>
      </Card>
    </>
  );
}

export default Problem16;
