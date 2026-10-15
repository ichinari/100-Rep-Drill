import QuestionText from "@components/QuestionText";

function problem1() {
  return (
    <div>
      <QuestionText>
        <ol>
          <li>React コンポーネントを作成し、「Hello, React!」と表示する</li>
          <li>h1 タグを使用して見出しとして表示</li>
        </ol>
      </QuestionText>

      <div className="flex justify-center text-5xl">
        <h1>Hello, React!</h1>
      </div>
    </div>
  );
}

export default problem1;
