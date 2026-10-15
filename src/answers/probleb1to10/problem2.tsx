import QuestionText from "@components/QuestionText";

function problem2() {
  return (
    <>
      <QuestionText>
        <ol>
          <li>見出し（h1）とパラグラフ（p）の 2 つの要素を表示する</li>
          <li>
            Fragment または&lt;&gt;...&lt;/&gt;を使用して複数要素をラップする
          </li>
          <li>
            見出しは「私のプロフィール」、パラグラフは「React
            を学習中です」と表示
          </li>
        </ol>
      </QuestionText>

      <div className="flex flex-col items-center">
        <h1>私のプロフィール</h1>
        <p>Reactを学習中です</p>
      </div>
    </>
  );
}

export default problem2;
