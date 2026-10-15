import Button from "@/components/Button";
import QuestionText from "@components/QuestionText";

function problem8() {
  return (
    <>
      <QuestionText>
        <ol>
          <li>Button コンポーネントを作成</li>
          <li>
            text（表示テキスト）、size（small/medium/large）、color（色）を受け取る
          </li>
          <li>デフォルト値：text="Click me", size="medium", color="blue"</li>
        </ol>
      </QuestionText>

      <Button text="Click me" size="large" backgroundColor="blue" />
    </>
  );
}

export default problem8;
