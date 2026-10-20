import { useState } from "react";
import QuestionText from "@components/QuestionText";
import Card from "@components/Card";
import Button from "@components/Button";
import ProgressBar from "@components/ProgressBar";
import StepIndicator from "@components/StepIndicator";
import InputField from "@components/InputField";

type FormData = {
  // Step 1
  name: string;
  email: string;
  // Step 2
  address: string;
  phone: string;
};

type FieldName = keyof FormData;

// 確認画面での表示名と、修正時に戻るステップ
const CONFIRM_ITEMS: { name: FieldName; label: string; step: number }[] = [
  { name: "name", label: "名前", step: 1 },
  { name: "email", label: "メールアドレス", step: 1 },
  { name: "address", label: "住所", step: 2 },
  { name: "phone", label: "電話番号", step: 2 },
];

const STEPS = ["基本情報", "詳細情報", "確認"];

const stepTitleClass = "mb-4 text-base font-semibold text-zinc-100";

// 各ステップで入力する項目（Step 3 は確認のみ）
const STEP_FIELDS: Record<number, FieldName[]> = {
  1: ["name", "email"],
  2: ["address", "phone"],
  3: [],
};

const validationFormData = (name: FieldName, value: string): string => {
  switch (name) {
    case "name":
      if (!value) return "名前は必須です";
      return "";
    case "email":
      if (!value) return "メールアドレスは必須です";
      // 簡易的なメールアドレス形式チェック
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        return "メールアドレスの形式が正しくありません";
      return "";
    case "address":
      if (!value) return "住所は必須です";
      return "";
    case "phone":
      if (!value) return "電話番号は必須です";
      // ハイフンなしの数字 10〜11 桁（例: 0312345678, 09012345678）
      if (!/^\d{10,11}$/.test(value))
        return "電話番号はハイフンなしの数字 10〜11 桁で入力してください";
      return "";
    default:
      return "";
  }
};

function Problem25() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    // Step 1
    name: "",
    email: "",
    // Step 2
    address: "",
    phone: "",
    // Step 3 は確認のみ
  });
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});

  const handleChange = (name: FieldName, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleValidation = (name: FieldName) => {
    const targetValue = formData[name];
    const errorMessage = validationFormData(name, targetValue);
    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
  };

  // 今のステップの項目がすべてエラーなしか
  const isCurrentStepValid = (STEP_FIELDS[currentStep] ?? []).every(
    (name) => validationFormData(name, formData[name]) === "",
  );

  const handleNext = () => {
    // 次のステップへ
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    // 前のステップへ
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    // 最終送信処理
    if (isCurrentStepValid) {
      const confirm = window.confirm("送信してもよろしいですか？");
      if (confirm) {
        // ここで実際の送信処理を行う
        console.log("送信データ:", formData);
      }
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h3 className={stepTitleClass}>Step 1: 基本情報</h3>
            <div className="flex flex-col gap-4">
              <InputField
                label="名前"
                name="name"
                placeholder="山田 太郎"
                isRequired
                value={formData.name}
                error={errors.name}
                onChange={(e) => handleChange("name", e.target.value)}
                onBlur={() => handleValidation("name")}
              />
              <InputField
                label="メールアドレス"
                name="email"
                type="email"
                placeholder="example@email.com"
                isRequired
                value={formData.email}
                error={errors.email}
                onChange={(e) => handleChange("email", e.target.value)}
                onBlur={() => handleValidation("email")}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h3 className={stepTitleClass}>Step 2: 詳細情報</h3>
            <div className="flex flex-col gap-4">
              <InputField
                label="住所"
                name="address"
                placeholder="東京都千代田区1-1-1"
                isRequired
                value={formData.address}
                error={errors.address}
                onChange={(e) => handleChange("address", e.target.value)}
                onBlur={() => handleValidation("address")}
              />
              <InputField
                label="電話番号"
                name="phone"
                type="tel"
                placeholder="09012345678"
                isRequired
                value={formData.phone}
                error={errors.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                onBlur={() => handleValidation("phone")}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h3 className={stepTitleClass}>Step 3: 確認</h3>
            <p className="mb-4 text-xs text-zinc-500">
              以下の内容で送信します。修正する場合は「修正」を押してください。
            </p>
            <dl className="divide-y divide-zinc-800 overflow-hidden rounded-lg border border-zinc-800">
              {CONFIRM_ITEMS.map(({ name, label, step }) => (
                <div
                  key={name}
                  className="flex items-center gap-3 bg-zinc-900/60 px-4 py-3"
                >
                  <dt className="w-28 shrink-0 text-xs text-zinc-500">
                    {label}
                  </dt>
                  <dd className="min-w-0 flex-1 break-all text-sm text-zinc-100">
                    {formData[name] || (
                      <span className="text-zinc-600">未入力</span>
                    )}
                  </dd>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(step)}
                    className="shrink-0 cursor-pointer text-xs text-violet-300 hover:text-violet-200 hover:underline"
                  >
                    修正
                  </button>
                </div>
              ))}
            </dl>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <QuestionText>
        <ol>
          <li>
            3 ステップのウィザード形式フォーム
            <ul>
              <li>Step1: 基本情報（名前、メール）</li>
              <li>Step2: 詳細情報（住所、電話番号）</li>
              <li>Step3: 確認画面</li>
            </ul>
          </li>
          <li>前後のナビゲーション</li>
          <li>各ステップのバリデーション</li>
          <li>プログレスバー表示</li>
          <li>最終確認後に送信</li>
        </ol>
      </QuestionText>

      <Card title="会員登録" tag="h2">
        <div className="mx-auto flex w-full max-w-md flex-col gap-6 text-left">
          <ProgressBar value={currentStep} max={STEPS.length} size="sm" />
          <StepIndicator steps={STEPS} currentStep={currentStep} />

          <div className="rounded-lg border border-zinc-800 bg-zinc-950/40 p-5">
            {renderStep()}
          </div>

          {/* ナビゲーション */}
          <div className="flex justify-between">
            <Button
              text="← 前へ"
              backgroundColor="#3f3f46"
              isDisabled={currentStep === 1}
              onClick={handlePrev}
            />

            {currentStep < STEPS.length ? (
              <Button
                text="次へ →"
                backgroundColor="#7c3aed"
                isDisabled={!isCurrentStepValid}
                onClick={handleNext}
              />
            ) : (
              <Button
                text="送信"
                backgroundColor="#16a34a"
                onClick={handleSubmit}
              />
            )}
          </div>
        </div>
      </Card>
    </>
  );
}

export default Problem25;
