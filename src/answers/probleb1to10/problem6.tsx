import Greeting from "@/components/Greeting";
import QuestionText from "@components/QuestionText";

function problem6() {
  return (
    <>
      <QuestionText>
        <ol>
          <li>Greeting コンポーネントを作成し、name を props で受け取る</li>
          <li>「こんにちは、[name]さん！」と表示する</li>
          <li>親コンポーネントから異なる名前を 3 回渡して表示</li>
        </ol>
      </QuestionText>

      <Greeting name="佐藤" />
      <Greeting name="田中" />
      <Greeting name="斎藤" />
    </>
  );
}

export default problem6;
