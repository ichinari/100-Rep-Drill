import InputField from "@/components/InputField";
import QuestionText from "@components/QuestionText";

function problem10() {
  return (
    <>
      <QuestionText>
        <ol>
          <li>InputField コンポーネントを作成</li>
          <li>label props と、その他全ての props を input 要素に転送</li>
          <li>スプレッド演算子を使って props を展開</li>
          <li>type、placeholder、required などを親から渡せるようにする</li>
        </ol>
      </QuestionText>

      <InputField
        label="メールアドレス"
        type="email"
        placeholder="example@email.com"
        isRequired
      />
    </>
  );
}

export default problem10;
