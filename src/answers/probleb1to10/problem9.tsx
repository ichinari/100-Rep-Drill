import Card from "@/components/Card";
import QuestionText from "@components/QuestionText";

function problem9() {
  return (
    <>
      <QuestionText>
        <ol>
          <li>Card コンポーネントを作成し、枠線付きのカードを表示</li>
          <li>children を使って任意のコンテンツを表示可能にする</li>
          <li>title props で見出しを表示</li>
          <li>異なるコンテンツを持つカードを 3 つ作成</li>
        </ol>
      </QuestionText>

      <div className="flex flex-col items-center gap-5">
        <Card title="カード１">カード１の内容</Card>
        <Card title="カード２">カード２の内容</Card>
        <Card title="カード３">カード３の内容</Card>
      </div>
    </>
  );
}

export default problem9;
