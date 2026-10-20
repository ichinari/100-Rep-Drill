import QuestionText from "@components/QuestionText";
import Card from "@components/Card";

function Problem31() {
  const FRUITS = ["りんご", "みかん", "バナナ", "ぶどう", "もも"];

  return (
    <>
      <QuestionText>
        <ol>
          <li>果物の配列をリスト表示</li>
          <li>map()を使って動的に生成</li>
          <li>適切な key 属性を設定</li>
          <li>インデックスも表示（1 から開始）</li>
        </ol>
      </QuestionText>

      <Card title="果物リスト" tag="h2">
        <div className="mx-auto flex w-full max-w-lg flex-col items-center gap-5">
          <ul>
            {FRUITS.map((fruit, index) => (
              <li key={`${fruit}-${index}`}>
                {index + 1}. {fruit}
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </>
  );
}

export default Problem31;
