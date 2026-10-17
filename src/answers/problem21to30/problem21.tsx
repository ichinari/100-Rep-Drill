import { useState } from "react";
import Card from "@/components/Card";
import QuestionText from "@components/QuestionText";
import InputField from "@/components/InputField";

type FormData = {
  name: string;
  email: string;
  phone: string;
};

type FieldName = keyof FormData; // "name" | "email" | "phone"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 問題なければ ""、問題があればエラーメッセージを返す
const validation = (type: FieldName, value: string): string => {
  // 必須チェック（空白のみも未入力とみなす）
  if (!value.trim()) return "入力必須です";

  // 形式チェック
  switch (type) {
    case "name":
      return value.trim().length >= 2
        ? ""
        : "名前は 2 文字以上で入力してください";
    case "email":
      return EMAIL_PATTERN.test(value)
        ? ""
        : "有効なメールアドレスを入力してください";
    case "phone":
      // ハイフンなど数字以外を除いた桁数で判定
      return value.replace(/\D/g, "").length >= 10
        ? ""
        : "電話番号は 10 桁以上で入力してください";
  }
};

// 080 / 090 始まりの電話番号を 3-4-4 桁のハイフン区切りにする
// 例: 09012345678 → 090-1234-5678
const formatPhone = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
};

function Problem21() {
  const [formData, setFormData] = useState<Partial<Record<FieldName, string>>>(
    {},
  );
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});

  const handleChange = (name: FieldName, value: string) => {
    const errorMessage = validation(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: errorMessage,
    }));

    const formattedValue = name === "phone" ? formatPhone(value) : value;

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  // エラーのない入力データが 1 つでもあるか
  const FIELD_NAMES: FieldName[] = ["name", "email", "phone"];
  const hasFormData = FIELD_NAMES.some((name) => !!formData[name]);

  return (
    <>
      <QuestionText>
        <ol>
          <li>名前、メール、電話番号の制御コンポーネントを作成</li>
          <li>
            リアルタイムでフォーマット検証
            <ul>
              <li>名前：2 文字以上入力されていること</li>
              <li>
                メールアドレス：正しいメールアドレス形式で入力されていること
              </li>
              <li>電話番号：10 桁以上入力されていること</li>
            </ul>
          </li>
          <li>
            エラーメッセージ
            <ul>
              <li>名前：名前は 2 文字以上で入力してください</li>
              <li>メールアドレス：有効なメールアドレスを入力してください</li>
              <li>電話番号：電話番号は 10 桁以上で入力してください</li>
            </ul>
          </li>
          <li>
            入力値を整形（電話番号にハイフン自動挿入）
            <ul>
              <li>
                080-, 090-
                から始まる電話番号に対応（フリーダイヤルは考慮しなくていい）
              </li>
            </ul>
          </li>
          <li>全フィールドの入力状態を一箇所で管理</li>
        </ol>
      </QuestionText>

      <Card title="フォーム" tag="h2">
        <div className="flex flex-col items-center gap-5">
          <InputField
            label="name"
            name="name"
            isRequired
            onChange={(e) =>
              handleChange(e.target.name as FieldName, e.target.value)
            }
          >
            {errors.name}
          </InputField>
          <InputField
            label="email"
            name="email"
            isRequired
            onChange={(e) =>
              handleChange(e.target.name as FieldName, e.target.value)
            }
          >
            {errors.email}
          </InputField>
          <InputField
            label="phone"
            name="phone"
            isRequired
            onChange={(e) =>
              handleChange(e.target.name as FieldName, e.target.value)
            }
          >
            {errors.phone}
          </InputField>

          {hasFormData && (
            <div>
              入力内容：
              <pre>{JSON.stringify(formData, null, 2)}</pre>
            </div>
          )}
        </div>
      </Card>
    </>
  );
}

export default Problem21;
