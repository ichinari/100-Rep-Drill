import { useState, type ChangeEvent } from "react";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import QuestionText from "@components/QuestionText";

type FormValue = {
  name: string;
  email: string;
};

type FieldName = keyof FormValue;

const MIN_LENGTH = 3;

function Problem20() {
  const [formValue, setFormValue] = useState<FormValue>({
    name: "",
    email: "",
  });
  const [focusedField, setFocusedField] = useState<FieldName | null>(null);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});

  const handleFocus = (fieldName: FieldName) => {
    // フォーカス処理
    setFocusedField(fieldName);
  };

  const handleBlur = (fieldName: FieldName) => {
    // ブラー処理とバリデーション
    setFocusedField(null);

    const isValid = formValue[fieldName].trim().length >= MIN_LENGTH;
    setErrors((prev) => ({
      ...prev,
      [fieldName]: isValid ? "" : `${MIN_LENGTH} 文字以上入力してください`,
    }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    alert(`送信しました\nname：${formValue.name}\nemail：${formValue.email}`);
  };

  // 全フィールドが 3 文字以上入力されていれば送信可能
  const isFormValid = Object.values(formValue).every(
    (value) => value.trim().length >= MIN_LENGTH,
  );
  const isDisabled = !isFormValid;

  return (
    <>
      <QuestionText>
        <ol>
          <li>複数の入力フィールドでフォーカス状態を管理</li>
          <li>フォーカス時に枠線の色を変更</li>
          <li>
            ブラー時に入力値を検証
            <ul>
              <li>3 文字以上入力してください</li>
            </ul>
          </li>
          <li>全フィールド入力完了で送信ボタンを有効化</li>
        </ol>
      </QuestionText>

      <form action={handleSubmit} className="flex flex-col items-center gap-5">
        <p className="text-xs text-zinc-500">
          フォーカス中：{focusedField ?? "なし"}
        </p>
        <div className="flex w-full max-w-sm flex-col gap-1.5">
          <InputField
            label="name"
            name="name"
            value={formValue.name}
            isRequired
            onChange={handleChange}
            isFocused={focusedField === "name"}
            onFocus={() => handleFocus("name")}
            onBlur={() => handleBlur("name")}
          />
          {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
        </div>
        <div className="flex w-full max-w-sm flex-col gap-1.5">
          <InputField
            label="email"
            name="email"
            type="email"
            value={formValue.email}
            isRequired
            onChange={handleChange}
            isFocused={focusedField === "email"}
            onFocus={() => handleFocus("email")}
            onBlur={() => handleBlur("email")}
          />
          {errors.email && (
            <p className="text-xs text-red-400">{errors.email}</p>
          )}
        </div>
        <Button
          text="send"
          type="submit"
          isDisabled={isDisabled}
          backgroundColor="#818181"
        />
      </form>
    </>
  );
}

export default Problem20;
