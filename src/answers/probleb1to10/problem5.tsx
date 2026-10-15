import QuestionText from "@components/QuestionText";

function problem5() {
  const imageUrl = "https://placehold.co/150";
  const altText = "サンプル画像";
  const baseWidth = 150;
  const isLarge = true;

  const calcWidth = isLarge ? baseWidth * 2 : baseWidth;
  const dataSize = isLarge ? "large" : "small";

  return (
    <>
      <QuestionText>
        <ol>
          <li>画像を表示するコンポーネントを作成</li>
          <li>src、alt、width を変数から動的に設定</li>
          <li>isLarge フラグが true の場合は width を 2 倍にする</li>
          <li>
            data-size 属性を追加し、isLarge フラグが true の場合は
            large、それ以外は small にする
          </li>
        </ol>
      </QuestionText>

      <div>
        <img
          src={imageUrl}
          alt={altText}
          width={calcWidth}
          data-size={dataSize}
        />
      </div>
    </>
  );
}

export default problem5;
