import { useState, type ChangeEvent } from "react";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import QuestionText from "@components/QuestionText";

function Problem12() {
  const [displayText, setDisplayText] = useState("");

  const changeText = (e: ChangeEvent<HTMLInputElement>) => {
    setDisplayText(e.target.value);
  };

  const handleReset = () => {
    setDisplayText("");
  };

  return (
    <>
      <QuestionText>
        <ol>
          <li>テキスト入力フィールドの値を useState で管理</li>
          <li>入力した文字をリアルタイムで下に表示</li>
          <li>文字数カウントも表示</li>
          <li>クリアボタンで入力をリセット</li>
        </ol>
      </QuestionText>

      <div className="flex flex-col items-center gap-5">
        <InputField
          label="表示したい文字"
          value={displayText}
          onChange={changeText}
        />

        <p>
          入力内容：
          {displayText.length > 0 ? (
            displayText
          ) : (
            <span className="text-zinc-500">（未入力）</span>
          )}
        </p>
        <p>文字数：{displayText.length}</p>

        <Button text="reset" backgroundColor="#353535" onClick={handleReset} />
      </div>
    </>
  );
}

export default Problem12;
