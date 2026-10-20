import QuestionText from "@components/QuestionText";
import Card from "@components/Card";
import { useEffect, useState } from "react";

function Problem36() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // マウント時の処理を記述
    // 1. コンソールにログ出力
    console.log("Component mounted");
    // 2. メッセージを設定
    setMessage("コンポーネントがマウントされました");
    // 3. ページタイトルを変更
    document.title = "Problem36 - マウント時の処理";
  }, []); // 空の依存配列

  return (
    <>
      <QuestionText>
        <ol>
          <li>コンポーネントマウント時にメッセージを表示</li>
          <li>ページタイトルを変更</li>
        </ol>
      </QuestionText>

      <Card title="マウント時の処理" tag="h2">
        <div className="mx-auto flex w-full max-w-lg flex-col gap-5 justify-center">
          <p>メッセージ：{message}</p>
        </div>
      </Card>
    </>
  );
}

export default Problem36;
