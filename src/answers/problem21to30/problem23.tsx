import { useState, type SubmitEvent } from "react";
import QuestionText from "@components/QuestionText";
import Card from "@/components/Card";
import InputField from "@/components/InputField";
import Button from "@/components/Button";

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
};

type FieldName = keyof FormData;

const EMAIL_PATTERN =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// パスワードの条件（満たした数 = 強度スコア / required: true = 必須条件）
const PASSWORD_RULES = [
  { test: (pw: string) => pw.length >= 8, required: true }, // 8 文字以上
  { test: (pw: string) => /[a-z]/.test(pw), required: true }, // 小文字
  { test: (pw: string) => /[A-Z]/.test(pw), required: true }, // 大文字
  { test: (pw: string) => /[0-9]/.test(pw), required: true }, // 数字
  { test: (pw: string) => /[^a-zA-Z0-9]/.test(pw), required: false }, // 特殊文字（推奨）
];

// 必須条件（required: true のルール）をすべて満たすか
const isPasswordValid = (password: string): boolean =>
  PASSWORD_RULES.filter((rule) => rule.required).every((rule) =>
    rule.test(password),
  );

// 強度: 0-5のスコアを返す（PASSWORD_RULES のうち満たした条件の数）
const checkPasswordStrength = (password: string): number =>
  PASSWORD_RULES.filter((rule) => rule.test(password)).length;

const STRENGTH_LABELS = [
  { max: 1, label: "弱い", color: "text-red-400" },
  { max: 3, label: "普通", color: "text-amber-400" },
  { max: 4, label: "強い", color: "text-green-400" },
  { max: 5, label: "とても強い", color: "text-emerald-300" },
];

const validateEmail = (email: string) => EMAIL_PATTERN.test(email);

// 1 項目分の検証。問題なければ ""、問題があればエラーメッセージを返す
const validateField = (name: FieldName, data: FormData): string => {
  switch (name) {
    case "email":
      if (!data.email.trim()) return "メールアドレスは必須です";
      return validateEmail(data.email)
        ? ""
        : "有効なメールアドレスを入力してください";
    case "password":
      if (!data.password) return "パスワードは必須です";
      return isPasswordValid(data.password)
        ? ""
        : "8 文字以上で、大文字・小文字・数字を含めてください";
    case "confirmPassword":
      if (!data.confirmPassword) return "確認用パスワードは必須です";
      return data.password === data.confirmPassword
        ? ""
        : "パスワードが一致しません";
    case "agreeToTerms":
      return data.agreeToTerms ? "" : "利用規約への同意が必要です";
  }
};

const FIELD_NAMES: FieldName[] = [
  "email",
  "password",
  "confirmPassword",
  "agreeToTerms",
];

const INITIAL_FORM_DATA: FormData = {
  email: "",
  password: "",
  confirmPassword: "",
  agreeToTerms: false,
};

function Problem23() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});

  // 入力値から毎回計算できるので state にしない
  const passwordStrength = checkPasswordStrength(formData.password);
  const strength =
    STRENGTH_LABELS.find((item) => passwordStrength <= item.max) ??
    STRENGTH_LABELS[0];

  // パスワードの一致状態（確認欄に入力があるときだけ表示）
  const isPasswordMatched =
    formData.confirmPassword !== "" &&
    formData.password === formData.confirmPassword;

  // 全項目にエラーがなければ送信可能
  const isFormValid = FIELD_NAMES.every(
    (name) => validateField(name, formData) === "",
  );

  const handleChange = (name: FieldName, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    // 入力中はその項目のエラーをクリア
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // フォーカスが外れたらその項目を検証
  const handleBlur = (name: FieldName) => {
    setErrors((prev) => ({ ...prev, [name]: validateField(name, formData) }));
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 送信時に全項目を再検証
    const nextErrors = Object.fromEntries(
      FIELD_NAMES.map((name) => [name, validateField(name, formData)]),
    ) as Record<FieldName, string>;
    setErrors(nextErrors);

    if (Object.values(nextErrors).some((message) => message)) return;

    alert(`登録しました\nemail：${formData.email}`);
    setFormData(INITIAL_FORM_DATA);
  };

  return (
    <>
      <QuestionText>
        <p>ユーザー登録フォームのバリデーション機能を実装してください。</p>
        <ol>
          <li>
            メールアドレスの形式チェック
            <ul>
              <li>正しいメールアドレス形式かどうかを検証</li>
              <li>必須項目として空文字チェック</li>
            </ul>
          </li>
          <li>
            パスワード強度チェック
            <ul>
              <li>8 文字以上であること</li>
              <li>大文字、小文字、数字を含むこと（最低限の要件）</li>
              <li>パスワード強度を視覚的に表示（★ マークなど）</li>
              <li>特殊文字の使用も推奨</li>
              <li>
                パスワード強度チェックに使用する正規表現：
                <code>{"/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/"}</code>
              </li>
            </ul>
          </li>
          <li>
            パスワード確認機能
            <ul>
              <li>パスワードと確認パスワードの一致確認</li>
              <li>リアルタイムでの一致チェック</li>
            </ul>
          </li>
          <li>
            利用規約の同意
            <ul>
              <li>チェックボックスでの同意確認</li>
              <li>必須項目として検証</li>
            </ul>
          </li>
          <li>
            フォーム送信制御
            <ul>
              <li>
                全項目が正しく入力され、エラーがない場合のみ送信ボタンを有効化
              </li>
              <li>送信時に全項目の再検証を実行</li>
            </ul>
          </li>
          <li>
            エラー表示
            <ul>
              <li>各フィールドのエラーメッセージを適切に表示</li>
              <li>ユーザーが入力中はエラーをクリア</li>
            </ul>
          </li>
        </ol>
      </QuestionText>
      <Card title="フォーム" tag="h2">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col items-center gap-5"
        >
          <InputField
            label="email"
            name="email"
            type="email"
            isRequired
            value={formData.email}
            error={errors.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
          />

          <div className="flex w-full max-w-sm flex-col gap-2">
            <InputField
              label="password"
              name="password"
              type="password"
              isRequired
              value={formData.password}
              error={errors.password}
              onChange={(e) => handleChange("password", e.target.value)}
              onBlur={() => handleBlur("password")}
            />
            {formData.password && (
              <div className="flex flex-col gap-1 text-left text-xs">
                <p className="flex items-center gap-2">
                  <span className="tracking-widest text-amber-300">
                    {"★".repeat(passwordStrength)}
                    <span className="text-zinc-600">
                      {"★".repeat(5 - passwordStrength)}
                    </span>
                  </span>
                  <span className={strength.color}>{strength.label}</span>
                </p>
                {!PASSWORD_RULES[4].test(formData.password) && (
                  <p className="text-zinc-500">
                    特殊文字（!@#$ など）を含めるとより安全です
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="flex w-full max-w-sm flex-col gap-2">
            <InputField
              label="confirmPassword"
              name="confirmPassword"
              type="password"
              isRequired
              value={formData.confirmPassword}
              error={errors.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              onBlur={() => handleBlur("confirmPassword")}
            />
            {formData.confirmPassword && !errors.confirmPassword && (
              <p
                className={`text-left text-xs ${
                  isPasswordMatched ? "text-green-400" : "text-zinc-500"
                }`}
              >
                {isPasswordMatched
                  ? "✓ パスワードが一致しています"
                  : "パスワードがまだ一致していません"}
              </p>
            )}
          </div>

          <InputField
            label="利用規約に同意する"
            type="checkbox"
            name="agreeToTerms"
            isRequired
            checked={formData.agreeToTerms}
            error={errors.agreeToTerms}
            onChange={(e) => handleChange("agreeToTerms", e.target.checked)}
          >
            <p className="mb-2 font-semibold text-zinc-200">利用規約（仮）</p>
            <p className="mb-2">
              第1条（適用）本規約は、本サービスの利用に関する一切の関係に適用されます。
            </p>
            <p className="mb-2">
              第2条（登録）登録希望者は、本規約に同意の上、所定の方法により登録を申請するものとします。
            </p>
            <p className="mb-2">
              第3条（禁止事項）ユーザーは、法令または公序良俗に違反する行為をしてはなりません。
            </p>
            <p>
              第4条（免責）当サービスは、ユーザーに生じた損害について一切の責任を負いません。
            </p>
          </InputField>

          <Button
            text="send"
            type="submit"
            backgroundColor="#7c3aed"
            isDisabled={!isFormValid}
          />
        </form>
      </Card>
    </>
  );
}

export default Problem23;
