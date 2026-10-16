import { useState, type ChangeEvent, type SubmitEvent } from "react";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import QuestionText from "@components/QuestionText";

function Problem14() {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    age: "",
  });

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const confirmText = `
      入力内容は以下
      name：${formValues.name}
      email：${formValues.email}
      age：${formValues.age}
    `;

    if (!confirm(confirmText)) return;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClear = () => {
    setFormValues({
      name: "",
      email: "",
      age: "",
    });
  };

  // すべての項目が未入力（空白のみも含む）なら true
  const isDisable = Object.values(formValues).every(
    (value) => value.trim() === "",
  );

  return (
    <>
      <QuestionText>
        <ol>
          <li>ユーザー登録フォームを作成</li>
          <li>名前、メール、年齢の 3 つの入力フィールド</li>
          <li>それぞれを useState で管理</li>
          <li>送信ボタンで入力内容を確認表示</li>
          <li>全てクリアするボタンも実装</li>
        </ol>
      </QuestionText>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-5"
      >
        <div className="flex flex-col items-center gap-5">
          <InputField
            label="name"
            name="name"
            type="text"
            value={formValues.name}
            onChange={handleChange}
          />

          <InputField
            label="email"
            name="email"
            type="email"
            value={formValues.email}
            onChange={handleChange}
          />

          <InputField
            label="age"
            name="age"
            type="text"
            value={formValues.age}
            onChange={handleChange}
          />
        </div>

        <Button
          text="send"
          type="submit"
          backgroundColor="#5d5d5d"
          isDisabled={isDisable}
        />

        <Button
          text="clear all"
          backgroundColor="#5d5d5d"
          onClick={handleClear}
        />
      </form>
    </>
  );
}

export default Problem14;
