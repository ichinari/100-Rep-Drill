import QuestionText from "@components/QuestionText";

function problem3() {
  const name = "田中太郎";
  const age = 25;
  const year = new Date().getFullYear();

  return (
    <>
      <QuestionText>
        <ol>
          <li>名前と年齢を変数に格納し、JSX 内で表示する</li>
          <li>現在の年も表示する</li>
          <li>
            「私は[名前]です。[年齢]歳です。今年は[年]年です。」の形式で表示
          </li>
        </ol>
      </QuestionText>

      <div>
        <p>
          私は{name}です。{age}歳です。今年は{year}年です。
        </p>
      </div>
    </>
  );
}

export default problem3;
